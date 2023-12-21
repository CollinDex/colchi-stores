import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    //Get the CategoryMap and build out the shop page
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap =  await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value = {value} > {children} </CategoriesContext.Provider>
    )
}

//Add data to the database
    /* useEffect(() => {
        addCollectionAndDocuments('categories',SHOP_DATA,'title');
    },[]) */