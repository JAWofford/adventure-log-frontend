

import useReviews from '../hooks/useReviews.js'
import ReviewCard from './ReviewCard.jsx';
import './Lists.css';

export default function ReviewList() {

  //API call
  const {reviews, loading, error} = useReviews();

  if (loading) return (
    <div className="app-status">
      <p>Loading reviews…</p>
    </div>
  );

  if (error) return (
    <div className="app-status app-status--error">
      <p>Failed to load reviews: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="list-results">
      {reviews.length === 0 ?(
        <p> You haven't entered any reviews yet.  Click New Review above to get started.</p>
        ): (
          <div>
            <p>{reviews.length} review(s) found.</p>
            <div className="list-grid">
              {reviews.map(review =>(
                <ReviewCard key={review.campgroundId} review={review}/>
              ))}
            </div>
          </div>
        )}


    </div>
  )
}

