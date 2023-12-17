import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => { //Updates the total count of items in the cart to display on the cart icon
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems]);
    
    useEffect(() => { //Updates the total price of the items in the cart to display on the total
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
             0
        );
        setCartTotal(newCartTotal);
    },[cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems,cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};