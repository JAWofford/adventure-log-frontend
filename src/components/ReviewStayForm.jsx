
export default function ReviewStayForm({ onChange, stayData }) {

    // Sends just the changed field and value to the parent from event object
    const handleFieldChange = (e) => {
        onChange(e.target.name, e.target.value);
    }

    return (
        <div className="route-legs">
            <div className="field-row">
                <div className="field">
                    <label>Date Stayed:</label>
                    <input
                        type="date"
                        id="dateStayed"
                        name="dateStayed"
                        value={stayData.dateStayed}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="field">
                <label>Site Number</label>
                <input
                    type="text"
                    placeholder="e.g. 14"
                    id="siteNumber"
                    name="siteNumber"
                    maxLength={250}
                    value={stayData.siteNumber}
                    onChange={handleFieldChange}
        />
            </div>
            </div>
            <div className="field">
                <label>Notes About Your Site</label>
                <textarea
                    type="text"
                    placeholder="Level? Shaded? Hookups? Would you request it again?"
                    id="stayNotes"
                    name="stayNotes"
                    value={stayData.stayNotes}
                    onChange={handleFieldChange}
                />
            </div>
            <div className="dashed-line"></div>
        </div>
    )
}
