import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

//Memoisation using reselect so reducer doesnot run unless the payload is different
export const selectCategories = createSelector(
    [selectCategoryReducer],//Array of Input Selectors
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);