"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** Front-end only: validates and shows a success state. Wire `onSubmit` to the real list provider. */
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
      <label htmlFor={id} className="text-base font-medium">
        Subscribe to our newsletter
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
          {state === "done" ? <Check className="size-4" strokeWidth={2} /> : <ArrowRight className="size-4" strokeWidth={2} />}
        </button>
      </div>
      <p id={`${id}-msg`} role="status" className="mt-2 min-h-5 text-sm text-white/60">
        {state === "error" && "Enter a valid email address."}
        {state === "done" && "Thanks, you are on the list."}
      </p>
    </form>
  );
}
