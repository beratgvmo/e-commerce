import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import SubCategoryList from "./SubCategoryList";

const CategoryList = ({ categories, setIsCategoryHovered }) => {
    const mainCategories = categories.filter(
        (category) => category.parent_id === null
    );

    const [openCategoryId, setOpenCategoryId] = useState(null);

    const handleMouseEnter = (categoryId) => {
        setOpenCategoryId(categoryId);
        setIsCategoryHovered(true);
    };

    const handleMouseLeave = () => {
        setOpenCategoryId(null);
        setIsCategoryHovered(false);
    };

    return (
        <div className="flex justify-between w-[1200px] relative">
            {mainCategories.map((category) => (
                <div className="group w-full" key={category.id}>
                    <div
                        className="w-full cursor-pointer group group-hover:bg-gray-100 relative"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p className="text-sm w-full text-center p-2 font-medium group-hover:text-blue-500 hover:text-blue-500">
                            {category.name}
                        </p>
                    </div>
                    <Transition
                        show={openCategoryId === category.id}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="z-50 absolute px-4 py-2 w-full left-0 rounded-b-md bg-gray-100 border border-gray-200 border-t-0"
                            onMouseEnter={() => handleMouseEnter(category.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="grid grid-rows-3 grid-flow-col gap-3">
                                <SubCategoryList
                                    categories={categories}
                                    parentId={category.id}
                                />
                            </div>
                        </div>
                    </Transition>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
