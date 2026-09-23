import AppLink from "./AppLink";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import './Dashboard.css';
import TripList from "./TripList";
import ReviewList from "./ReviewList";
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [pageView, setPageView] = useState(location.state?.initialTab ?? "trips")
  const handleTabClick = (view) => setPageView(view);


  if (loading) return (
    <div className="app-status">
      <p>Loading…</p>
    </div>
  )
  
//FUTURE: investigate using ProtectedRoute
//handle if user accesses this page without authenticaiton ie. direct url
  if (!user) return (
  <div className="app-status form-panel wrap">
      <p>Please log in to see the Dashboard</p>
    </div>
  )

  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Welcome Back, {user.displayName}</h1>
        <p>Here's what's in the log so far</p>
      </div>
      {/* //end page head */}
      <div className="dashboard-app-links">
        <AppLink
          to="/newtriplog"
          className={pageView === "trips" ? "orange-button" : ""}
          label="+ New Trip Log"
        />
        <AppLink
          to="/newreview"
          className={pageView === "reviews" ? "orange-button" : ""}
          label="+ New review"
        />
      </div>
      <div className="db-page-tabs">
        <Button
          className={pageView === "trips" ? "selected-tab" : "unselected-tab"}
          label="My Trips"
          onClick={() => handleTabClick("trips")} />
        <Button
          className={pageView === "reviews" ? "selected-tab" : "unselected-tab"}
          label="My Reviews"
          onClick={() => handleTabClick("reviews")} />
      </div>
      {pageView === "trips" ? <TripList /> : <ReviewList />}

    </div>
  )
}

export default Dashboard