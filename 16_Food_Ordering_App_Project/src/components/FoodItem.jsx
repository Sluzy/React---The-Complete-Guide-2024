import { currencyFormatter } from "../util/formattering"
import { CartContext } from "../store/CartContext";
import { useContext } from "react";

export default function FoodItem({ name, price, description, image, meal }) {

    const { handleAddItem } = useContext(CartContext)

    return (
        <>
            <li className="meal-item">
                <article>
                    <img src={`http://localhost:3000/${image}`} alt={name} />
                    <div>
                        <h3>{name}</h3>
                        <p className="meal-item-price">{currencyFormatter.format(price)}</p>
                        <p className="meal-item-description">{description}</p>
                    </div>
                    <p className="meal-item-actions">
                        <button className="button" onClick={() => handleAddItem(meal)}>Add to Cart</button>
                    </p>
                </article>
            </li>
        </>
    )
}