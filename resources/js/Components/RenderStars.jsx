import { FaStar } from "react-icons/fa";

export default function RenderStars({ count, size = "medium" }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar
                key={i}
                className={`${
                    i <= count ? "text-yellow-500" : "text-gray-300"
                } ${size === "medium" ? "text-base" : "text-xl"}`}
            />
        );
    }
    return <div className="flex justify-center">{stars}</div>;
}
