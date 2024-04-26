import { uiActions } from "./ui";
import { cartActions } from "./cart";

export const fetchCartData = () => {
    return async dispatch => {

        const fetchData = async () => {

            const response = await fetch(
                "https://react-redux-dummy-backend-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
            );

            if (!response.ok) {
                throw new Error("Could not fetch cart data");
            }

            const data = await response.json()
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData || []))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error",
                message: "Fetching cart data failed"
            }))
        }
    }
}

let timer = null;

export const sendCartDataSlice = (cart) => {

    return async (dispatch) => {


        if (timer) {
            clearTimeout(timer);
            timer = null
        }

        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending",
            message: "sending data"
        })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://react-redux-dummy-backend-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                });

            if (!response.ok) {
                throw new Error("Sending data failed");
            }
        };

        try {
            await sendRequest();

            timer = setTimeout(() => {
                dispatch(uiActions.hideNotification())
                timer = null;
            }, 3000);


            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success",
                message: "data sent successfully"
            }))

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error",
                message: "sending data failed"
            }))

        }
    }
}