import './StickerDisplay.css';
import StickerCreator from "./StickerCreator";
import { useState, useEffect } from "react";
import stickerDesigns from "./stickerDesigns";
import { useAuth } from "../../context/AuthContext";

export default function StickerDisplay() {

    const { user, loading } = useAuth();
    
const storageKey = 'adLogStickers';

//get sticker array from local storage if it exists
    const [stickers, setStickers] = useState(() => {
        const savedItems = localStorage.getItem(storageKey);
        return savedItems ? JSON.parse(savedItems) : []
    });


    //write to local storage when sticker changes.
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(stickers));
    }, [stickers]);

    if (loading) return (
    <div className="app-status">
      <p>Loading…</p>
    </div>
  )

    //FUTURE: Create one reusable sticker component.
    return (
        <div className="sticker-display wrap">
            <div className="page-head">
                <h1>Sticker Collection </h1>
                <p>Every place you've stuck a pin {user.displayName}.
                    The back-window decal, gone digital. </p>
            </div>
            <div className="sticker-collection">
                {stickers.map(sticker => {
                    const StickerComponent = stickerDesigns[sticker.design];

                    return (
                        <div className="collection-sticker" key={sticker.id}>
                            <StickerComponent
                                centerText={sticker.largeText}
                                title={sticker.placeName}
                                subtitle={sticker.subtitle}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="route-divider"><span className="pin"></span> Create a New Sticker <span className="pin"></span></div>
            <div className="">
                <StickerCreator setStickers={setStickers} />
            </div>

        </div>

    )
}
