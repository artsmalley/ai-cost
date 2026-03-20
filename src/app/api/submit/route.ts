import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = process.env.GITHUB_TOKEN;
    const repo = "artsmalley/ai-cost";

    // Format the response as a readable GitHub issue body
    const issueBody = `## Respondent
- **Name:** ${body.name || "Anonymous"}
- **Role:** ${body.role || "Not specified"}

## Quick Answers
| Question | Answer |
|----------|--------|
| #1 Pain point | ${body.painPoint || "—"} |
| Quote format | ${body.quoteFormat || "—"} |
| RFQ template | ${body.rfqTemplate || "—"} |
| Chemistry type | ${body.chemistryType || "—"} |
| Price validation | ${body.priceValidation || "—"} |
| Vendor count | ${body.vendorCount || "—"} |
| Most helpful tool | ${body.mostHelpful || "—"} |
| Adoption readiness | ${body.adoptionReadiness || "—"} |

## The Friction
${body.frictionStory || "*No response*"}

## Unused Data
${body.unusedData || "*No response*"}

## Dream Tool
${body.dreamTool || "*No response*"}

## Anything Else
${body.anythingElse || "*No response*"}

---
*Submitted: ${body.submittedAt}*
`;

    if (token) {
      // Store as a GitHub issue
      await fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Feedback: ${body.name || "Anonymous"} — ${new Date().toLocaleDateString()}`,
          body: issueBody,
          labels: ["feedback"],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to save response" },
      { status: 500 }
    );
  }
}
