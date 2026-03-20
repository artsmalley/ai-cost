import { NextResponse } from "next/server";

function section(title: string, pick: string, detail: string): string {
  const pickLine = pick ? `**Selected:** ${pick}` : "*No selection*";
  const detailLine = detail || "*No additional detail*";
  return `### ${title}\n${pickLine}\n\n${detailLine}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = process.env.GITHUB_TOKEN;
    const repo = "artsmalley/ai-cost";

    const issueBody = `## Respondent
- **Name:** ${body.name || "Anonymous"}
- **Role:** ${body.role || "Not specified"}

---

${section("1. #1 Pain Point", body.painPoint, body.painPointDetail)}

${section("2. Quote Format", body.quoteFormat, body.quoteFormatDetail)}

${section("3. RFQ Template", body.rfqTemplate, body.rfqTemplateDetail)}

${section("4. Chemistry Type", body.chemistryType, body.chemistryTypeDetail)}

${section("5. Price Validation", body.priceValidation, body.priceValidationDetail)}

${section("6. Vendor Count", body.vendorCount, body.vendorCountDetail)}

${section("7. Most Helpful Tool", body.mostHelpful, body.mostHelpfulDetail)}

${section("8. Adoption Readiness", body.adoptionReadiness, body.adoptionReadinessDetail)}

### 9. Anything Else
${body.anythingElse || "*No response*"}

---
*Submitted: ${body.submittedAt}*
`;

    if (token) {
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
