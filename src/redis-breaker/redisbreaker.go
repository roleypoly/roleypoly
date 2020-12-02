// Package redisbreaker provides a go-redis v8 instance designed for resilient caching via circuit breakers.
// tl;dr: If redis is lost, it can either cache objects in memory using sync.Map or dropping gracefully.
// As a side benefit, it means we don't need a redis server to develop locally, unless we want one :)
package redisbreaker

import (
	"context"
	"encoding/json"
	"sync"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/sony/gobreaker"
)

type RedisBreaker struct {
	redisClient *redis.Client
	breaker     *gobreaker.CircuitBreaker

	config        *RedisBreakerConfig
	inMemoryCache sync.Map
}

type RedisBreakerConfig struct {
	Redis            *redis.Options
	Breaker          gobreaker.Settings
	UseInMemoryCache bool
	DefaultTTL       time.Duration
}

type inmemoryCacheObject struct {
	expiresAt time.Time
	object    []byte
}

func NewRedisBreaker(config *RedisBreakerConfig) *RedisBreaker {
	if config == nil {
		config = &RedisBreakerConfig{
			UseInMemoryCache: true,
		}
	}

	if config.DefaultTTL == 0 {
		config.DefaultTTL = 2 * time.Minute
	}

	breaker := &RedisBreaker{
		config:      config,
		redisClient: redis.NewClient(config.Redis),
		breaker:     gobreaker.NewCircuitBreaker(config.Breaker),
	}

	return breaker
}

func (rb *RedisBreaker) doOr(
	ctx context.Context,
	func1 func(context.Context, string, interface{}) (interface{}, error),
	func2 func(context.Context, string, interface{}) (interface{}, error),
	key string,
	object interface{},
) (interface{}, error) {
	val, err := rb.breaker.Execute(func() (interface{}, error) {
		return func1(ctx, key, object)
	})
	if err == gobreaker.ErrOpenState || err == gobreaker.ErrTooManyRequests {
		return func2(ctx, key, object)
	}

	return val, err
}

// Set pushes an object into the cache with the specified default TTL, using SetEX
func (rb *RedisBreaker) Set(ctx context.Context, key string, object interface{}) error {
	_, err := rb.doOr(ctx, rb.setRedis, rb.setInmemory, key, object)
	return err
}

func (rb *RedisBreaker) setRedis(ctx context.Context, key string, object interface{}) (interface{}, error) {
	objectJSON, err := json.Marshal(object)
	if err != nil {
		return nil, err
	}

	return rb.redisClient.SetEX(ctx, key, objectJSON, rb.config.DefaultTTL).Result()
}

func (rb *RedisBreaker) setInmemory(ctx context.Context, key string, object interface{}) (interface{}, error) {
	if rb.config.UseInMemoryCache {
		objectJSON, err := json.Marshal(object)
		if err != nil {
			return nil, err
		}

		rb.inMemoryCache.Store(key, inmemoryCacheObject{
			expiresAt: time.Now().Add(rb.config.DefaultTTL),
			object:    objectJSON,
		})
	}

	return nil, nil
}

// Get pulls an object from cache, returning ok = true if it succeeded.
func (rb *RedisBreaker) Get(ctx context.Context, key string, object interface{}) (bool, error) {
	ok, err := rb.doOr(ctx, rb.getRedis, rb.getInmemory, key, object)

	return ok.(bool), err
}

func (rb *RedisBreaker) getRedis(ctx context.Context, key string, object interface{}) (interface{}, error) {
	result := rb.redisClient.Get(ctx, key)
	if result.Err() != nil {
		if result.Err() == redis.Nil {
			return false, nil
		}

		return false, result.Err()
	}

	objectJSON, err := result.Bytes()
	if err != nil {
		return false, err
	}

	err = json.Unmarshal(objectJSON, object)

	return true, err
}

func (rb *RedisBreaker) getInmemory(ctx context.Context, key string, object interface{}) (interface{}, error) {
	if !rb.config.UseInMemoryCache {
		return false, nil
	}

	cacheObjIntf, ok := rb.inMemoryCache.Load(key)
	if !ok {
		return false, nil
	}

	cacheObj, ok := cacheObjIntf.(inmemoryCacheObject)
	if !ok {
		return false, nil
	}

	if time.Now().After(cacheObj.expiresAt) {
		return false, nil
	}

	err := json.Unmarshal(cacheObj.object, object)
	if err != nil {
		return false, err
	}

	return true, nil
}
