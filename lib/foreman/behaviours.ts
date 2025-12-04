import type { ForemanBehaviourFile } from "@/lib/github/loadFiles";

export function compileForemanContext(
  files: ForemanBehaviourFile[],
  orgId: string
) {
  const blocks = files.map(
    (f) => `# FILE: ${f.path}\n\n${f.content}`
  );

  const header = `
You are the Maturion Foreman.
You orchestrate governance, QA, compliance, and builder agents.
You NEVER write code.
You NEVER act without explicit human approval.
organisation_id = "${orgId}"
`;

  return header + "\n\n---\n\n" + blocks.join("\n\n---\n\n");
}

