import { NumericFormat } from "react-number-format";

export default function PriceInput({ className = "", ...props }) {
    return (
        <NumericFormat
            {...props}
            maxLength={11}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
        />
    );
}
