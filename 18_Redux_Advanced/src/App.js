import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification"
// import { uiActions } from './store/ui';
import { sendCartDataSlice, fetchCartData } from './store/cartActions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const changed = useSelector((state) => state.cart.changed)
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {

    // const sendCartData = async () => {
    //   dispatch(uiActions.showNotification({
    //     status: "pending",
    //     title: "Sending...",
    //     message: "Sending cart data"
    //   }))

    //   const response = await fetch(
    //     "https://react-redux-dummy-backend-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     });

    //   if (!response.ok) {
    //     throw new Error("Sending cart data failed");
    //   }

    //   dispatch(uiActions.showNotification({
    //     status: "success",
    //     title: "Success",
    //     message: "Sent cart data successfully"
    //   }))
    // }

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (changed) {
      dispatch(sendCartDataSlice(cart))
    };

    // sendCartData().catch(error => {
    //   dispatch(uiActions.showNotification({
    //     status: "error",
    //     title: "Error",
    //     message: "Sending cart data failed"
    //   }))
    // })

  }, [cart, dispatch, changed])


  return (
    <>

      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
