import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initialRoutes } from "./routes";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateToken } from "./utils/slices/tokenSlice";

const router = createBrowserRouter(initialRoutes);

function App() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  if (token) {
    dispatch(updateToken(token));
  }
  return <RouterProvider router={router} />;
}

export default App;
