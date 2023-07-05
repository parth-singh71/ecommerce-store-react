import { useSelector } from "react-redux";
import { getTokenSelector } from "./utils/slices/userSlice";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Breadcrum from "./components/breadcrum/Breadcrum";
import Fab from "./components/fab/Fab";

const RootLayout = () => {
  const token = useSelector(getTokenSelector);
  const location = useLocation();
  return (
    <div className="root_layout">
      {token ? <Navbar token={token} /> : null}
      <Breadcrum currentRoute={location.pathname} />
      <Outlet />
      {/* {token ? <Fab currentRoute={location.pathname} /> : null} */}
      {token ? <Footer /> : null}
    </div>
  );
};

export default RootLayout;
