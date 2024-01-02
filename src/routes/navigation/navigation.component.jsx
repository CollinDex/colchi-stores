import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink  } from "./navigation.styles";


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    //console.log(currentUser);

    const {isCartOpen} = useContext(CartContext); //Stores true or false for if the cart is open.

    const signOutHandler = async () => {
        await signOutUser();  
    }

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to= '/'>
                <CrwnLogo className="logo"/>
            </LogoContainer>            
            <NavLinksContainer >
                <NavLink to= '/shop'>
                    SHOP
                </NavLink>
                {currentUser ? (
                    <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ):(
                    <NavLink className="nav-link" to= '/auth'>
                        SIGN IN
                    </NavLink>
                )}
                <CartIcon/>
            </NavLinksContainer>
            {isCartOpen && <CartDropdown/> } {/* DISPLAY DROPDOWN ON CHECKOUT ICON TOOGGLE */}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;
  