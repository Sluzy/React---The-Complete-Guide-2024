import { currencyFormatter } from "../util/formattering";

export default function CartItem({ name, qty, price, handleAddItem, handleRemoveItem }) {

    return (
        <li className="cart-item">
            <p>
                {name} - {qty} x {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={handleRemoveItem}>-</button>
                <span>QTY</span>
                <button onClick={handleAddItem}>+</button>
            </p>
        </li>
    )
}