import { useSelector } from "react-redux"
import classes from './CartButton.module.css';

const CartButton = ({ onClick }) => {

  const cart = useSelector(state => state.cart.cart)
  const currentQty = cart.reduce((total, item) => total + item.qty, 0)

  return (
    <button className={classes.button} onClick={onClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{currentQty}</span>
    </button>
  );
};

export default CartButton;