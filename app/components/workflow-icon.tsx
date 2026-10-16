type Props = { kind: "project" | "agent" | "work" };

export default function WorkflowIcon({ kind }: Props) {
  return (
    <span className="nap-step-symbol" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {kind === "project" && (
          <>
            <path d="M8 25V17a4 4 0 0 1 4-4h12l7 8h21a4 4 0 0 1 4 4v23a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V25Zm0 0h48" />
            <path d="m24 33-6 6 6 6m16-12 6 6-6 6m-5-13-6 15" />
          </>
        )}
        {kind === "agent" && (
          <>
            <rect x="7" y="10" width="43" height="35" rx="4" />
            <path d="M7 20h43m-34 8 5 5-5 5m12 0h8" />
            <circle cx="14" cy="15" r=".8" fill="currentColor" stroke="none" />
            <circle cx="19" cy="15" r=".8" fill="currentColor" stroke="none" />
            <path d="M14 45v6a4 4 0 0 0 4 4h18" />
            <circle cx="47" cy="46" r="11" />
            <path d="m42 46 3.5 3.5L52 43" />
          </>
        )}
        {kind === "work" && (
          <>
            <circle cx="11" cy="16" r="3" />
            <circle cx="11" cy="36" r="3" />
            <circle cx="11" cy="54" r="3" />
            <path d="M11 19v14m0 6v12m15-1h26m-26 6h17" />
            <path d="M29 8h24a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H36l-10 7V12a4 4 0 0 1 3-4Z" />
            <path d="M33 17h17m-17 7h11" />
          </>
        )}
      </svg>
    </span>
  );
}
