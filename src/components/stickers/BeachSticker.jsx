import mountainImage from "../../assets/Mountain.png";
import './MountainSticker.css';

export default function BeachSticker({ centerText, title, subtitle }) {
    return (
           <div className="mountain-sticker">
            <img
                src={mountainImage}
                alt="A sticker image of a mountain with a sunrise between the peaks."
                className="mountain-sticker-image"
            />

            <div className="mountain-center-text">
                {centerText}
            </div>

            <div className="mountain-title">
                {title}
            </div>

            <div className="mountain-subtitle">
                {subtitle}
            </div>
        </div>
    );
}
