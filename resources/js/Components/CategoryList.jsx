import React from "react";
import SubCategoryList from "./SubCategoryList";

const CategoryList = ({ categories }) => {
    const mainCategories = categories.filter(
        (category) => category.parent_id === null
    );

    return (
        <div className="flex justify-between w-full">
            {mainCategories.map((category) => (
                <div className="group">
                    <div
                        key={category.id}
                        className="w-full group mt-4 group-hover:bg-gray-100"
                    >
                        <p className="text-sm p-2 px-10 relative font-medium hover:text-blue-500">
                            {category.name}
                        </p>
                    </div>
                    <div className="absolute px-4 py-2 w-[78%] rounded-b-md bg-gray-100 border border-gray-200 border-t-0 left-[11%] right-[11%] hidden group-hover:block ">
                        <div className="grid  grid-rows-3 grid-flow-col gap-3">
                            <SubCategoryList
                                categories={categories}
                                parentId={category.id}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
