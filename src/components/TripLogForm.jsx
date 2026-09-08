import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function TripLogForm() {

    const [tripLogData, setTripLogData] = useState({
        tripName: "",
        tripDescription: "",
        startDate: "",
        endDate: "",
        privacy: "public",
    })

    const [logError, setLogError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTripLogData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLogError("");

        try {
            await createLog(tripLogData);
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof TypeError) {
                setLogError("We couldn't connect to the server. Please try again in a moment.")
            } else {
                setLogError(err.message);
            }
        }

    }

    return (
        <div className="trip-log">

            <form onSubmit={handleSubmit} className="log-form">
                <h2 className="log-title">Create a Trip Log</h2>
                {/* show trip log form error here if there is one. */}
                {logError && <p className="error">{logError}</p>}
                <div className="log-form-field">
                    <label>Trip Name</label>
                    <input
                        type="text"
                        id="tripName"
                        name="tripName"
                        value={tripLogData.tripName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="reg-form-field">
                    <label>Description/Notes</label>
                    <input
                        type="text"
                        id="tripDescription"
                        name="tripDescription"
                        value={tripLogData.tripDescription}
                        onChange={handleChange}
                    />
                </div>
                <div className="reg-form-field">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={tripLogData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="reg-form-field">
                    <label>End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={tripLogData.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="reg-form-field">
                <label>
                    <input
                        type="radio"
                        name="privacy"
                        value="public"
                        checked={tripLogData.privacy === "public"}
                        onChange={handleChange}
                    />
                    Public
                </label>
                </div>
                <div>
                <label>
                    <input
                        type="radio"
                        name="privacy"
                        value="private"
                        checked={tripLogData.privacy === "private"}
                        onChange={handleChange}
                    />
                    Private
                </label>
                </div>
            </form>
        </div>
    )
}

