# AI Cost — E-Coating Cost Tool

## What This Is

A discovery/feedback web app for collecting input from domain experts (starting with Dave Ostreicher, ex-Toyota Purchasing) about e-coating vendor quote pain points. The responses will shape an eventual MVP cost estimator tool.

**This is NOT the cost estimator itself** — it's the data collection step that comes first.

## Goal

Inspire Toyota (and similar orgs) to build simple internal AI tools for vendor quote management. Art is not selling a product — he's demonstrating a concept.

## Architecture

- **Next.js 15** app with App Router, TypeScript, Tailwind CSS v4
- **Single page form** at `/` — 10 discovery questions (radio + open text each)
- **API route** at `/api/submit` — creates a GitHub Issue on `artsmalley/ai-cost` with label `feedback`
- **Responses viewer** at `/responses` — reads from GitHub Issues API
- **Deployed on Vercel** as `ai-cost-app.vercel.app`
- **No database** — GitHub Issues is the data store

## Environment Variables

- `GITHUB_TOKEN` — Fine-grained GitHub PAT with Issues read/write on `artsmalley/ai-cost` repo. Set in Vercel.

## Key Files

- `src/app/page.tsx` — The 10-question discovery form (main deliverable)
- `src/app/api/submit/route.ts` — POST handler that creates GitHub Issues
- `src/app/responses/page.tsx` — Client-side viewer that reads issues from GitHub API
- `EVALUATION.md` — Full research evaluation of the e-coating cost tool idea (in ai-cost repo, not this app repo)

## Commands

```bash
npm run dev    # Local dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Context

- **Dave Ostreicher** — U of Michigan, formerly Toyota Purchasing. Described the e-coating quote problem. Art emailed him 2026-03-20, expecting response in 2-3 weeks.
- **E-coating** — Electrodeposition coating process used heavily in automotive. Cost driven by surface area, film thickness, throw power, chemistry, pretreatment stages.
- **Market gap** — No dedicated e-coating cost tool exists between $0 spreadsheets and $100K+ enterprise tools (aPriori, FACTON).
- **First principles insight** — Dave's real pain was likely data retrieval/normalization, not estimation. The eventual MVP should focus on quote comparison and search, not just calculation.

## What Comes Next

1. Wait for Dave's email response
2. If green light — share form link or collect input via conversation
3. Use Dave's responses to shape MVP concept
4. Build a shell/mockup of the cost estimator tool
5. Show Dave → potentially demo to Toyota contacts as internal tool inspiration
