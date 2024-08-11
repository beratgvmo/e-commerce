import { NumericFormat } from "react-number-format";

export default function PriceText({ value }) {
    return (
        <div>
            <NumericFormat
                value={value}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator={","}
                fixedDecimalScale={true}
                decimalScale={2}
            />
            <span className="ml-1">TL</span>
        </div>
    );
}
