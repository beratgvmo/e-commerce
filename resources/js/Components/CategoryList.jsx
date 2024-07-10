import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import SubCategoryList from "./SubCategoryList";

const CategoryList = ({ categories }) => {
    const mainCategories = categories.filter(
        (category) => category.parent_id === null
    );

    const [openCategoryId, setOpenCategoryId] = useState(null);

    const toggleCategory = (categoryId) => {
        setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
    };

    return (
        <div className="flex justify-between w-full">
            {mainCategories.map((category) => (
                <div className="group" key={category.id}>
                    <div
                        className="w-full group mt-4 group-hover:bg-gray-100 relative"
                        onMouseEnter={() => toggleCategory(category.id)}
                        onMouseLeave={() => toggleCategory(category.id)}
                    >
                        <p className="text-sm p-2 px-10 relative font-medium hover:text-blue-500">
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
                        <div className="absolute px-4 py-2 w-[79%] rounded-b-md bg-gray-100 border border-gray-200 border-t-0 left-[10.5%] right-[10.5%]">
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
