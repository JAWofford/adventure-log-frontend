import { useState } from "react";
import states from "../utils/states";
import { createReview, addReviewStay } from "../api/review";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ReviewStayForm from "./ReviewStayForm";
import './ReviewForm.css';

export default function ReviewForm() {

    const [reviewData, setReviewData] = useState({
        campgroundName: "",
        campgroundNotes: "",
        location: "",
        state: "",
        privacy: "public",
        reviewStays: [{ dateStayed: "", siteNumber: "", stayNotes: "" }] //starts with one blank stay
    });

    const [reviewError, setReviewError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setReviewData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const navigate = useNavigate();
    const handleCancel = () => {

        navigate('/dashboard');
    };

    const handleStayChange = (index, name, value) => {
        //copy the route legs array
        const currentReviewStays = [...reviewData.reviewStays];
        //replace just the stay at [index],keeping its other fields.
        currentReviewStays[index] = {
            ...currentReviewStays[index],
            [name]: value
        };
        //Update tripLogData with the new routeLegs array.
        setReviewData((prevData) => ({
            ...prevData,
            reviewStays: currentReviewStays
        }));
    }

    const addStay = () => {
        //copy the reviewStays array
        const newStays = [
            ...reviewData.reviewStays,
            {
                dateStayed: "",
                siteNumber: "",
                stayNotes: ""
            }
        ];

        setReviewData((prevData) => ({
            ...prevData,
            reviewStays: newStays
        }));
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        setReviewError("");

        //separate stays out from the review-level fields
        const { reviewStays, ...reviewOnly } = reviewData;

        try {
            const createdReview = await createReview(reviewOnly);
            //filter review stays, then loop and await addReviewStay for each.
            const validStays = reviewStays.filter(stay =>
                stay.dateStayed.trim() !== "" ||
                stay.siteNumber.trim() !== "" ||
                stay.stayNotes.trim() !== ""
            );
            for (const stay of validStays) {
                //check for any null values for date stayed.
                const cleanedStay = {
                    ...stay,
                    dateStayed: stay.dateStayed === "" ? null : stay.dateStayed
                };
                await addReviewStay(createdReview.campgroundId, cleanedStay)
            }
            
            navigate(`/review/${createdReview.campgroundId}`);
        } catch (err) {
            if (err instanceof TypeError) {
                setReviewError("We couldn't connect to the server. Please try again in a moment.")
            } else {
                setReviewError(err.message);
            }
        }
    }

    return (
        <div className='wrap'>
            <div className="page-head">
                <h1>New Campground Review</h1>
                <p>Log a stay - the site,the campground, and anything future-you should know.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-panel">
                    <p className="required-note">* Required field</p>
                    {/* show campground review form error here if there is one. */}
                    {reviewError && <p className="error">{reviewError}</p>}
                    <div className="field">
                        <label>Campground Name: <span className="required">*</span></label>
                        <input
                            type="text"
                            id="campgroundName"
                            name="campgroundName"
                            value={reviewData.campgroundName}
                            onChange={handleChange}
                            maxLength={250}
                            required
                        />
                    </div>
                    <div className="field-row">
                    <div className="field">
                        <label>Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={reviewData.location}
                            onChange={handleChange}
                            maxLength={250}
                        />
                    </div>
                    <div className="field">
                        <label>State:</label>
                        <select
                            name="state"
                            id="state"
                            value={reviewData.state}
                            onChange={handleChange}
                        >
                            <option value="">Select a state</option>

                            {states.map((state) => (
                                <option key={state.abbreviation} value={state.abbreviation}>
                                    {state.name} ({state.abbreviation})
                                </option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className="privacy-section">
                        <h1>Who Can See This <span className="required">*</span></h1>
                        <p>Reviews you mark public show up for everyone, private ones stay just for your own log.</p>
                        <div className="privacy-field-row">
                            <div className="field">
                                <label>
                                    <input
                                        type="radio"
                                        name="privacy"
                                        value="public"
                                        checked={reviewData.privacy === "public"}
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
                                        checked={reviewData.privacy === "private"}
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
                            id="campgroundNotes"
                            name="campgroundNotes"
                            placeholder="Amenities, noise leve, check-in experience, dump station, general vibe..."
                            value={reviewData.campgroundNotes}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="route-divider"><span className="pin"></span> Stays <span className="pin"></span></div>

                    {reviewData.reviewStays.map((stay, index) => (
                        <div key={index} className="route-legs">
                            <div className="stay">
                                <ReviewStayForm
                                    stayData={stay}
                                    onChange={(name, value) => handleStayChange(index, name, value)}
                                />
                            </div>
                        </div>
                    ))}

                    <Button
                        className="add-leg-button"
                        onClick={addStay}
                        label="+ Add another stay"
                    />
                    </div>

                    <div className="review-form-buttons">
                        <Button
                            className="cancel-button"
                            label="Cancel"
                            onClick={handleCancel} />
                        <Button
                            className="orange-button"
                            type="submit"
                            label="Save Campground Review" />
                    </div>
                
            </form>

        </div>
    )
}
