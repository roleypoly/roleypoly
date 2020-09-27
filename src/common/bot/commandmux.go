package bot

import (
	"context"
	"regexp"
	"strings"

	"github.com/dghubble/trie"
	"github.com/lampjaw/discordclient"
	"k8s.io/klog"
)

type CommandMux struct {
	commandTrie *trie.PathTrie
	matcher     *regexp.Regexp
}

func NewCommandMux(matcher *regexp.Regexp) CommandMux {
	return CommandMux{
		commandTrie: trie.NewPathTrie(),
		matcher:     matcher,
	}
}

type CommandGroup []Command

func (cg CommandGroup) RegisterCommands(commandTrie *trie.PathTrie, prefix string) {
	for _, command := range cg {
		commandTrie.Put(prefix+"/"+command.CommandName, command.Handler)
	}
}

type Command struct {
	CommandName string
	Handler     HandlerFunc
}

func (c CommandMux) RegisterCommandGroup(prefix string, group CommandGroup) {
	group.RegisterCommands(c.commandTrie, prefix)
}

func (c CommandMux) Handler(ctx context.Context, message discordclient.Message) {
	if !c.matches(message) {
		return
	}

	key := c.commandKeyFromMessage(message)

	command := c.commandTrie.Get(key)
	if command == nil {
		return
	}

	handlerFn, ok := command.(HandlerFunc)
	if !ok {
		klog.Warning("CommandMux.Handler: " + key + " handler was not HandlerFunc")
		return
	}

	c.logCommandRun(key, message)
	handlerFn(ctx, message)
}

func (c CommandMux) commandKeyFromMessage(message discordclient.Message) string {
	commandParts := strings.Split(message.RawMessage(), " ")[1:]
	return commandParts[0] + "/" + commandParts[1]
}

func (c CommandMux) matches(message discordclient.Message) bool {
	return c.matcher.MatchString(message.RawMessage())
}

func (c CommandMux) logCommandRun(key string, message discordclient.Message) {
	klog.Info("CommandMux: " + key + " by " + message.UserName() + " <@" + message.UserID() + ">")
}

func PrefixMatcher(prefix string) *regexp.Regexp {
	return regexp.MustCompile(`^` + prefix)
}

func MentionMatcher(userID string) *regexp.Regexp {
	return regexp.MustCompile(`<@!?` + userID + ">")
}

func Tokenize(message discordclient.Message) []string {
	return strings.SplitAfterN(message.RawMessage(), " ", 3)
}
