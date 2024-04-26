import classes from './CartItem.module.css';
import { useDispatch } from "react-redux"
import { cartActions } from '../../store/cart';

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const totalPrice = item.price * item.qty;
  const pricePrItem = totalPrice / item.qty;

  const handleIncrementCart = () => {
    dispatch(cartActions.incrementCart(item.id))
  }

  const handleDecrementCart = () => {
    dispatch(cartActions.decrementCart(item.id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{item.name}</h3>
        <div className={classes.price}>
          ${isFinite(totalPrice) ? totalPrice.toFixed(2) : 'N/A'}
          <span className={classes.itemprice}>
            ${isFinite(pricePrItem) ? pricePrItem.toFixed(2) : 'N/A'}{' / item'}
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{item.qty}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecrementCart}>-</button>
          <button onClick={handleIncrementCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;