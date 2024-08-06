export default function OutlineButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 border-gray-800 border rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-800  hover:text-white focus:outline-none focus:ring-2 hover:border- focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
