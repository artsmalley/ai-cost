"use client";

import { useState } from "react";

interface FormData {
  name: string;
  role: string;
  // Multiple choice
  painPoint: string;
  quoteFormat: string;
  rfqTemplate: string;
  chemistryType: string;
  priceValidation: string;
  vendorCount: string;
  mostHelpful: string;
  adoptionReadiness: string;
  // Open-ended
  frictionStory: string;
  unusedData: string;
  dreamTool: string;
  anythingElse: string;
}

const initial: FormData = {
  name: "",
  role: "",
  painPoint: "",
  quoteFormat: "",
  rfqTemplate: "",
  chemistryType: "",
  priceValidation: "",
  vendorCount: "",
  mostHelpful: "",
  adoptionReadiness: "",
  frictionStory: "",
  unusedData: "",
  dreamTool: "",
  anythingElse: "",
};

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-semibold text-gray-800">{label}</legend>
      <div className="space-y-2">
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
              onChange={() => onChange(opt.value)}
              className="mt-0.5 accent-blue-600"
            />
            <span className="text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TextArea({
  label,
  hint,
  name,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-lg font-semibold text-gray-800">
        {label}
      </label>
      <p className="text-sm text-gray-500">{hint}</p>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        placeholder="Type here..."
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
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            E-Coating Cost Tool
          </h1>
          <p className="text-lg text-gray-600">
            Help shape a simple AI tool for e-coating vendor quote management.
            Your input will directly determine what gets built.
          </p>
          <p className="text-sm text-gray-400">
            Takes about 5-10 minutes. All fields are optional — answer what you
            can.
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
              placeholder="Dave Ostreicher"
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

        {/* Section: Multiple Choice */}
        <div className="space-y-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Quick Questions
          </h2>

          <RadioGroup
            label="1. What was the #1 pain point with e-coating vendor quotes?"
            name="painPoint"
            value={form.painPoint}
            onChange={set("painPoint")}
            options={[
              {
                value: "estimation",
                label:
                  "Estimating what e-coating SHOULD cost for a given part",
              },
              {
                value: "comparison",
                label:
                  "Comparing quotes side-by-side when vendors format them differently",
              },
              {
                value: "retrieval",
                label:
                  'Finding past quotes — "we quoted something similar, where is it?"',
              },
              {
                value: "all",
                label: "All of the above roughly equally",
              },
            ]}
          />

          <RadioGroup
            label="2. How did vendor quotes typically arrive?"
            name="quoteFormat"
            value={form.quoteFormat}
            onChange={set("quoteFormat")}
            options={[
              { value: "spreadsheet", label: "Excel / spreadsheet" },
              { value: "pdf", label: "PDF documents" },
              {
                value: "system",
                label: "Through a procurement system (SAP, Ariba, etc.)",
              },
              { value: "mix", label: "Mix of formats" },
            ]}
          />

          <RadioGroup
            label="3. Did the OEM send vendors a standard RFQ template?"
            name="rfqTemplate"
            value={form.rfqTemplate}
            onChange={set("rfqTemplate")}
            options={[
              {
                value: "standard",
                label: "Yes — standard template vendors filled out",
              },
              {
                value: "vendor-own",
                label: "No — each vendor used their own format",
              },
              {
                value: "both",
                label:
                  "Both — there was a template but vendors often deviated",
              },
            ]}
          />

          <RadioGroup
            label="4. What e-coating chemistries were most common?"
            name="chemistryType"
            value={form.chemistryType}
            onChange={set("chemistryType")}
            options={[
              {
                value: "cathodic-epoxy",
                label: "Cathodic epoxy (most common in automotive)",
              },
              { value: "cathodic-acrylic", label: "Cathodic acrylic" },
              { value: "multiple", label: "Multiple types" },
              { value: "unsure", label: "Not sure" },
            ]}
          />

          <RadioGroup
            label="5. How did buyers decide if a vendor's price was reasonable?"
            name="priceValidation"
            value={form.priceValidation}
            onChange={set("priceValidation")}
            options={[
              {
                value: "past-quotes",
                label: "Compared to past quotes for similar parts",
              },
              { value: "gut", label: "Experience / gut feel" },
              {
                value: "model",
                label: "Internal should-cost model or spreadsheet",
              },
              { value: "combination", label: "Combination of methods" },
            ]}
          />

          <RadioGroup
            label="6. How many e-coating vendors would typically be RFQ'd for a single part?"
            name="vendorCount"
            value={form.vendorCount}
            onChange={set("vendorCount")}
            options={[
              { value: "2-3", label: "2-3 vendors" },
              { value: "4-6", label: "4-6 vendors" },
              { value: "7+", label: "7 or more" },
            ]}
          />

          <RadioGroup
            label="7. If you could only have ONE tool, which would help most?"
            name="mostHelpful"
            value={form.mostHelpful}
            onChange={set("mostHelpful")}
            options={[
              {
                value: "calculator",
                label:
                  "A calculator — input part specs, get an expected cost range",
              },
              {
                value: "normalizer",
                label:
                  "A normalizer — reads vendor quotes and creates a standard side-by-side comparison",
              },
              {
                value: "archive",
                label:
                  "A searchable archive of past quotes by part type, vendor, date",
              },
              {
                value: "other",
                label: "Something else (describe below)",
              },
            ]}
          />

          <RadioGroup
            label="8. Would an organization like Toyota be open to building a simple internal tool like this?"
            name="adoptionReadiness"
            value={form.adoptionReadiness}
            onChange={set("adoptionReadiness")}
            options={[
              {
                value: "appetite",
                label:
                  "There's appetite — someone just needs to show the concept",
              },
              {
                value: "blocked",
                label: "IT backlog would block it even if people wanted it",
              },
              {
                value: "depends",
                label: "Depends on the champion / department",
              },
              { value: "unsure", label: "Not sure" },
            ]}
          />
        </div>

        {/* Section: Open-Ended */}
        <div className="space-y-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Tell Us More
          </h2>
          <p className="text-sm text-gray-500">
            These open questions are the most valuable — your words will
            directly shape what we build. Write as much or as little as you
            want.
          </p>

          <TextArea
            label="The Friction"
            hint="When dealing with e-coating vendor quotes, what was the most frustrating part of the process? Walk us through a real example if you can."
            name="frictionStory"
            value={form.frictionStory}
            onChange={set("frictionStory")}
          />

          <TextArea
            label="The Unused Data"
            hint="What data or documents already existed that SHOULD have been useful but weren't? Vendor quotes, spreadsheets, historical pricing — what was sitting there unused or hard to access?"
            name="unusedData"
            value={form.unusedData}
            onChange={set("unusedData")}
          />

          <TextArea
            label="The Dream Tool"
            hint="If you could have had any simple tool on your desk — not a $100K enterprise system — what would it have done? What would you type in, and what would it show you?"
            name="dreamTool"
            value={form.dreamTool}
            onChange={set("dreamTool")}
          />

          <TextArea
            label="Anything Else"
            hint="Anything we should know that we didn't ask? What would make you say 'yes, THIS is what we needed'?"
            name="anythingElse"
            value={form.anythingElse}
            onChange={set("anythingElse")}
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-3">
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
