# Thinking Discipline

9-rule thinking discipline for this project's coding agent, sourced from the
[thinking-quality-exam](https://github.com/Arshad-Kamal/thinking-quality-exam) research project (MIT).

The block is installed in two places:

1. `AGENT_THINKING_RULES.md` — project documentation, with measured-effect context
2. `~/.cursor/skills-cursor/thinking-discipline/SKILL.md` — Cursor Agent Skill, always-on for the agent in this workspace

## The rules in one line each

1. Check the request first; flag wrong premises plainly.
2. Finish one approach before switching; name blockers concretely.
3. Settled answers stay settled; move on.
4. Doubt is not evidence; changing an answer requires naming a concrete reason.
5. Don't revise just to agree; ask for the specific fact behind pushback.
6. New evidence reopens the case; update immediately and say what changed.
7. Verify against outside facts (tests, builds, sources), not by rethinking.
8. Don't perform caution; state residual uncertainty once if it matters.
9. Only correct earlier statements when the error changes outcomes; be brief.

## Evidence

From the source repo (574+ runs, deterministic scoring, 0 test edits):

- GLM-family models: **−70% wasted thinking tokens** under mild pushback with the block.
- **0 tasks lost** to the block across all arms (hard gate in the research).
- Designed to resist both sycophantic flip-flops and wrongful reverts under authority pressure.
