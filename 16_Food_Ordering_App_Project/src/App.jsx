import FoodList from "./components/FoodList";
import Header from "./components/Header";
import "./index.css"
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";

function App() {

  return (
    <>
      <Header />
      <FoodList />
      <Cart />
      <CheckOut />
    </>
  );
}

export default App;