import { NumericFormat } from "react-number-format";

export default function PriceText({ value, className = "" }) {
    return (
        <div className={className}>
            <NumericFormat
                value={value}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator={","}
                fixedDecimalScale={true}
                decimalScale={2}
            />
            <span> TL</span>
        </div>
    );
}
