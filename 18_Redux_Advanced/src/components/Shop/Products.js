import { useSelector, useDispatch } from 'react-redux'

import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { cartActions } from '../../store/cart';

const Products = (props) => {

  const dispatch = useDispatch();

  const products = useSelector(state => state.cart.products)

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
      }
    ));
  }
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((product) =>
          <ProductItem
            key={product.id}
            title={product.name}
            price={product.price}
            description={product.description}
            onClick={() => handleAddToCart(product)}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;