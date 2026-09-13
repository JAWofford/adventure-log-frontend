import useTripLog from '../hooks/useTripLog';
import { useParams } from 'react-router-dom';
import './TripDetail.css';
import { Link } from 'react-router-dom';

export default function TripDetail() {

    const { tripId } = useParams();
    //Api Call for one trip
    const { trip, loading, error } = useTripLog(tripId);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };


    if (loading) return (
        <div className="app-status">
            <p>Loading trip…</p>
        </div>
    );

    if (error) return (
        <div className="app-status app-status--error">
            <p>Failed to load trip: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    //main return
    return (
        <div className="wrap">
            <div className="trip-detail">
                <div className="page-head">
                    <h2>{trip.tripName}</h2>

                </div>
                <div className="trip-detail-subheading">
                    {trip.startDate && trip.endDate && (
                        <div className="trip-dates">{(formatDate(trip.startDate)).split(",")[0]} — {formatDate(trip.endDate)}</div>
                    )}
                    {/* Start date only: show full start date  */}
                    {trip.startDate && !trip.endDate && (
                        <div className="trip-dates">{formatDate(trip.startDate)}</div>
                    )}
                     <Link to="/dashboard" className="back-link">← Back</Link>
                </div>
                <div className="route-divider"><span className="pin"></span> Trip Log <span className="pin"></span></div>
                <div className="form-panel">
                    <h3 className="trip-desc-title">Description/Notes:</h3>
                    <div className="trip-desc">{trip.tripDescription}</div>
                </div>
                <div className="route-legs">
                    {trip.routeLegs.map((leg) => (
                        <div key={leg.legId} className="leg-display">
                            <span className="mark">{leg.legOrder}</span>
                            <div className="log-detail-panel">
                                <h3>{leg.legTitle}</h3>
                                {leg.legNotes && <p>{leg.legNotes}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
