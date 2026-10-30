"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * PLACEHOLDER: no mailing list is connected yet, so a valid email is not saved and the message says so honestly.
 * Wire `onSubmit` to the list provider, then restore a real confirmation.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  return (
    <form
      noValidate
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email")?.toString() ?? "";
        setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
      }}
    >
      <label htmlFor={id} className="flex items-center gap-2 text-base font-medium">
        Subscribe to our newsletter
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-normal text-white/70">Coming soon</span>
      </label>
      <div
        className={cn(
          "mt-3 flex h-14 items-center rounded-full bg-white/10 p-1.5 pl-5 shadow-[inset_0_0_0_1px_var(--color-line-inverse)] focus-within:shadow-[inset_0_0_0_1px_var(--color-gold)]",
          state === "error" && "shadow-[inset_0_0_0_1px_#f87171]",
        )}
      >
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={state === "error" || undefined}
          aria-describedby={`${id}-msg`}
          onChange={() => state !== "idle" && setState("idle")}
          className="min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="press grid size-11 shrink-0 place-items-center rounded-full bg-gold text-ink"
        >
          <ArrowRight className="size-4" strokeWidth={2} />
        </button>
      </div>
      <p id={`${id}-msg`} role="status" className="mt-2 min-h-5 text-sm text-white/60">
        {state === "error" && "Enter a valid email address."}
        {state === "done" && "Thanks. Sign-ups open soon, so we have not saved your email yet."}
      </p>
    </form>
  );
}
