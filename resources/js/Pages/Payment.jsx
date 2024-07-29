import React, { useState } from "react";
import InputMask from "react-input-mask";

export default function Payment() {
    const [backface, setBackface] = useState(false);
    const [card, setCard] = useState({
        number: "",
        name: "",
        expire: "",
        cvv: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCard((prevCard) => ({ ...prevCard, [name]: value }));
    };

    const addCard = () => {
        console.log(card);
    };

    return (
        <div className="flex w-full">
            <div className="w-96">
                <div className="w-full">
                    <InputMask
                        mask="9999 9999 9999 9999"
                        value={card.number}
                        onChange={handleInputChange}
                        placeholder="Kart Numarası"
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                name="number"
                                className="mt-4 w-full px-2 py-1 border rounded"
                            />
                        )}
                    </InputMask>
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        name="name"
                        value={card.name}
                        onChange={handleInputChange}
                        placeholder="Kart Sahibi"
                        className="mt-4 w-full px-2 py-1 border rounded"
                    />
                </div>
                <div className="w-full flex gap-4">
                    <InputMask
                        mask="99/99"
                        value={card.expire}
                        onChange={handleInputChange}
                        placeholder="Son Kullanma Tarihi"
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                name="expire"
                                className="mt-4 w-full px-2 py-1 border rounded"
                            />
                        )}
                    </InputMask>
                    <InputMask
                        mask="999"
                        value={card.cvv}
                        onChange={handleInputChange}
                        onFocus={() => setBackface(true)}
                        onBlur={() => setBackface(false)}
                        placeholder="CVV"
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                name="cvv"
                                className="mt-4 w-full px-2 py-1 border rounded"
                            />
                        )}
                    </InputMask>
                </div>
            </div>
            <div className={`card ${backface ? "flip" : ""}`}>
                <div className={`front`}>
                    <div className="card-number">
                        {card.number || "0000 0000 0000 0000"}
                    </div>
                    <div className="card-bottom">
                        <div>
                            <div className="value">
                                {card.name || "Kart sahibi"}
                            </div>
                        </div>
                        <div>
                            <div className="value">
                                {card.expire || "AA/YY"}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`back ${
                        backface ? "" : "transform rotate-y-180"
                    }`}
                >
                    <div className="card-back">
                        CVV <em>{card.cvv || "000"}</em>
                    </div>
                </div>
            </div>
        </div>
    );
}
