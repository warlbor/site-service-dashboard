// Tiny async-state UI primitives shared by data-bound components.

export function Skeleton({ rows = 5 }) {
  return (
    <div className="skeleton" aria-busy="true" aria-label="Loading data">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row" style={{ width: `${100 - i * 7}%` }} />
      ))}
    </div>
  )
}

export function ErrorNote({ error, onRetry }) {
  return (
    <div className="error-note" role="alert">
      <span>⚠ {error?.message ?? 'Something went wrong'}</span>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>Retry</button>
      )}
    </div>
  )
}
