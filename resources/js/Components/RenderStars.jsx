import { FaStar } from "react-icons/fa";

export default function RenderStars({ count, size = "medium" }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar
                key={i}
                className={`${
                    i <= count ? "text-yellow-400" : "text-gray-300"
                } ${size === "medium" && "text-base"}
                ${size === "large" && "text-xl"}
                ${size === "very large" && "text-3xl mr-1"}
                    `}
            />
        );
    }
    return <div className="flex justify-center">{stars}</div>;
}
