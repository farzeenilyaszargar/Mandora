type Props = { kind: "project" | "agent" | "work" };

// Original, rounded line illustrations sized to remain clear at 48–56px.
export default function WorkflowIcon({ kind }: Props) {
  return (
    <span className="nap-step-symbol" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {kind === "project" && (
          <>
            <path d="M28 51H16a8 8 0 0 1-8-8V20a7 7 0 0 1 7-7h10a5 5 0 0 1 3.6 1.5l4 4A5 5 0 0 0 36 20h12a8 8 0 0 1 8 8v1" />
            <path d="M8 27h19" opacity=".45" />
            <rect x="33" y="33" width="24" height="23" rx="6" />
            <path d="m41 41-3.5 3.5L41 48m8-7 3.5 3.5L49 48" />
          </>
        )}
        {kind === "agent" && (
          <>
            <circle cx="28" cy="21" r="7.5" />
            <path d="M14 49v-3a14 14 0 0 1 25-8.7M14 49h19" />
            <g opacity=".45">
              <path d="M43 15a6 6 0 1 1 0 12m3 7a11 11 0 0 1 11 8" />
              <path d="M11 29a5 5 0 0 1 0-10M7 43a10 10 0 0 1 5-8" />
            </g>
            <circle cx="47" cy="46" r="10" />
            <path d="m42.5 46 3 3 6-6" />
          </>
        )}
        {kind === "work" && (
          <>
            <path d="M31 45h-9l-10 7v-9a9 9 0 0 1-5-8V21A10 10 0 0 1 17 11h28a10 10 0 0 1 10 10v12" />
            <path d="M18 23h24m-24 9h15" opacity=".55" />
            <circle cx="47" cy="46" r="10" />
            <path d="m42.5 46 3 3 6-6" />
          </>
        )}
      </svg>
    </span>
  );
}
