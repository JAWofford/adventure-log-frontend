import './StickerDisplay.css';
import StickerCreator from "./StickerCreator";
import { useState } from "react";
import stickerDesigns from "./stickerDesigns";

export default function StickerDisplay() {

    const [stickers, setStickers] = useState([]);

    //FUTURE: Create one reusable sticker component.
    //use a lookup table instead of this long

    return (
        <div className="sticker-display wrap">
            {stickers.map(sticker => {
                const StickerComponent = stickerDesigns[sticker.design];

                return (
                    <StickerComponent
                        key={sticker.id}
                        centerText={sticker.largeText}
                        title={sticker.placeName}
                        subtitle={sticker.subtitle}
                    />
                );
            })}


            <div className="route-divider"><span className="pin"></span> Create a New Sticker <span className="pin"></span></div>
            <div className="">
                <StickerCreator setStickers={setStickers} />
            </div>

        </div>

    )
}
