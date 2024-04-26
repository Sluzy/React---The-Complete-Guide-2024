import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home";
import Root from "./routes/Root"
import Products from "./routes/Products";
import ErrorPage from "./routes/ErrorPage";
import ProductDetails from "./routes/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products />, },
      { path: "/products/:productId", element: <ProductDetails /> }
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;