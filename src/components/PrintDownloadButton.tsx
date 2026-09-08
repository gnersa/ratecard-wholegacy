"use client";

export default function PrintDownloadButton({ label = "Print / Download PDF" }: { label?: string }) {
  return (
    <button type="button" className="printPdfButton" onClick={() => window.print()}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 8V3h10v5M7 17h10v4H7z" />
        <path d="M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M17 12h.01" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
