import { createContext, useState } from "react";

const UserProgessContext = createContext({
    progess: "",
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
});

export function UserProgessContextProvider({ children }) {

    const [userProgess, setUserProgess] = useState("");

    function showCart() {
        setUserProgess("cart");
    }

    function hideCart() {
        setUserProgess("");
    }

    function showCheckout() {
        setUserProgess("checkout")
    }

    function hideCheckout() {
        setUserProgess("");
    }

    const UserProgessValue = {
        progess: userProgess,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgessContext.Provider value={UserProgessValue}>
            {children}
        </UserProgessContext.Provider>
    )
}

export default UserProgessContext;