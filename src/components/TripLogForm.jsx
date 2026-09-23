import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLog, updateLog, addRouteLeg, updateRouteLeg } from "../api/log";
import Button from "./Button";
import './TripLogForm.css';
import RouteLegForm from "./RouteLegForm";


export default function TripLogForm({ existingTrip, onSaveSuccess, onCancel }) {

    const [tripLogData, setTripLogData] = useState(
        existingTrip //pulling in info for edit mode
            ? {
                ...existingTrip,
                startDate: existingTrip.startDate ?? "",
                endDate: existingTrip.endDate ?? "",
                routeLegs: existingTrip.routeLegs.map(leg => ({
                    ...leg,
                    legNotes: leg.legNotes ?? ""
                }))
            }
            : {
                tripName: "",
                tripDescription: "",
                startDate: "",
                endDate: "",
                privacy: "public",
                routeLegs: [{ legTitle: "", legNotes: "" }]  // starts with one blank leg
            });

    const [logError, setLogError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTripLogData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleLegChange = (index, name, value) => {
        //copy the route legs array
        const currentRouteLegs = [...tripLogData.routeLegs];
        //replace just the leg at [index],keeping its other fields.
        currentRouteLegs[index] = {
            ...currentRouteLegs[index],
            [name]: value
        };
        //Update tripLogData with the new routeLegs array.
        setTripLogData((prevData) => ({
            ...prevData,
            routeLegs: currentRouteLegs
        }));
    }

    const addLeg = () => {
        //copy the route legs array
        const newRouteLegs = [
            ...tripLogData.routeLegs,
            {
                legTitle: "",
                legNotes: ""
            }
        ];

        setTripLogData((prevData) => ({
            ...prevData,
            routeLegs: newRouteLegs
        }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLogError("");

        //separate route legs out from the trip-level fields
        const { routeLegs, ...tripLogOnly } = tripLogData;

        //check any null values.
        const cleanedData = {
            ...tripLogOnly,
            startDate: (tripLogOnly.startDate === "" ? null : tripLogOnly.startDate),
            endDate: (tripLogOnly.endDate === "" ? null : tripLogOnly.endDate)
        }

        try {
            //Edit Mode: PUT to update the existing trip(uses tripId already in object in state)
            //Create Mode: POST to create a brand-new trip and get back its generated tripId.
            let savedTrip = existingTrip
                ? await updateLog(existingTrip.tripId, cleanedData)
                : await createLog(cleanedData);


            //Drop any leg the user left blank (title-only required, per backend)
            const validLegs = routeLegs.filter(leg => leg.legTitle.trim() !== "");

            // Save legs one at a time, in order — the backend
            // calculates each new leg's legOrder from however many legs already exist.
            for (const leg of validLegs) {
                //determine which api method to call based on legId (only existing legs have this value)
                if ("legId" in leg) {
                    savedTrip = await updateRouteLeg(savedTrip.tripId, leg.legId, leg)
                } else {
                    savedTrip = await addRouteLeg(savedTrip.tripId, leg)
                }
            }
            existingTrip ? onSaveSuccess(savedTrip) : navigate(`/trip/${savedTrip.tripId}`);

        } catch (err) {
            if (err instanceof TypeError) {
                setLogError("We couldn't connect to the server. Please try again in a moment.")
            } else {
                setLogError(err.message);
            }
        }

    }

    const handleCancel = () => {
        if (existingTrip) {
            onCancel();
        } else {
            navigate('/dashboard');
        }
    };


    return (
        <div className="wrap">
            <div className="page-head">
                <h1>{existingTrip ? (
                    <>
                        <span className='edit-title-span'>Edit Trip:   </span>
                        {existingTrip.tripName}
                    </>
                ) : "New Trip Log"}</h1>
                <p>The scrapbook version — what you'd want to remember next time you plan a trip like this one.</p>
            </div>

            <form onSubmit={handleSubmit} >
                <div className="log-form-panel">
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
                            maxLength={250}
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
                </div>
                <div className="route-divider"><span className="pin"></span> Trip Legs <span className="pin"></span></div>

                {tripLogData.routeLegs.map((leg, index) => (
                    <div key={index} className="route-legs">
                        <div className="log-form-panel">
                            <RouteLegForm
                                legData={leg}
                                onChange={(name, value) => handleLegChange(index, name, value)}
                            />
                        </div>
                    </div>
                ))}

                <Button
                    className="add-leg-button"
                    onClick={addLeg}
                    label="+ Add another leg"
                />
                <div className="log-form-buttons">
                    <Button
                        className="cancel-button"
                        label="Cancel"
                        onClick={handleCancel} />
                    <Button
                        className="orange-button"
                        type="submit"
                        label="Save Trip Log" />
                </div>

            </form >
        </div >
    )
}

