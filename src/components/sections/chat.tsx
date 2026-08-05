import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Bot, MessageSquareText, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { useChat } from "@/hooks/use-chat";
import type { ChatMessage } from "@/types";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-2 text-sm text-muted-foreground">
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card/80 text-foreground"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export function ChatSection() {
  const prefersReducedMotion = useReducedMotion();
  const { messages, draft, setDraft, sendMessage, loading, quickPrompts, context } = useChat();

  return (
    <section id="samvaad" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Samvaad"
            title="Ask me anything about the portfolio."
            description="A local, corpus-backed assistant that answers from curated context instead of external APIs or a hosted LLM."
            align="center"
          />
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[1.75rem] border border-border bg-card/70 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Assistant
                  </p>
                  <p className="font-medium text-foreground">Portfolio guide</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]"
              >
                Local corpus
              </Badge>
            </div>

            <div className="flex h-[420px] flex-col gap-4 overflow-y-auto rounded-[1.25rem] border border-border bg-background/60 p-3">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
                  >
                    <MessageBubble message={message} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading ? (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <TypingIndicator />
                </motion.div>
              ) : null}
            </div>

            <form
              className="mt-4"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(draft);
              }}
            >
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-border bg-background/70 p-2">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about my projects, skills, or chess..."
                  aria-label="Message the assistant"
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full"
                  disabled={loading || draft.trim().length === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-border bg-card/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Context</p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Detected intent
                  </p>
                  <p className="mt-2 font-medium text-foreground">{context.intent ?? "None yet"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Suggested prompts
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {context.suggestions.length > 0 ? (
                      context.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => void sendMessage(suggestion)}
                          className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground"
                        >
                          {suggestion}
                        </button>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Ask a question to surface related prompts.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  How it works
                </p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>Chat UI → Hook → Chat Service → TF-IDF Engine → Corpus</li>
                <li>Everything runs locally with no external LLM or API call.</li>
                <li>The corpus can expand without changing the interface.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
