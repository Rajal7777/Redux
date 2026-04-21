import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from './components/UI/Notification';

import { uiActions } from "./store/ui-slice";

//stop adding the empty data to the database in 1st render with flag
let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "sending cart data",
        }),
      );

      const response = await fetch(
        "https://practise-f5bd6-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      // pop up alert case:sucess after we pass the !ok check
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sucess!",
          message: "send cart data successfully!",
        }),
      );
    };
   

    //we got the 'true' value so the code return and stop executing the code below
    //No empty data added at inital render coz useEffect runs once after component render
    if(isInitial){
      isInitial = false;
      return;
    }

    //aync function so can access method catch
    sendCartData().catch((error) => {
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!",
      });
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;