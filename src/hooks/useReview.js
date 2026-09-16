import { useState, useEffect } from "react";
import { getReviewById } from "../api/review";

/**
 * Fetches a single review by id. Re-fetches if campgroundId changes.
 * @param {string|number} campgroundId
 * @returns {{ review: Object|null, setReview: Function, loading: boolean, error: string|null }}
 */

const useReview = (campgroundId) => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getReviewById(campgroundId);
                setReview(data);
            } catch (err) {
                console.error('getReviewById: ', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [campgroundId]);

    return {review, setReview, loading, error}
};

export default useReview;