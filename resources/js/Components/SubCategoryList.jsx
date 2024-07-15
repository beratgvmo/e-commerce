import React from "react";

const SubCategoryList = ({ categories, parentId, color = true }) => {
    const subCategories = categories.filter(
        (category) => category.parent_id === parentId
    );

    if (subCategories.length === 0) {
        return null;
    }

    return (
        <>
            {subCategories.map((category) => (
                <div key={category.id}>
                    <p
                        className={`cursor-pointer inline-block hover:underline 
                            ${
                                color
                                    ? "font-semibold text-blue-500 mb-[10px] text-[15px]"
                                    : "font-medium text-black mb-[8px] text-sm "
                            }`}
                    >
                        {category.name}
                    </p>
                    <SubCategoryList
                        categories={categories}
                        parentId={category.id}
                        color={false}
                    />
                </div>
            ))}
        </>
    );
};

export default SubCategoryList;
