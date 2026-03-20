"use client";

import { useEffect, useState } from "react";

interface Response {
  name: string;
  role: string;
  painPoint: string;
  quoteFormat: string;
  rfqTemplate: string;
  chemistryType: string;
  priceValidation: string;
  vendorCount: string;
  mostHelpful: string;
  adoptionReadiness: string;
  frictionStory: string;
  unusedData: string;
  dreamTool: string;
  anythingElse: string;
  submittedAt: string;
}

export default function ResponsesPage() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/submit")
      .then((r) => r.json())
      .then((data) => {
        setResponses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading responses...</p>
      </main>
    );
  }

  if (responses.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-500 text-lg">No responses yet.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Responses ({responses.length})
        </h1>
        {responses.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {r.name || "Anonymous"}
                </h2>
                <p className="text-sm text-gray-500">{r.role}</p>
              </div>
              <span className="text-xs text-gray-400">
                {r.submittedAt
                  ? new Date(r.submittedAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">#1 Pain:</span>{" "}
                {r.painPoint}
              </div>
              <div>
                <span className="font-medium text-gray-600">Quote format:</span>{" "}
                {r.quoteFormat}
              </div>
              <div>
                <span className="font-medium text-gray-600">RFQ template:</span>{" "}
                {r.rfqTemplate}
              </div>
              <div>
                <span className="font-medium text-gray-600">Chemistry:</span>{" "}
                {r.chemistryType}
              </div>
              <div>
                <span className="font-medium text-gray-600">Price check:</span>{" "}
                {r.priceValidation}
              </div>
              <div>
                <span className="font-medium text-gray-600">Vendor count:</span>{" "}
                {r.vendorCount}
              </div>
              <div>
                <span className="font-medium text-gray-600">Most helpful:</span>{" "}
                {r.mostHelpful}
              </div>
              <div>
                <span className="font-medium text-gray-600">Adoption:</span>{" "}
                {r.adoptionReadiness}
              </div>
            </div>

            {r.frictionStory && (
              <div>
                <h3 className="font-semibold text-gray-700">The Friction</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {r.frictionStory}
                </p>
              </div>
            )}
            {r.unusedData && (
              <div>
                <h3 className="font-semibold text-gray-700">Unused Data</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {r.unusedData}
                </p>
              </div>
            )}
            {r.dreamTool && (
              <div>
                <h3 className="font-semibold text-gray-700">Dream Tool</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {r.dreamTool}
                </p>
              </div>
            )}
            {r.anythingElse && (
              <div>
                <h3 className="font-semibold text-gray-700">Anything Else</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {r.anythingElse}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
