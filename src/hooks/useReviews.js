import { useState, useEffect } from "react";
import { getUserReviews } from "../api/review";

/**
 * Fetches all reviews for the user once on mount.
 * @returns {{ reviews: Array, loading: boolean, error: string|null }}
 */

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getUserReviews();
                setReviews(data);
            } catch (err) {
                console.error('getUserReviews: ', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return {reviews, loading, error}
};

export default useReviews;