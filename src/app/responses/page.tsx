"use client";

import { useEffect, useState } from "react";

interface Issue {
  title: string;
  body: string;
  created_at: string;
  html_url: string;
}

export default function ResponsesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/repos/artsmalley/ai-cost/issues?labels=feedback&state=all")
      .then((r) => r.json())
      .then((data) => {
        setIssues(Array.isArray(data) ? data : []);
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

  if (issues.length === 0) {
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
          Responses ({issues.length})
        </h1>
        {issues.map((issue, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">{issue.title}</h2>
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline"
              >
                View on GitHub
              </a>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {issue.body}
            </div>
            <span className="text-xs text-gray-400">
              {new Date(issue.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
