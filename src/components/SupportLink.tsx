const DANA_URL = "https://m.dana.id/n/link/minta?full_url=https://qr.dana.id/v1/281012012019111164919844";

export default function SupportLink({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`supportDana ${compact ? "compact" : ""}`}
      href={DANA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a cigarette on DANA"
    >
      <span>buy me a cigarette on</span>
      <img src="/dana-logo.png" alt="DANA" />
    </a>
  );
}
