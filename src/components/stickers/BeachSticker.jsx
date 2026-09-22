import "./BeachSticker.css";
import beachImage from "../../assets/Beach.png";

function BeachSticker({ centerText, title, subtitle }) {
    return (
        <div className="beach-sticker">

            <img
                src={beachImage}
                alt="A souvenir sticker with a beach, palm trees and sunset over the ocean."
                className="beach-sticker-image"
            />

            {/* Curved title */}
            <svg
                className="beach-title-svg"
                viewBox="0 0 559 447"
                aria-hidden="true"
            >
                <path
                    id="beach-title-path"
                   d="M 130 105 Q 280 30 430 105"
                    fill="none"
                />

                <text
                    className="beach-title"
                    textAnchor="middle"
                >
                    <textPath
                        href="#beach-title-path"
                        startOffset="50%"
                    >
                        {title}
                    </textPath>
                </text>
            </svg>

            {/* Large center text */}
            <div className="beach-center-text">
                {centerText}
            </div>

            {/* Subtitle */}
            <div className="beach-subtitle">
                {subtitle}
            </div>

        </div>
    );
}

export default BeachSticker;