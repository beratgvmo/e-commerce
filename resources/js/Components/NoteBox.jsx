import React from "react";

export default function NoteBox({ icon: Icon, children, color }) {
    const bgColorClass = {
        yellow: "bg-yellow-800/15 text-yellow-600",
        blue: "bg-blue-800/15 text-blue-600",
        green: "bg-green-800/15 text-green-600",
        orange: "bg-orange-800/15 text-orange-600",
        red: "bg-red-800/15 text-red-600",
        teal: "bg-teal-800/15 text-teal-600",
        emerald: "bg-emerald-800/15 text-emerald-600",
    };

    return (
        <div className="flex items-center">
            <div
                className={`w-10 h-10 text-2xl mr-4 rounded-lg flex justify-center items-center ${bgColorClass[color]}`}
            >
                <Icon size={26} />
            </div>
            <span className={`${bgColorClass[color].split(" ")[1]}`}>
                {children}
            </span>
        </div>
    );
}
