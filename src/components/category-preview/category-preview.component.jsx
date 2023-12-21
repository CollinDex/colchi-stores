import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss'

const CategoryPreview = ({title, products}) => {
    return (
        <div className='category-preview-container'>
            <h2>
            <Link to= {`/shop/${title}`}>
                <span className='title'>{title.toUpperCase()}</span>
            </Link> 
                
            </h2>
            <div className='preview'>
                {   //Filter out first four items of each product category then render it using the ProductCard component
                    products
                        .filter((_,idx) => idx < 4 )
                        .map((product) => (
                            <ProductCard key={product.id} product={product}/>          
                        ))
                }
            </div>
        </div>
    )
}

export default CategoryPreview;