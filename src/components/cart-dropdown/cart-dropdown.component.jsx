import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCartItems } from '../../store/cart/cart.selector'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import { 
    CartDropdownContainer,
    EmptyMessage,
    CartItems 
} from './cart-dropdown.styles'

const CartDropdown = () => {
    const cartItems  = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer >
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map(item => 
                    <CartItem key={item.id} cartItem={item}/>
                    ) : (
                        <EmptyMessage>Your Cart is Empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button style={{fontSize: '13px'}} onClick={goToCheckout}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;