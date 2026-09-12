import { useState, useEffect } from "react";
import { getUserTripLogs } from "../api/log";

/**
 * Fetches all trips for the user once on mount.
 * @returns {{ trips: Array, loading: boolean, error: string|null }}
 */

const useTripLogs = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getUserTripLogs();
                setTrips(data);
            } catch (err) {
                console.error('getUserTripLogs: ', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return {trips, loading, error}
};

export default useTripLogs;