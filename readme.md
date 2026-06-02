# Skills for Agentic Digital Twin Planning

This repository is organized by skill category:

- `agentic-game-simulation/` — Core skills for modeling real-life situations as an explicit, agentic game.
- `utils/` — Utility skills, currently focused on Tailscale operations.

The two core simulation skills are:

- map yourself as a playable character with constraints, tendencies, and leverage
- map the scenario as a multi-actor game with incentives, pressure points, and branches

The goal is not vague brainstorming. The goal is to build a practical digital twin of a situation, then prepare moves, counters, recovery paths, and escalation logic before the real interaction happens.

The utilities category currently includes:

- `tailscale-cli`, `tailscale-dns`, `tailscale-exit-nodes`, `tailscale-funnel`, `tailscale-serve`, `tailscale-ssh`

## Quickstart

1. Install these skills with GitHub CLI: `gh skill install sgoley/skills`.
2. Run **`/write-character-sheet`** to build your player model.
3. Run **`/game-theory-scenario`** to model actors, incentives, and pathway branches.
4. Use the output as a readiness pack for live execution, then iterate after each real-world round.

## Why These Skills Exist

Most high-stakes outcomes fail for predictable reasons:

1. You underestimate your own constraints and stress behavior.
2. You model other actors too shallowly (titles, not incentives).
3. You enter conversations with one preferred script instead of branch-aware preparation.

These skills fix that with a two-layer system:

- **Layer 1 (Self model):** Build an evidence-weighted character sheet from structured interview inputs.
- **Layer 2 (Scenario model):** Build a face-up game board of actors, signals, uncertainty, and plausible branches.

Together, they create a reusable operating model for negotiations, interviews, relationships, stakeholder conflict, and decisions under uncertainty.

## Core Workflow

### 1) Build the player model (`/write-character-sheet`)

Generate an RPG-style profile with:

- Core stats (Big Five + problem solving + social ability + empathy + resilience + energy + chronotype)
- Derived attributes (strategist, executor, connector, regulator, vitality)
- Habits to keep/change, goals by horizon, resources/support map, influential inputs, daily structure
- Evidence gaps and confidence-aware guidance

This gives you a realistic “who is making the move?” baseline instead of abstract advice.

### 2) Build the board model (`/game-theory-scenario`)

Generate a scenario readiness pack with:

- Scenario snapshot and constraints
- Evidence dossier (emails, transcripts, notes, prior decisions, reliability)
- Actor map + face-up cards (incentives, pressures, red lines, implicit drivers)
- Pathway tree (cooperative / neutral / adversarial / mixed branches)
- Response menu, risk/escalation/exit plan, and rehearsal drills

This gives you a branch-aware “what game is actually being played?” map.

### 3) Rehearse and adapt

Optionally run role simulation (one role agent per actor), then update your response menu and escalation plan. Treat simulation as stress testing, not prediction.

## Reference

### `agentic-game-simulation`

- **[write-character-sheet](./agentic-game-simulation/write-character-sheet/SKILL.md)** — Structured self-profiling skill that creates a richer character sheet (including habits, goals, resources, influences, and daily structure) with evidence-weighted scores.
- **[game-theory-scenario](./agentic-game-simulation/game-theory-scenario/SKILL.md)** — Scenario planning skill that interviews for context, maps actor incentives and uncertainty, and outputs practical branch-ready preparation.

### `utils`

- **[tailscale-cli](./utils/tailscale-cli/SKILL.md)** — Use the Tailscale CLI for device management, diagnostics, and configuration.
- **[tailscale-dns](./utils/tailscale-dns/SKILL.md)** — Configure MagicDNS, nameservers, split DNS, and search domains.
- **[tailscale-exit-nodes](./utils/tailscale-exit-nodes/SKILL.md)** — Route traffic through tailnet exit nodes.
- **[tailscale-funnel](./utils/tailscale-funnel/SKILL.md)** — Expose local services publicly with Tailscale Funnel.
- **[tailscale-serve](./utils/tailscale-serve/SKILL.md)** — Share local services/files internally over your tailnet.
- **[tailscale-ssh](./utils/tailscale-ssh/SKILL.md)** — Enable and manage Tailscale SSH access controls.

## Suggested Sequence for Real Scenarios

1. Run `/write-character-sheet` once deeply, then refresh periodically.
2. Run `/game-theory-scenario` per high-stakes situation.
3. Before execution, rehearse one adversarial branch and one mixed branch.
4. After execution, log what signals were accurate vs wrong and update both models.