#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const DIMENSIONS = {
  openness: [
    ["B5_O_1", false],
    ["B5_O_2R", true]
  ],
  conscientiousness: [
    ["B5_C_1", false],
    ["B5_C_2R", true]
  ],
  extraversion: [
    ["B5_E_1", false],
    ["B5_E_2R", true]
  ],
  agreeableness: [
    ["B5_A_1", false],
    ["B5_A_2R", true]
  ],
  neuroticism: [
    ["B5_N_1", false],
    ["B5_N_2R", true]
  ],
  problem_solving: [
    ["PS_1", false],
    ["PS_2", false],
    ["PS_3R", true],
    ["PS_4", false],
    ["PS_5", false]
  ],
  social_ability: [
    ["SOC_1", false],
    ["SOC_2", false],
    ["SOC_3R", true],
    ["SOC_4", false]
  ],
  empathy: [
    ["EMP_1", false],
    ["EMP_2", false],
    ["EMP_3R", true],
    ["EMP_4", false]
  ],
  resilience: [
    ["RES_1", false],
    ["RES_2", false],
    ["RES_3R", true]
  ],
  energy: [
    ["ENG_1", false],
    ["ENG_2", false],
    ["ENG_3", false]
  ],
  morningness: [["CHR_1", false]]
};

function usage() {
  const msg = [
    "Usage:",
    "  node scripts/score_profile.js --input responses.json [--output profile.json] [--pretty]"
  ].join("\n");
  console.error(msg);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) out.input = argv[++i];
    else if (a === "--output" && argv[i + 1]) out.output = argv[++i];
    else if (a === "--pretty") out.pretty = true;
    else if (a === "--help" || a === "-h") out.help = true;
  }
  return out;
}

function toLikertNumber(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  if (n < 1 || n > 5) return null;
  return n;
}

function toPercentFromLikert(n) {
  return ((n - 1) / 4) * 100;
}

function avg(values) {
  const valid = values.filter((v) => Number.isFinite(v));
  if (!valid.length) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function round1(value) {
  if (!Number.isFinite(value)) return null;
  return Math.round(value * 10) / 10;
}

function scoreDimension(responses, items) {
  const missing = [];
  const values = [];
  for (const [id, reverse] of items) {
    const raw = toLikertNumber(responses[id]);
    if (raw === null) {
      missing.push(id);
      continue;
    }
    const corrected = reverse ? 6 - raw : raw;
    values.push(toPercentFromLikert(corrected));
  }
  const score = avg(values);
  return {
    score: round1(score),
    confidence: round1((values.length / items.length) * 100),
    answered: values.length,
    total: items.length,
    missing
  };
}

function scoreDisc(input) {
  const discIn = input && typeof input === "object" ? input : {};
  const raw = {
    D: toLikertNumber(discIn.D),
    I: toLikertNumber(discIn.I),
    S: toLikertNumber(discIn.S),
    C: toLikertNumber(discIn.C)
  };
  const normalized = {
    D: raw.D === null ? null : round1(toPercentFromLikert(raw.D)),
    I: raw.I === null ? null : round1(toPercentFromLikert(raw.I)),
    S: raw.S === null ? null : round1(toPercentFromLikert(raw.S)),
    C: raw.C === null ? null : round1(toPercentFromLikert(raw.C))
  };
  const entries = Object.entries(normalized).filter(([, v]) => v !== null);
  let dominant = null;
  if (entries.length) {
    const max = Math.max(...entries.map(([, v]) => v));
    dominant = entries
      .filter(([, v]) => v === max)
      .map(([k]) => k)
      .join("+");
  }
  return { scores: normalized, dominant };
}

function chronotypeLabel(morningnessScore) {
  if (!Number.isFinite(morningnessScore)) return "unknown";
  if (morningnessScore <= 33) return "evening-oriented";
  if (morningnessScore >= 67) return "morning-oriented";
  return "intermediate";
}

function buildRecommendations(scores) {
  const leverage = [];
  const watchouts = [];
  const evidenceGaps = [];

  const high = (k) => Number.isFinite(scores[k]?.score) && scores[k].score >= 70;
  const low = (k) => Number.isFinite(scores[k]?.score) && scores[k].score < 40;
  const weakConfidence = (k) =>
    Number.isFinite(scores[k]?.confidence) && scores[k].confidence < 60;

  if (high("problem_solving")) leverage.push("Use explicit decomposition and experiments for hard decisions.");
  if (high("conscientiousness")) leverage.push("Lean on planning systems and defined commitments.");
  if (high("empathy")) leverage.push("Use perspective-taking in coaching, negotiation, and conflict repair.");
  if (high("social_ability")) leverage.push("Favor collaborative problem framing over solo alignment.");
  if (high("energy")) leverage.push("Batch deep work into longer focus blocks.");

  if (high("neuroticism")) watchouts.push("Stress reactivity may distort risk estimates under pressure.");
  if (low("conscientiousness")) watchouts.push("Execution drift likely without short-cycle accountability.");
  if (low("resilience")) watchouts.push("Plan recovery rituals to prevent prolonged downturns after setbacks.");
  if (low("social_ability")) watchouts.push("Clarify intent and feedback loops in high-stakes communication.");
  if (low("empathy")) watchouts.push("Actively verify assumptions about others' emotional state.");

  Object.keys(scores).forEach((k) => {
    if (weakConfidence(k)) evidenceGaps.push(`Collect additional responses for ${k}.`);
  });

  return { leverage, watchouts, evidence_gaps: evidenceGaps };
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.input) {
    usage();
    process.exit(args.help ? 0 : 1);
  }

  const inputPath = path.resolve(process.cwd(), args.input);
  const raw = fs.readFileSync(inputPath, "utf8");
  const data = JSON.parse(raw);
  const responses = data.responses && typeof data.responses === "object" ? data.responses : {};

  const scores = {};
  const missingItems = [];
  for (const [dimension, items] of Object.entries(DIMENSIONS)) {
    scores[dimension] = scoreDimension(responses, items);
    missingItems.push(...scores[dimension].missing);
  }

  const disc = scoreDisc(data.disc);
  const neuroticism = scores.neuroticism.score;
  const emotionalRegulation = avg([
    Number.isFinite(neuroticism) ? 100 - neuroticism : null,
    scores.resilience.score
  ]);

  const derived = {
    strategist: round1(avg([scores.openness.score, scores.problem_solving.score])),
    executor: round1(
      avg([scores.conscientiousness.score, scores.problem_solving.score, scores.energy.score])
    ),
    connector: round1(
      avg([scores.extraversion.score, scores.social_ability.score, scores.empathy.score])
    ),
    regulator: round1(emotionalRegulation),
    vitality: round1(avg([scores.energy.score, scores.resilience.score]))
  };

  const result = {
    generated_at: new Date().toISOString(),
    subject: data.subject || {},
    scores,
    chronotype_label: chronotypeLabel(scores.morningness.score),
    via_top_strengths: Array.isArray(data.via_top_strengths) ? data.via_top_strengths : [],
    disc,
    derived_attributes: derived,
    recommendations_context: buildRecommendations(scores),
    missing_items: missingItems,
    notes: data.notes || ""
  };

  const serialized = JSON.stringify(result, null, args.pretty || args.output ? 2 : 0);
  if (args.output) {
    fs.writeFileSync(path.resolve(process.cwd(), args.output), serialized + "\n", "utf8");
  } else {
    process.stdout.write(serialized + "\n");
  }
}

main();
