import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import UserProgessContext from "../store/UserProgessContext";

export default function Header() {

    const { cartItems } = useContext(CartContext);
    const { showCart } = useContext(UserProgessContext);

    const totalCartItems = cartItems.reduce((total, item) => {
        return total + item.qty;
    }, 0)

    console.log(totalCartItems)
    console.log(cartItems)

    return (
        <>
            <div id="main-header">
                <span>

                    <h1 id="title">
                        <img src="./logo.jpg" alt="Logo" />
                        REACTFOOD
                    </h1>
                </span>

                <button
                    className="text-button"
                    onClick={showCart}
                >
                    Cart ({totalCartItems})</button>
            </div>

        </>
    )
}