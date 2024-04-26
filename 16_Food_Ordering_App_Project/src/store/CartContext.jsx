import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
})

function cartReducer(state, action) {

    switch (action.type) {
        case "ADD_ITEM": {

            console.log(state);

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.item.id);

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1) {

                const existingItem = state.items[existingCartItemIndex];

                const updatedItem = {
                    ...existingItem,
                    qty: state.items[existingCartItemIndex].qty + 1
                }

                updatedItems[existingCartItemIndex] = updatedItem;

            } else {

                updatedItems.push({ ...action.payload.item, qty: 1 });
            }

            return { ...state, items: updatedItems };
        }

        case "REMOVE_ITEM": {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id);

            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItems = [...state.items];

            if (existingCartItem.qty === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    qty: existingCartItem.qty - 1
                }
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            return { ...state, items: updatedItems }
        }

        case "CLEAR_CART": {
            return { ...state, items: [] };
        }

        default:
            return state;
    }
}

export default function CartContextProvider({ children }) {

    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const { items } = state;

    function handleAddItem(item) {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                item
            }
        })
    }

    function handleRemoveItem(id) {
        dispatch({
            type: "REMOVE_ITEM",
            payload: {
                id,
            }
        })
    }

    function clearCart() {
        dispatch({
            type: "CLEAR_CART",
        })
    }


    const contextValue = {
        // state
        cartItems: items,

        // functions
        handleAddItem,
        handleRemoveItem,
        clearCart,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}