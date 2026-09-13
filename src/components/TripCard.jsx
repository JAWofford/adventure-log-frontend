import './TripCard.css';
import { Link } from 'react-router-dom';

export default function TripCard({ trip }) {

    //format date string using abbreviated month format and four digit year.
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Link to={`/trip/${trip.tripId}`} className="card-link">
            <div className="card">
                <h1 className="card-title">{trip.tripName}</h1>
                {/*Both dates: show start without year + full end date  */}
                <div className="subheading">
                    {trip.startDate && trip.endDate && (
                        <div className="trip-dates">{(formatDate(trip.startDate)).split(",")[0]} — {formatDate(trip.endDate)}</div>
                    )}
                    {/* Start date only: show full start date  */}
                    {trip.startDate && !trip.endDate && (
                        <div className="trip-dates">{formatDate(trip.startDate)}</div>
                    )}

                    {trip.routeLegs.length !== 0 && <div className="card-leg-count">{trip.routeLegs.length} legs</div>}
                </div>
                {trip.tripDescription && <div className="trip-desc">{trip.tripDescription}</div>}
                <div className="stamp">{trip.privacy}</div>

            </div>
        </Link>
    )
}
