
import { useState } from "react";
import OvalSticker from "./OvalSticker";
import MountainSticker from "./MountainSticker";
import BeachSticker from "./BeachSticker";
import Button from "../Button";
import stickerDesigns from "./stickerDesigns";
import './StickerCreator.css';

export default function StickerCreator({ setStickers }) {

    const [design, setDesign] = useState("oval");
    const [placeName, setPlaceName] = useState("");
    const [largeText, setLargeText] = useState("");
    const [subtitle, setSubtitle] = useState("");

    const handleAddSticker = () => {
        const newSticker = {
            id: Date.now(),
            design: design,
            placeName: placeName,
            largeText: largeText,
            subtitle: subtitle
        };

        setStickers(prevStickers => [
            ...prevStickers,
            newSticker
        ]);

        setPlaceName("");
        setLargeText("");
        setSubtitle("");

    };

    const StickerComponent = stickerDesigns[design];

    return (
        <div className="sticker-creator wrap">
            <div className="sticker-creator-layout">
                {/* LEFT SIDE OF DISPLAY */}
                <div className="sticker-controls">
                    <section className="sticker-designs">
                        <h3>Choose a Design</h3>

                        <div className="design-options">

                            <button
                                type="button"
                                className={design === "oval" ? "design-option selected" : "design-option"}
                                onClick={() => setDesign("oval")}
                            >
                                <OvalSticker
                                    centerText="ZION"
                                    title="Zion National Park"
                                    subtitle="Utah"
                                />
                            </button>

                            <button
                                type="button"
                                className={design === "mountain" ? "design-option selected" : "design-option"}
                                onClick={() => setDesign("mountain")}
                            >
                                <MountainSticker
                                    centerText="ZION"
                                    title="Zion National Park"
                                    subtitle="Utah"
                                />
                            </button>
                            <button
                                type="button"
                                className={design === "beach" ? "design-option selected" : "design-option"}
                                onClick={() => setDesign("beach")}
                            >
                                <BeachSticker
                                    centerText="BEACH"
                                    title="Navarre Beach"
                                    subtitle="Florida"
                                />
                            </button>

                        </div>
                    </section>

                    <section className="sticker-details">

                        <label>
                            Place Name
                            <input
                                type="text"
                                value={placeName}
                                onChange={(e) => setPlaceName(e.target.value)}
                            />
                        </label>

                        <label>
                            Large Text
                            <input
                                type="text"
                                value={largeText}
                                onChange={(e) => setLargeText(e.target.value)}
                            />
                        </label>
                        <label>
                            State/subtitle
                            <input
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                            />
                        </label>
                    </section>
                </div>

                {/* RIGHT SIDE OF DISPLAY */}
                <section className="sticker-preview">
                    <h3>Preview</h3>
                    <StickerComponent
                        centerText={largeText}
                        title={placeName}
                        subtitle={subtitle}
                    />
                    <Button
                        className="orange-button"
                        onClick={handleAddSticker}
                        label="Add Sticker" />
                </section>

            </div>
        </div>
    );
}
