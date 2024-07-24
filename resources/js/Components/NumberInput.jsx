import { NumericFormat } from "react-number-format";

export default function NumberInput({ className = "", ...props }) {
    return (
        <NumericFormat
            {...props}
            maxLength={7}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
        />
    );
}
