import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initialRoutes } from "./routes";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { updateUserIdAndToken } from "./utils/slices/userSlice";

const router = createBrowserRouter(initialRoutes);

function App() {
  const dispatch = useDispatch();
  const authData = Cookies.get("authdata");
  if (authData) {
    const { token, userId } = JSON.parse(authData);
    dispatch(updateUserIdAndToken({ token, userId }));
  }
  return <RouterProvider router={router} />;
}

export default App;
