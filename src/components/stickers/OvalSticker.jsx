
import './OvalSticker.css';

export default function OvalSticker({ title, centerText, subtitle }) {
    return (
        <svg
            viewBox="0 0 400 280"
            className="oval-sticker"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/*White Oval*/}
            <ellipse
                cx="200"
                cy="140"
                rx="190"
                ry="125"
                fill="white"
            />
            {/* Black Oval border */}
            <ellipse
                cx="200"
                cy="140"
                rx="175"
                ry="110"
                fill="none"
                stroke="black"
                strokeWidth="8"
            />
            {/*Creating a path for the text to be curved*/}
            <defs>
                <path
                    id="topTextPath"
                    d="M 55 125 A 145 95 0 0 1 345 125"
                    transform="translate(0 20)"
                    fill="none"
                />
            </defs>
            {/* curved title on the top */}
            <text
                fontFamily="Arial, sans-serif"
                fontSize="18"
                fontWeight="700"
                fill="black"
                textAnchor="middle"
            >
                {/* use the text path and start in the middle. */}
                <textPath
                    href="#topTextPath"
                    startOffset="50%"
                >
                    {title}
                </textPath>
            </text>
            {/* Big text in the center */}
            <text
                x="200"
                y="165"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="70"
                fontWeight="900"
                fill="black"
            >
                {centerText}
            </text>
            {/* Subtitle along bottom of sticker */}
            <text
                x="200"
                y="240"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="18"
                fontWeight="700"
                fill="black"
            >
                {subtitle}
            </text>
        </svg>
    )
}
