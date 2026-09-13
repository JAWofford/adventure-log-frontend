import { useState, useEffect } from "react";
import { getTripLogById } from "../api/log";

/**
 * Fetches a single trip log by id. Re-fetches if tripId changes.
 * @param {string|number} tripId
 * @returns {{ trip: Object|null, loading: boolean, error: string|null }}
 */

const useTripLog = (tripId) => {
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getTripLogById(tripId);
                setTrip(data);
            } catch (err) {
                console.error('getTripLogById: ', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [tripId]);

    return {trip, loading, error}
};

export default useTripLog;