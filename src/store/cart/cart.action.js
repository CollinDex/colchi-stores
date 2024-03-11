import { CART_ACTION_TYPES } from "./cart.types";

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
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id
);

export const setIsCartOpen = (boolean) => ({
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: boolean
});

export const setCartItems = (cartItem) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: cartItem
});

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    };
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems,cartItemToRemove);
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    };
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems,cartItemToClear);
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems
    };
};
