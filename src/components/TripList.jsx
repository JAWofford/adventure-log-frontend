import useTripLogs from '../hooks/useTripLogs.js'
import TripCard from './TripCard.jsx';
import './TripList.css';

export default function TripList() {

  //API call
  const {trips, loading, error} = useTripLogs();

  if (loading) return (
    <div className="app-status">
      <p>Loading trips…</p>
    </div>
  );

  if (error) return (
    <div className="app-status app-status--error">
      <p>Failed to load trips: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="list-results">
      {trips.length === 0 ?(
        <p> You haven't entered any trips yet.  Click New Trip Log above to get started.</p>
        ): (
          <div>
            <p>{trips.length} trip(s) found.</p>
            <div className="trip-grid">
              {trips.map(trip =>(
                <TripCard key={trip.tripId} trip={trip}/>
              ))}
            </div>
          </div>
        )}


    </div>
  )
}

