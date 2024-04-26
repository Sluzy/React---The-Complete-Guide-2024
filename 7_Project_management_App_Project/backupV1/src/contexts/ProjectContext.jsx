import { createContext, } from "react"

export const ProjectContext = createContext({

});


export default function ProjectContextProvider({ children }) {


    // States

    // Handler Functions


    const contextValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return <ProjectContext.Provider value={contextValue}>
        {children}
    </ProjectContext.Provider>

}