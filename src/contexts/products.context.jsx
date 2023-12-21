import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    //Get the CategoryMap and build out the shop page
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap =  await getCategoriesAndDocuments();
            console.log(categoryMap);
        }
        
        getCategoriesMap();
    }, []);

    const value = { products };
    return (
        <ProductsContext.Provider value = {value} > {children} </ProductsContext.Provider>
    )
}

//Add data to the database
    /* useEffect(() => {
        addCollectionAndDocuments('categories',SHOP_DATA,'title');
    },[]) */