package redisbreaker_test

import (
	"context"
	"testing"
	"time"

	"github.com/alicebob/miniredis/v2"
	"github.com/go-redis/redis/v8"
	"github.com/onsi/gomega"
	"github.com/sony/gobreaker"

	redisbreaker "github.com/roleypoly/roleypoly/src/redis-breaker"
)

func getBreaker(breakerOpen bool) (*redisbreaker.RedisBreaker, *miniredis.Miniredis) {
	redisServer, err := miniredis.Run()
	if err != nil {
		panic(err)
	}

	config := &redisbreaker.RedisBreakerConfig{
		Redis: &redis.Options{
			Addr: redisServer.Addr(),
		},
		UseInMemoryCache: true,
		DefaultTTL:       1 * time.Second,
	}

	if breakerOpen {
		config.Breaker.ReadyToTrip = func(gobreaker.Counts) bool {
			return true
		}

		redisServer.Close()
	}

	rb := redisbreaker.NewRedisBreaker(config)

	if breakerOpen {
		// forcibly open the breaker
		rb.Set(context.Background(), "@@@breaker@@@", nil)
	}

	return rb, redisServer
}

type TestData struct {
	IAmAField1 string
	IAmAField2 int
	IAmAField3 map[string]interface{}
}

var testData = TestData{
	IAmAField1: "hello world!",
	IAmAField2: 420 * 69,
	IAmAField3: map[string]interface{}{
		"foxes": "are so heckin cute",
	},
}

func getSet(t *testing.T, openCircuit bool) {
	g := gomega.NewGomegaWithT(t)
	rb, rds := getBreaker(openCircuit)
	defer rds.Close()

	err := rb.Set(context.Background(), "test-data", testData)
	g.Expect(err).To(gomega.BeNil())

	output := TestData{}
	ok, err := rb.Get(context.Background(), "test-data", &output)
	g.Expect(err).To(gomega.BeNil())

	g.Expect(ok).To(gomega.BeTrue(), "ok should be true")
	g.Expect(output).To(gomega.Equal(testData), "testData should match output data")
}

func TestGetSet(t *testing.T) {
	getSet(t, false)
}

func TestGetSetOpenCircuit(t *testing.T) {
	getSet(t, true)
}

func getNotInCache(t *testing.T, openCircuit bool) {
	g := gomega.NewGomegaWithT(t)
	rb, rds := getBreaker(openCircuit)
	defer rds.Close()

	output := TestData{}
	ok, err := rb.Get(context.Background(), "not-test-data", &output)
	g.Expect(err).To(gomega.BeNil())

	g.Expect(ok).To(gomega.BeFalse(), "ok should be false")
	g.Expect(output).To(gomega.BeZero(), "output should be 'zero'")
}

func TestGetNotInCache(t *testing.T) {
	getNotInCache(t, false)
}

func TestGetNotInCacheOpenCircuit(t *testing.T) {
	getNotInCache(t, true)
}

func getAfterTTL(t *testing.T, openCircuit bool) {
	g := gomega.NewGomegaWithT(t)
	rb, rds := getBreaker(openCircuit)
	defer rds.Close()

	err := rb.Set(context.Background(), "test-expired", testData)
	g.Expect(err).To(gomega.BeNil())

	rds.FastForward(1 * time.Second)
	time.Sleep(1 * time.Second)

	output := TestData{}
	ok, err := rb.Get(context.Background(), "test-expired", &output)
	g.Expect(ok).To(gomega.BeFalse(), "ok should be false")
	g.Expect(output).To(gomega.BeZero(), "output should be 'zero'")
}

func TestGetAfterTTL(t *testing.T) {
	getAfterTTL(t, false)
}

func TestGetAfterTTLOpenCircuit(t *testing.T) {
	getAfterTTL(t, true)
}
