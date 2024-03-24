import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { Title, ProductContainer } from './category.styles';


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category}</Title>
            {
                isLoading ? (
                    <Spinner/>
                ) : (
                    <ProductContainer>
                        {products &&
                            products.map((product) => <ProductCard key={product.id} product={product}/>)
                        }
                    </ProductContainer>
                )
            }
        </Fragment>
    );
}

export default Category;