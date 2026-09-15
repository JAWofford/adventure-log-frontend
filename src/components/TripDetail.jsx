import useTripLog from '../hooks/useTripLog';
import { useParams, useNavigate } from 'react-router-dom';
import './TripDetail.css';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import TripLogForm from './TripLogForm';
import { deleteLog } from '../api/log';

export default function TripDetail() {

    const { tripId } = useParams();
    //Api Call for one trip
    const { trip, setTrip, loading, error } = useTripLog(tripId);
    //triggered by the edit button to render the read-only jsx or call the TripLogForm for editing.
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => setIsEditing(true);

    const handleSaveSuccess = (updatedTrip) => {
        setTrip(updatedTrip);
        setIsEditing(false);
    };


    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm("Delete this trip log and all it's route legs? This can't be undone.")
        if (!confirmed) return;

        try {
            await deleteLog(trip.tripId);
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof TypeError) {
                alert("We couldn't connect to the server. Please try again in a moment.") //TODO: change to custom error handling.
            } else {
                alert(err.message);
            }
        }

    }


    //Set isEditing to false so component unmounts.
    // On unmount React destroys all it's local state.
    const handleCancelEdit = () => setIsEditing(false);

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
        // if editing display tripForm pre-filled, otherwise display this components read-only jsx.
        <div>
            {!isEditing ? (
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

                        <Button
                            className="edit-button"
                            onClick={handleEditClick}
                            label=
                            {<svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>}
                            title="Edit trip log" />
                        <Button
                            className="delete-button"
                            onClick={handleDelete}
                            label="Delete"
                            title="Delete trip log" />
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
            ) : (
                <TripLogForm
                    existingTrip={trip}
                    onSaveSuccess={handleSaveSuccess}
                    onCancel={handleCancelEdit} />
            )}
        </div>

    );
}
