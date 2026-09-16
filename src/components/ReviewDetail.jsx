
import { useParams } from 'react-router-dom';
import useReview from '../hooks/useReview.js'
import './TripDetail.css'
import { Link } from 'react-router-dom';

export default function ReviewDetail() {
    const { campgroundId } = useParams();
    //api call for one review
    const { review, loading, error } = useReview(campgroundId);

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
            <p>Loading campground review…</p>
        </div>
    );

    if (error) return (
        <div className="app-status app-status--error">
            <p>Failed to load campground review: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    //main return
    return (
          <div className="wrap">
            <div className="trip-detail">
                <div className="page-head">
                    <h2>{review.campgroundName}</h2>

                </div>
                <div className="trip-detail-subheading">
                    {review.location} -- {review.state}
                     <Link to="/dashboard" state={{ initialTab: "reviews" }} className="back-link">← Back</Link>
                </div>
                <div className="route-divider"><span className="pin"></span> Campground Review <span className="pin"></span></div>
                <div className="form-panel">
                    <h3 className="trip-desc-title">Description/Notes:</h3>
                    <div className="trip-desc">{review.campgroundNotes}</div>
                </div>
                <div className="route-legs">
                    {review.reviewStays.map((stay) => (
                        <div key={stay.stayId} className="leg-display">
                            <div className="log-detail-panel">
                                {stay.dateStayed && <h3>Date Stayed: {formatDate(stay.dateStayed)}</h3>}
                                {stay.siteNumber && <h3>Site Number: {stay.siteNumber}</h3>}
                                {stay.stayNotes && <h3>Notes: {stay.stayNotes}</h3>}
                                <div className="dashed-line"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}