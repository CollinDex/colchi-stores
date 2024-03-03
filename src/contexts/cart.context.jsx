import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // Find if cartItems contains productToAdd
    const existingCartItem = cartItems.find( 
        (cartItem) => cartItem.id === productToAdd.id
    );

    //If found, increment quantity
    if (existingCartItem){
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1} 
                : cartItem
        );
    }  

    //return new array with modified cartItems and the new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) =>{
    //Check if cartItems contains product to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    //Check if quantity is equal to 1, if it is then remove the item
    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }
    
    //Return a new array with modified cartItems
    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
}

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
};

export const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    console.log('Dispatched Cart Reducer');
    console.log(action);
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({children}) => {
    //Using useState
    //const [isCartOpen, setIsCartOpen] = useState(false);
    //const [cartItems, setCartItems] = useState([]);
    //const [cartCount, setCartCount] = useState(0);
    //const [cartTotal, setCartTotal] = useState(0);

    //Using Reducer
    const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)
    

    const updateCartItemsReducer = (newCartItems) => {
        //Updates the total count of items in the cart to display on the cart icon
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        //Updates the total price of the items in the cart to display on the total
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        );
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
        }});
    };

    const setIsCartOpen = (isCartOpen) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen});
    };

    const addItemToCart = (productToAdd) => {
        updateCartItemsReducer(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems,cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        updateCartItemsReducer(clearCartItem(cartItems,cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};