import React, { useState, useEffect, useCallback } from "react";
import Checkbox from "./Checkbox";
import TextInput from "./TextInput";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useForm, router, Link } from "@inertiajs/react";

const StoreFilterTab = ({ attributesMain, categorySubMain, categorySlug }) => {
    const [isCategoryVisible, setIsCategoryVisible] = useState(true);
    const [visibleAttributes, setVisibleAttributes] = useState(
        attributesMain.map(() => true)
    );
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [searchQueries, setSearchQueries] = useState(
        attributesMain.map(() => "")
    );

    const toggleCategoryVisibility = () =>
        setIsCategoryVisible(!isCategoryVisible);

    const toggleAttributeVisibility = (index) => {
        setVisibleAttributes((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleAttributeChange = (
        attributeId,
        isChecked,
        attributeType,
        name
    ) => {
        setSelectedAttributes((prevState) => {
            const newState = { ...prevState };
            if (isChecked) {
                if (!newState[attributeType]) {
                    newState[attributeType] = [];
                }
                newState[attributeType].push(attributeId);
            } else {
                newState[attributeType] = newState[attributeType].filter(
                    (id) => id !== attributeId
                );
                if (newState[attributeType].length === 0) {
                    delete newState[attributeType];
                }
            }
            return newState;
        });
    };

    const handleSearchChange = (index, value) => {
        setSearchQueries((prevState) => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };

    const filteredAttributes = (attributes, query) => {
        if (!query) return attributes;
        return attributes.filter((attribute) =>
            attribute.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const fetchProducts = useCallback(
        (categoryId = null) => {
            const formattedAttributes =
                Object.values(selectedAttributes).flat();
            router.visit(route("home.magaza", { slug: categorySlug }), {
                method: "get",
                data: { attributes: formattedAttributes, category: categoryId },
                preserveState: true,
                only: ["products"],
            });
        },
        [selectedAttributes, categorySlug]
    );

    useEffect(() => {
        const timeoutId = setTimeout(fetchProducts, 100);
        return () => clearTimeout(timeoutId);
    }, [fetchProducts]);

    console.log(attributesMain);

    return (
        <div className="w-52 sticky top-[20px] px-3 py-2 border border-gray-200 rounded">
            {categorySubMain.length > 0 && (
                <div className="py-1 border-b">
                    <div
                        className="flex justify-between items-center cursor-pointer transition select-none hover:bg-gray-100 px-1.5 py-0.5 rounded-full"
                        onClick={toggleCategoryVisibility}
                    >
                        <p className="mr-2">İlgili Kategoriler</p>
                        {isCategoryVisible ? (
                            <IoIosArrowUp />
                        ) : (
                            <IoIosArrowDown />
                        )}
                    </div>
                    <div className="mb-2">
                        {isCategoryVisible &&
                            categorySubMain.map((category) => (
                                <div className="" key={category.id}>
                                    <button
                                        className="text-sm my-1 ml-2 text-gray-800 hover:text-gray-400"
                                        onClick={() =>
                                            fetchProducts(category.id)
                                        }
                                    >
                                        {category.name}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            {attributesMain.map((attributeType, index) => (
                <div key={index} className="border-b mb-2">
                    <div className="py-1">
                        <div
                            className="flex items-center justify-between mb-3 cursor-pointer transition select-none hover:bg-gray-100 px-1.5 py-0.5 rounded-full"
                            onClick={() => toggleAttributeVisibility(index)}
                        >
                            <p>{attributeType.name}</p>
                            {visibleAttributes[index] ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            )}
                        </div>
                        {visibleAttributes[index] && (
                            <>
                                <TextInput
                                    id={`search-${index}`}
                                    name={`search-${index}`}
                                    className="block w-full h-6 px-2 py-3 text-xs"
                                    placeholder={`${attributeType.name} ara`}
                                    value={searchQueries[index]}
                                    onChange={(e) =>
                                        handleSearchChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                                <div className="py-1">
                                    {filteredAttributes(
                                        attributeType.attributes,
                                        searchQueries[index]
                                    ).map((attribute) => (
                                        <div
                                            key={attribute.id}
                                            className="text-sm py-1"
                                        >
                                            <Checkbox
                                                className="mr-2"
                                                onChange={(e) =>
                                                    handleAttributeChange(
                                                        attribute.id,
                                                        e.target.checked,
                                                        attributeType.name,
                                                        attribute.name
                                                    )
                                                }
                                            />
                                            {attribute.name}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoreFilterTab;
