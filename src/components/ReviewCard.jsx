import './TripCard.css';
import { Link } from 'react-router-dom';

export default function ReviewCard({ review }) {

       return (
        <Link to={`/review/${review.campgroundId}`} className="card-link">
            <div className="card">
                <h1 className="card-title">{review.campgroundName}</h1>
                {/*Both dates: show start without year + full end date  */}
                <div className="subheading">
                    <div>{review.location} -- {review.state}</div>

                    {review.reviewStays.length !== 0 && <div className="card-leg-count">{review.reviewStays.length} visits</div>}
                </div>
                {review.campgroundNotes && <div className="trip-desc">{review.campgroundNotes}</div>}
                <div className="stamp">{review.privacy}</div>

            </div>
        </Link>
    )
}