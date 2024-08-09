import React from "react";

export default function NoteBox({ icon: Icon, children, color }) {
    return (
        <div className="flex items-center">
            <div
                className={`w-10 h-10 text-2xl mr-4 bg-${color}-800/15 text-${color}-600 rounded-lg flex justify-center items-center`}
            >
                <Icon size={26} />
            </div>
            <span className={`text-${color}-600`}>{children}</span>
        </div>
    );
}
