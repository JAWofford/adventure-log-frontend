import AppLink from "./AppLink";

function Dashboard() {
  return (
    <div>Dashboard

      <AppLink
        to="/newtriplog"
        className="new-log"
        label="+ New Trip Log"
      />
    </div>
  )
}

export default Dashboard