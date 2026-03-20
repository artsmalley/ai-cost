"use client";

import { useState } from "react";

interface FormData {
  name: string;
  role: string;
  // Q1-Q10: pick + detail
  painPoint: string;
  painPointDetail: string;
  quoteFormat: string;
  quoteFormatDetail: string;
  rfqTemplate: string;
  rfqTemplateDetail: string;
  chemistryType: string;
  chemistryTypeDetail: string;
  priceValidation: string;
  priceValidationDetail: string;
  vendorCount: string;
  vendorCountDetail: string;
  mostHelpful: string;
  mostHelpfulDetail: string;
  previousAttempts: string;
  previousAttemptsDetail: string;
  roadblocks: string;
  roadblocksDetail: string;
  stakeholders: string;
  stakeholdersDetail: string;
  // Final open-ended
  anythingElse: string;
}

const initial: FormData = {
  name: "",
  role: "",
  painPoint: "",
  painPointDetail: "",
  quoteFormat: "",
  quoteFormatDetail: "",
  rfqTemplate: "",
  rfqTemplateDetail: "",
  chemistryType: "",
  chemistryTypeDetail: "",
  priceValidation: "",
  priceValidationDetail: "",
  vendorCount: "",
  vendorCountDetail: "",
  mostHelpful: "",
  mostHelpfulDetail: "",
  previousAttempts: "",
  previousAttemptsDetail: "",
  roadblocks: "",
  roadblocksDetail: "",
  stakeholders: "",
  stakeholdersDetail: "",
  anythingElse: "",
};

function DiscoveryQuestion({
  number,
  label,
  prompt,
  name,
  options,
  value,
  onSelectChange,
  detail,
  onDetailChange,
  detailPlaceholder,
}: {
  number: number;
  label: string;
  prompt: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onSelectChange: (v: string) => void;
  detail: string;
  onDetailChange: (v: string) => void;
  detailPlaceholder: string;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {number}. {label}
        </h3>
        <p className="text-sm text-gray-500">{prompt}</p>
      </div>

      <fieldset className="space-y-2">
        <legend className="sr-only">{label}</legend>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              value === opt.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onSelectChange(opt.value)}
              className="mt-0.5 accent-blue-600"
            />
            <span className="text-gray-700">{opt.label}</span>
          </label>
        ))}
      </fieldset>

      <textarea
        rows={3}
        value={detail}
        onChange={(e) => onDetailChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-sm"
        placeholder={detailPlaceholder}
      />
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const set = (field: keyof FormData) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg text-center space-y-4">
          <div className="text-5xl">&#10003;</div>
          <h1 className="text-2xl font-bold text-gray-800">
            Thanks for your input!
          </h1>
          <p className="text-gray-600">
            Your responses will directly shape what we build. We&apos;ll share a
            working prototype with you soon.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            E-Coating Cost Tool
          </h1>
          <p className="text-lg text-gray-600">
            Help shape a simple AI tool for e-coating vendor quote management.
            Your input will directly determine what gets built.
          </p>
          <p className="text-sm text-gray-400">
            Takes about 10 minutes. Pick the closest option for each question,
            then use the text box to explain, correct, or add detail. The text
            boxes are where the real value is — write as much or as little as
            you want.
          </p>
        </div>

        {/* Name & Role */}
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Role (current or when you dealt with e-coating quotes)
            </label>
            <input
              id="role"
              type="text"
              value={form.role}
              onChange={(e) => set("role")(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="e.g. Purchasing Engineer, Cost Analyst"
            />
          </div>
        </div>

        {/* Discovery Questions */}
        <DiscoveryQuestion
          number={1}
          label="What was the #1 pain point with e-coating vendor quotes?"
          prompt="Pick the closest, then tell us more. We may be wrong about these options — your explanation is what matters most."
          name="painPoint"
          options={[
            { value: "estimation", label: "Estimating what e-coating SHOULD cost for a given part" },
            { value: "comparison", label: "Comparing quotes side-by-side when vendors format them differently" },
            { value: "retrieval", label: "Finding past quotes — \"we quoted something similar, where is it?\"" },
            { value: "all", label: "All of the above roughly equally" },
          ]}
          value={form.painPoint}
          onSelectChange={set("painPoint")}
          detail={form.painPointDetail}
          onDetailChange={set("painPointDetail")}
          detailPlaceholder="Tell us more — what did this actually look like day-to-day? Can you walk through a specific example?"
        />

        <DiscoveryQuestion
          number={2}
          label="How did vendor quotes typically arrive?"
          prompt="What format were they in? How messy was it?"
          name="quoteFormat"
          options={[
            { value: "spreadsheet", label: "Excel / spreadsheet" },
            { value: "pdf", label: "PDF documents" },
            { value: "system", label: "Through a procurement system (SAP, Ariba, etc.)" },
            { value: "mix", label: "Mix of formats" },
          ]}
          value={form.quoteFormat}
          onSelectChange={set("quoteFormat")}
          detail={form.quoteFormatDetail}
          onDetailChange={set("quoteFormatDetail")}
          detailPlaceholder="What did a typical vendor quote look like? How many line items? What made them hard to work with?"
        />

        <DiscoveryQuestion
          number={3}
          label="Did the OEM send vendors a standard RFQ template?"
          prompt="Or did every vendor send back something different?"
          name="rfqTemplate"
          options={[
            { value: "standard", label: "Yes — standard template vendors filled out" },
            { value: "vendor-own", label: "No — each vendor used their own format" },
            { value: "both", label: "Both — there was a template but vendors often deviated" },
          ]}
          value={form.rfqTemplate}
          onSelectChange={set("rfqTemplate")}
          detail={form.rfqTemplateDetail}
          onDetailChange={set("rfqTemplateDetail")}
          detailPlaceholder="What were the biggest differences between vendor quotes? What made comparison difficult?"
        />

        <DiscoveryQuestion
          number={4}
          label="What e-coating chemistries were most common?"
          prompt="If you're not sure, that's fine — tell us what you do know about the coating types."
          name="chemistryType"
          options={[
            { value: "cathodic-epoxy", label: "Cathodic epoxy (most common in automotive)" },
            { value: "cathodic-acrylic", label: "Cathodic acrylic" },
            { value: "multiple", label: "Multiple types" },
            { value: "unsure", label: "Not sure" },
          ]}
          value={form.chemistryType}
          onSelectChange={set("chemistryType")}
          detail={form.chemistryTypeDetail}
          onDetailChange={set("chemistryTypeDetail")}
          detailPlaceholder="Any detail on the coating specs, thickness requirements, or how chemistry choice affected cost?"
        />

        <DiscoveryQuestion
          number={5}
          label="How did buyers decide if a vendor's price was reasonable?"
          prompt="What was the process for validating a quote? Gut feel? Spreadsheet? Something else?"
          name="priceValidation"
          options={[
            { value: "past-quotes", label: "Compared to past quotes for similar parts" },
            { value: "gut", label: "Experience / gut feel" },
            { value: "model", label: "Internal should-cost model or spreadsheet" },
            { value: "combination", label: "Combination of methods" },
          ]}
          value={form.priceValidation}
          onSelectChange={set("priceValidation")}
          detail={form.priceValidationDetail}
          onDetailChange={set("priceValidationDetail")}
          detailPlaceholder="Walk us through how you'd evaluate a quote. What data did you wish you had? What would have made this easier?"
        />

        <DiscoveryQuestion
          number={6}
          label="How many e-coating vendors would typically be RFQ'd for a single part?"
          prompt="And how long did the whole quoting cycle take?"
          name="vendorCount"
          options={[
            { value: "2-3", label: "2-3 vendors" },
            { value: "4-6", label: "4-6 vendors" },
            { value: "7+", label: "7 or more" },
          ]}
          value={form.vendorCount}
          onSelectChange={set("vendorCount")}
          detail={form.vendorCountDetail}
          onDetailChange={set("vendorCountDetail")}
          detailPlaceholder="How long did a typical RFQ cycle take? How many hours per quote to evaluate? Any bottlenecks?"
        />

        <DiscoveryQuestion
          number={7}
          label="If you could only have ONE tool, which would help most?"
          prompt="Imagine a simple tool on your desk — not a $100K enterprise system. What would it do?"
          name="mostHelpful"
          options={[
            { value: "calculator", label: "A calculator — input part specs, get an expected cost range" },
            { value: "normalizer", label: "A normalizer — reads vendor quotes and creates a standard side-by-side comparison" },
            { value: "archive", label: "A searchable archive of past quotes by part type, vendor, date" },
            { value: "other", label: "Something else entirely" },
          ]}
          value={form.mostHelpful}
          onSelectChange={set("mostHelpful")}
          detail={form.mostHelpfulDetail}
          onDetailChange={set("mostHelpfulDetail")}
          detailPlaceholder="Describe your dream tool — what would you type in, and what would it show you? What would make you say 'yes, THIS is what we needed'?"
        />

        <DiscoveryQuestion
          number={8}
          label="Has anyone tried to solve this problem before?"
          prompt="Spreadsheets, internal tools, vendor demos, consulting projects — anything that attempted to improve the quoting process."
          name="previousAttempts"
          options={[
            { value: "spreadsheets", label: "Yes — spreadsheets or templates that people built informally" },
            { value: "tool", label: "Yes — an internal tool or vendor product was tried" },
            { value: "discussed", label: "It's been discussed but nothing was ever built" },
            { value: "never", label: "Not that I'm aware of" },
          ]}
          value={form.previousAttempts}
          onSelectChange={set("previousAttempts")}
          detail={form.previousAttemptsDetail}
          onDetailChange={set("previousAttemptsDetail")}
          detailPlaceholder="What was tried? What worked, what didn't? Why did it stall or get abandoned? What can we learn from those attempts?"
        />

        <DiscoveryQuestion
          number={9}
          label="What are the biggest roadblocks to improving this process?"
          prompt="What gets in the way of making the quoting process better — even when people want to?"
          name="roadblocks"
          options={[
            { value: "data-access", label: "Data is locked in systems or formats that are hard to work with" },
            { value: "time-priority", label: "No one has time — everyone is buried in day-to-day work" },
            { value: "organizational", label: "Organizational — too many departments, approvals, or politics" },
            { value: "technical", label: "Technical — IT constraints, security policies, legacy systems" },
          ]}
          value={form.roadblocks}
          onSelectChange={set("roadblocks")}
          detail={form.roadblocksDetail}
          onDetailChange={set("roadblocksDetail")}
          detailPlaceholder="What specifically gets in the way? Are there cultural barriers, technical limitations, or resource constraints? What would need to change?"
        />

        <DiscoveryQuestion
          number={10}
          label="Who are the key people involved in the quoting process?"
          prompt="Not names — roles. Who touches vendor quotes, who makes decisions, who feels the pain?"
          name="stakeholders"
          options={[
            { value: "purchasing-only", label: "Mostly purchasing / procurement engineers" },
            { value: "cross-functional", label: "Cross-functional — purchasing, engineering, quality, finance" },
            { value: "management", label: "Management drives it — buyers just execute" },
            { value: "unclear", label: "It varies a lot depending on the part or program" },
          ]}
          value={form.stakeholders}
          onSelectChange={set("stakeholders")}
          detail={form.stakeholdersDetail}
          onDetailChange={set("stakeholdersDetail")}
          detailPlaceholder="Who would benefit most from a better tool? Who would need to approve or support it? Who are the informal experts people go to with questions?"
        />

        {/* Final open-ended */}
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Anything else?
          </h3>
          <p className="text-sm text-gray-500">
            What did we miss? What&apos;s the thing you&apos;d want us to know
            that none of the questions above captured?
          </p>
          <textarea
            rows={5}
            value={form.anythingElse}
            onChange={(e) => set("anythingElse")(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            placeholder="Anything — problems we didn't ask about, data sources we should know about, people we should talk to, past attempts that failed..."
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full max-w-sm rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {status === "sending" ? "Submitting..." : "Submit Feedback"}
          </button>
          <p className="text-xs text-gray-400">
            Your responses are private and only shared with Art Smithson.
          </p>
          {status === "error" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
