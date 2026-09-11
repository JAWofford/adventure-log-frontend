import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createLog } from "../api/log";
import Button from "./Button";
import './TripLogForm.css';


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

        //check any null values.
        const cleanedData = {
            ...tripLogData,
            startDate: (tripLogData.startDate === "" ? null : tripLogData.startDate),
            endDate: (tripLogData.endDate === "" ? null : tripLogData.endDate)
        }

        try {
            await createLog(cleanedData);
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
        <div className="wrap">
            <div className="page-head">
                <h1>New Trip Log</h1>
                <p>The scrapbook version — what you'd want to remember next time you plan a trip like this one.</p>
            </div>
            <div className="layout">
                <form onSubmit={handleSubmit} className="form-panel">
                    <p className="required-note">* Required field</p>
                    {/* show trip log form error here if there is one. */}
                    {logError && <p className="error">{logError}</p>}
                    <div className="field">
                        <label>Trip Name: <span className="required">*</span></label>
                        <input
                            type="text"
                            id="tripName"
                            name="tripName"
                            value={tripLogData.tripName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field-row">
                        <div className="field">
                            <label>Start Date:</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={tripLogData.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>End Date:</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={tripLogData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="privacy-section">
                        <h1>Who Can See This <span className="required">*</span></h1>
                        <p>Trips you mark public show up for everyone, private ones stay just for your own log.</p>
                    <div className="privacy-field-row">
                        <div className="field">
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
                        <div className="field">
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
                    </div>
                    </div>
                    <div className="field">
                        <label>Description/Notes</label>
                        <textarea
                            type="text"
                            id="tripDescription"
                            name="tripDescription"
                            value={tripLogData.tripDescription}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="submit-button">
                        <Button
                            className="submit-button-login"
                            type="submit"
                            label="Save Trip Log" />
                    </div>
                </form>
            </div>
        </div>
    )
}

