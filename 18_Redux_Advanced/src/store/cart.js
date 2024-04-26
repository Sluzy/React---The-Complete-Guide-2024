import { createSlice } from "@reduxjs/toolkit"

const initialCartState = {
    cart: [
        {
            id: 1,
            name: "Luksus Mælk",
            price: 42,
            qty: 1
        }
    ],
    changed: false,
    products: [
        {
            id: 1,
            name: "Luksus Mælk",
            price: 42,
            description: "Fucking luksus mælk",
        },
        {
            id: 2,
            name: "Fisk",
            price: 13,
            description: "Solid fisk",
        }
    ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {

        addToCart(state, action) {
            state.changed = true;
            const { id } = action.payload;
            const currentIndex = state.cart.findIndex(cartItem => cartItem.id === id)

            // If already in cart, add 1 to qty
            if (currentIndex !== -1) {
                state.cart[currentIndex].qty++

                // If not in cart, add new entry
            } else {
                const currentProduct = state.products.find(product => product.id === id)
                if (currentProduct) {
                    state.cart.push({
                        ...currentProduct,
                        qty: 1
                    });
                }
            }
            // state.isToggled = true
        },

        replaceCart(state, action) {
            state.cart = action.payload
        },

        incrementCart(state, action) {
            state.changed = true;
            const id = action.payload;
            const currentIndex = state.cart.findIndex(item => item.id === id);
            if (currentIndex !== -1) {
                state.cart[currentIndex].qty++;
            }
        },

        decrementCart(state, action) {
            state.changed = true;
            const id = action.payload;
            const currentIndex = state.cart.findIndex(item => item.id === id);
            if (currentIndex !== -1) {
                state.cart[currentIndex].qty--;

                if (state.cart[currentIndex].qty <= 0) {
                    state.cart = state.cart.filter(item => item.id !== id);
                }
            }
        },
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;