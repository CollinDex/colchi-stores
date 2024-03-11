import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";


const Shop = () => {
    const dispatch = useDispatch();
    //Get the CategoryMap and set it to the reducer
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryArray =  await getCategoriesAndDocuments();
            dispatch(setCategories(categoryArray));
        };
    getCategoriesMap();
}, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>} />
        </Routes>
    );
}

export default Shop;

/* return (
    <Fragment key={title}>
        <h2>{title}</h2>
        <div className="products-container">
            {categoriesMap[title].map(( product ) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    </Fragment>
);
 */