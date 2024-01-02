import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview } from  './category-preview.styles'

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            
            <Link to= {`/shop/${title}`}>
                <Title>{title.toUpperCase()}</Title>
            </Link> 

            <Preview>
                {   //Filter out first four items of each product category then render it using the ProductCard component
                    products
                        .filter((_,idx) => idx < 4 )
                        .map((product) => (
                            <ProductCard key={product.id} product={product}/>          
                        ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;