import { useContext } from "react"
import { CartContext } from "../store/CartContext"
import UserProgessContext from "../store/UserProgessContext"
import Modal from "../UI/Modal"
import { currencyFormatter } from "../util/formattering"
import CartItem from "./CartItem"

export default function Cart() {

    const { cartItems, handleAddItem, handleRemoveItem } = useContext(CartContext)
    const { progess, hideCart, showCheckout } = useContext(UserProgessContext)

    const cartTotal = cartItems.reduce((total, item) => total + item.qty * item.price,
        0);

    return (
        <Modal className="cart" open={progess === "cart"} onClose={progess === "cart" ? hideCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item =>
                    <CartItem
                        key={item.id}
                        name={item.name}
                        qty={item.qty}
                        price={item.price}
                        item={item}
                        handleAddItem={() => handleAddItem(item)}
                        handleRemoveItem={() => handleRemoveItem(item.id)}
                    />
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <button className="text-button" onClick={() => hideCart()}>Close</button>
                {cartItems.length > 0 && < button className="button" onClick={() => showCheckout()}>Go to Checkout</button>}
            </p>
        </Modal >
    )
}



// 15