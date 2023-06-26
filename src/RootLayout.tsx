import { useSelector } from "react-redux";
import { getTokenSelector } from "./utils/slices/tokenSlice";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const RootLayout = () => {
  const token = useSelector(getTokenSelector);
  return (
    <div className="root_layout">
      {token ? <Navbar token={token} /> : null}
      <Outlet />
      {token ? <Footer /> : null}
    </div>
  );
};

export default RootLayout;
