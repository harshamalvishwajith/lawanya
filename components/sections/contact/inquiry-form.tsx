"use client";

import { Check, Mail, MessageCircle, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contact, site } from "@/lib/content";

type Channel = "email" | "whatsapp";
type FormState = { status: "editing" } | { status: "sent"; channel: Channel };

function composeMessage(data: FormData, interestLabel: string) {
  const lines = [
    "Hello Lawanya team,",
    "",
    String(data.get("message") ?? "").trim(),
    "",
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
  ];
  const phone = String(data.get("phone") ?? "").trim();
  const date = String(data.get("date") ?? "").trim();
  if (phone) lines.push(`Phone: ${phone}`);
  lines.push(`Interested in: ${interestLabel}`);
  if (date) lines.push(`Date: ${date}`);
  return lines.join("\n");
}

/**
 * No backend required: the inquiry opens in the visitor's email app or WhatsApp,
 * pre-written and addressed to the studio. Swap in a Server Action here later
 * if you'd like inquiries delivered straight to an inbox.
 */
export function InquiryForm() {
  const [state, setState] = useState<FormState>({ status: "editing" });
  const [interest, setInterest] = useState<string>(contact.interests[0].value);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "whatsapp" ? "whatsapp" : "email";
    const data = new FormData(form);
    const interestLabel = contact.interests.find((item) => item.value === interest)?.label ?? interest;
    const message = composeMessage(data, interestLabel);

    if (channel === "whatsapp") {
      window.open(`https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    } else {
      const subject = `New inquiry — ${interestLabel}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
    setState({ status: "sent", channel });
  }

  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-violet-900/60 p-6 shadow-[0_40px_100px_-50px_rgb(0_0_0/0.9)] backdrop-blur-sm sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "editing" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div className="grid gap-2.5">
              <Label htmlFor="inquiry-name">Your name *</Label>
              <Input id="inquiry-name" name="name" autoComplete="name" required placeholder="Full name" />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="inquiry-email">Email *</Label>
              <Input id="inquiry-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="inquiry-phone">Phone</Label>
              <Input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="+94 …" />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="inquiry-date">Event or launch date</Label>
              <Input id="inquiry-date" name="date" type="date" />
            </div>
            <div className="grid gap-2.5 sm:col-span-2">
              <Label htmlFor="inquiry-interest">I’m interested in</Label>
              <Select value={interest} onValueChange={setInterest}>
                <SelectTrigger id="inquiry-interest">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark">
                  {contact.interests.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2.5 sm:col-span-2">
              <Label htmlFor="inquiry-message">Tell us your story *</Label>
              <Textarea
                id="inquiry-message"
                name="message"
                required
                minLength={10}
                placeholder="What are you dreaming up? A wedding, a launch, a film, a brand…"
              />
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <Button type="submit" name="via" value="email" variant="mint" size="lg">
                <Mail />
                Send by email
              </Button>
              <Button type="submit" name="via" value="whatsapp" variant="outline" size="lg" className="text-mint-50">
                <MessageCircle />
                Send on WhatsApp
              </Button>
            </div>
            <p className="text-sm text-mint-50/50 sm:col-span-2">
              Your message opens ready to send — nothing is stored on this website.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[26rem] flex-col items-start justify-center gap-5"
          >
            <span className="grid size-14 place-items-center rounded-full bg-mint-200 text-violet-950">
              <Check />
            </span>
            <p className="font-display text-display-md text-mint-50">That’s a wrap on step one.</p>
            <p className="max-w-md text-mint-50/75">
              {state.channel === "whatsapp"
                ? "WhatsApp should have opened with your message ready — just press send."
                : "Your email app should have opened with your message ready — just press send."}{" "}
              If nothing happened, write to us at{" "}
              <a className="text-mint-200 underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
            <Button type="button" variant="ghost" onClick={() => setState({ status: "editing" })} className="text-mint-50">
              <RotateCcw />
              Start another inquiry
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
