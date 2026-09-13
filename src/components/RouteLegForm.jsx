export default function RouteLegForm({onChange, legData}) {

    // Sends just the changed field and value to the parent from event object
const handleFieldChange = (e) => {
        onChange(e.target.name, e.target.value);
    }

    return (
        <div className="route-legs">
            <div className="field">
                <label>Route Leg Title: <span className="required">*</span> </label>
                <input
                    type="text"
                    placeholder="e.g. Springfield, MO to Gatlinburg, TN"
                    id="legTitle"
                    name="legTitle"
                    maxLength={250}
                    value={legData.legTitle}
                    onChange={handleFieldChange}
        />
            </div>
            <div className="field">
                <label>Notes</label>
                <textarea
                type="text"
                placeholder="Best gas station, route quirks, where you stopped, anything worth remembering"
                id="legNotes"
                name="legNotes"
                value={legData.legNotes}
                onChange={handleFieldChange}
                />
            </div>
        </div>
    )

}