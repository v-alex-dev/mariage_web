export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-6 text-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
        style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}
        aria-hidden="true"
      />
      <p
        className="font-sans text-xs uppercase tracking-[0.3em]"
        style={{ color: 'var(--text-secondary)' }}
      >
        Chargement…
      </p>
    </div>
  );
}
