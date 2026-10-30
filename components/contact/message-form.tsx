"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CodeXml,
  Handshake,
  MailCheck,
  MessageCircle,
  Network,
  ShoppingBag,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { contactEmail, type ContactTopic, contactTopics, offices, telHref } from "@/lib/content";
import { sectionHeading, sectionSpace, wrap } from "@/lib/layout";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const topicIcons: Record<ContactTopic, LucideIcon> = {
  power: Zap,
  networking: Network,
  software: CodeXml,
  tapsun: ShoppingBag,
  consultation: CalendarCheck,
  ai: Sparkles,
  partnerships: Handshake,
  general: MessageCircle,
};

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const isTopic = (v: string | null): v is ContactTopic => contactTopics.some((t) => t.id === v);

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Enter your full name.";
  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email address like name@company.ng.";
  if (!String(data.get("message") ?? "").trim()) errors.message = "Tell us a little about your project or question.";
  return errors;
}

const inputClass =
  "w-full rounded-[14px] bg-layer-1 px-4 text-base text-text-primary ring-1 ring-transparent transition-[background-color,box-shadow] duration-150 outline-none placeholder:text-text-muted focus:bg-surface focus:ring-gold aria-invalid:bg-surface aria-invalid:ring-intercom";

function TextField({
  id,
  label,
  required,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-text-muted"> (required)</span> : <span className="text-text-muted"> (optional)</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, "mt-2 h-12")}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-intercom">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * General enquiry form. The topic list on the left is part of the form, so the enquiry type is asked once.
 * `?topic=` preselects a topic and `?message=` starts the message (see contactHref). They are read after the
 * page loads, so the form itself renders on the server like the rest of the page.
 * PLACEHOLDER: there is no backend yet, so sending opens the visitor's email app with the message filled in.
 * Swap `send` for a form service or API route when one is ready.
 */
export function MessageForm() {
  const [topic, setTopic] = useState<ContactTopic>("general");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("topic");
    if (isTopic(t)) setTopic(t);
    const m = params.get("message");
    if (m) setMessage(m);
  }, []);
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const topicLabel = contactTopics.find((t) => t.id === topic)?.label ?? "General enquiry";

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = (["name", "email", "message"] as const).find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const name = String(data.get("name")).trim();
    const lines = [
      String(data.get("message")).trim(),
      "",
      `Name: ${name}`,
      `Email: ${String(data.get("email")).trim()}`,
      data.get("phone") ? `Phone: ${String(data.get("phone")).trim()}` : "",
      data.get("company") ? `Company: ${String(data.get("company")).trim()}` : "",
      `Topic: ${topicLabel}`,
    ].filter((l, i) => l || i === 1);
    const subject = `${topicLabel} enquiry from ${name}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSentTo(contactEmail);
  }

  return (
    <section id="message" aria-labelledby="message-title" className={cn("scroll-mt-24", sectionSpace)}>
      <div className={wrap}>
        <form ref={formRef} noValidate onSubmit={send} className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Pill>General enquiries</Pill>
            <h2 id="message-title" className={cn("mt-6 max-w-[14ch] text-balance", sectionHeading)}>
              Send us <span className="text-gold-ink">a message.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-text-secondary text-pretty sm:text-lg">
              Whether you need a quote, a consultation or just want to know which IDN solution fits, we typically reply
              within one business day.
            </p>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium">What is it about?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {contactTopics.map((t) => {
                  const Icon = topicIcons[t.id];
                  const on = topic === t.id;
                  return (
                    <label
                      key={t.id}
                      className={cn(
                        "flex h-14 cursor-pointer items-center gap-3 rounded-[16px] px-4 text-base transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                        on ? "bg-gold-tint text-text-primary" : "bg-layer-1 text-text-secondary hover:bg-layer-2",
                      )}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={t.id}
                        checked={on}
                        onChange={() => setTopic(t.id)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-150",
                          on ? "bg-gold text-ink" : "bg-surface text-text-secondary",
                        )}
                      >
                        <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1">{t.label}</span>
                      {on && <Check aria-hidden className="size-4 text-gold-ink" strokeWidth={2.5} />}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[28px] bg-layer-1 p-2">
              <div className="rounded-[20px] bg-surface p-6 sm:p-10">
                {sentTo ? (
                  <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
                    <span className="grid size-14 place-items-center rounded-full bg-gold-tint text-gold-ink">
                      <MailCheck aria-hidden className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-3xl font-medium tracking-[-0.035em]">Your email is ready to send</h3>
                    <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-text-secondary text-pretty">
                      Your email app should have opened with your message to{" "}
                      <a href={`mailto:${sentTo}`} className="font-medium text-text-primary underline underline-offset-4">
                        {sentTo}
                      </a>
                      . Press send there and we will reply within one business day. If nothing opened, email us directly
                      or call {offices[0].phone}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSentTo(null);
                        setMessage("");
                      }}
                      className="press mt-8 inline-flex h-12 items-center rounded-full bg-layer-1 px-5 text-base font-medium transition-colors duration-150 hover:bg-layer-2"
                    >
                      Write another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-medium tracking-[-0.02em]">Tell us how we can help</h3>
                    <p className="mt-2 text-base text-text-secondary">
                      Topic: <span className="font-medium text-text-primary">{topicLabel}</span>
                    </p>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <TextField id={id("name")} name="name" label="Full name" required autoComplete="name" placeholder="Emeka Okafor" error={errors.name} />
                      <TextField
                        id={id("email")}
                        name="email"
                        type="email"
                        inputMode="email"
                        label="Email"
                        required
                        autoComplete="email"
                        placeholder="emeka@company.ng"
                        error={errors.email}
                      />
                      <TextField id={id("phone")} name="phone" type="tel" inputMode="tel" label="Phone" autoComplete="tel" placeholder="+234 803 000 0000" />
                      <TextField id={id("company")} name="company" label="Company" autoComplete="organization" />
                      <div className="sm:col-span-2">
                        <label htmlFor={id("message")} className="text-sm font-medium">
                          Message<span className="text-text-muted"> (required)</span>
                        </label>
                        <textarea
                          id={id("message")}
                          name="message"
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your site, your project or your question."
                          aria-invalid={errors.message ? true : undefined}
                          aria-describedby={errors.message ? `${id("message")}-error` : undefined}
                          className={cn(inputClass, "mt-2 resize-y py-3")}
                        />
                        {errors.message && (
                          <p id={`${id("message")}-error`} className="mt-2 text-sm text-intercom">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="press group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gold text-base font-medium text-ink"
                    >
                      Send message
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" strokeWidth={2} />
                    </button>
                    <p className="mt-4 text-center text-sm text-text-muted">
                      Prefer to talk? Call us on{" "}
                      <a href={telHref(offices[0].phone)} className="text-text-secondary tabular-nums underline-offset-4 hover:underline">
                        {offices[0].phone}
                      </a>
                      .
                    </p>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </form>
      </div>
    </section>
  );
}
