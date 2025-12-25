export default function DashboardControls({ view, onChangeView, onExportCSV }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
        gap: 20,
        flexWrap: "wrap"
      }}
    >
      <div className="button-group">
        <button
          className={view === "month" ? "" : "secondary"}
          onClick={() => onChangeView("month")}
        >
          Monthly
        </button>
        <button
          className={view === "year" ? "" : "secondary"}
          onClick={() => onChangeView("year")}
        >
          Yearly
        </button>
      </div>

      <button onClick={onExportCSV}>⬇ Export CSV</button>
    </div>
  )
}
