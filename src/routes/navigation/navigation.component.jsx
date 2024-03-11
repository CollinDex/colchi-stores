import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink  } from "./navigation.styles";


const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen); //Stores true or false for if the cart is open.

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
  