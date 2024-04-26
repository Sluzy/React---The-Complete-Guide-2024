import { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formattering";
import UserProgessContext from "../store/UserProgessContext";
import Input from "../UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

export default function CheckOut() {

    const { cartItems, clearCart } = useContext(CartContext);
    const { progess, hideCheckout } = useContext(UserProgessContext)

    const { data, isLoading: isSending, error, sendRequest, clearData } =
        useHttp("http://localhost:3000/orders", requestConfig,);

    const cartTotal = cartItems.reduce((total, item) => total + item.qty * item.price,
        0);

    function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartItems,
                    customer: customerData,
                },
            })
        );
    }

    function handleFinish() {
        hideCheckout();
        clearCart();
        clearData();

    }

    let actions = (
        <>
            <button type="button" className="text-button" onClick={hideCheckout}>Close</button>
            <button className="button">Submit Order</button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order</span>
    }

    if (data && !error) {
        return (
            <Modal open={progess === "checkout"} onClose={handleFinish}>
                <h2>Succes</h2>
                <p>Your order was submitted successfully</p>
                <p>We will get back to you with more details via email
                    within the next few minutes

                </p>
                <p className="modal-actions">
                    <button className="button" onClick={handleFinish}>Okay</button>
                </p>
            </Modal>
        )
    }

    return <Modal open={progess === "checkout"} onClose={hideCheckout}>
        <form onSubmit={handleSubmit}>

            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input
                label="Full Name"
                type="text"
                id="name"
            />
            <Input
                label="Email Adress"
                type="email"
                id="email"
            />
            <Input
                label="Street"
                type="text"
                id="street"
            />

            <div className="control-row">
                <Input
                    label="Postal Code"
                    type="Text"
                    id="postal-code"
                />
                <Input
                    label="City"
                    type="text"
                    id="city"
                />
            </div>

            {error && <Error title="Failed to submit order" message={error} />}

            <p className="modal-actions">{actions}</p>
        </form>
    </Modal>

}