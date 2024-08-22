export default function RadioButton({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="radio"
            className={
                "rounded-full cursor-pointer border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                className
            }
        />
    );
}
