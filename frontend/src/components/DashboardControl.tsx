type Props = {
  month: Date
  onPrev: () => void
  onNext: () => void
}

export default function DashboardControls({ month, onPrev, onNext }: Props) {
  const label = month.toLocaleString("default", {
    month: "long",
    year: "numeric"
  })

  return (
    <div
      className="card section"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16
      }}
    >
      <button className="secondary" onClick={onPrev}>
        ◀ Prev
      </button>

      <h2 style={{ margin: 0 }}>{label}</h2>

      <button className="secondary" onClick={onNext}>
        Next ▶
      </button>
    </div>
  )
}
