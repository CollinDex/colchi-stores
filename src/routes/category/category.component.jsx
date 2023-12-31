import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import { Title, ProductContainer } from './category.styles';


const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category}</Title>
            <ProductContainer>
                {products &&
                    products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </ProductContainer>
        </Fragment>
    );
}

export default Category;