import LoginPage from "./pages/auth_pages/login/LoginPage";
import SignupPage from "./pages/auth_pages/signup/SignupPage";
import HomePageSelector from "./components/home_page_selector/HomePageSelector";
import constants from "./utils/constants";
import RootLayout from "./RootLayout";
import AboutPage from "./pages/about/AboutPage";
import ShopPage from "./pages/shop/ShopPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CartPage from "./pages/cart/CartPage";
import WishlistPage from "./pages/wishlist/WishlistPage";

export const initialRoutes = [
  // {
  //   path: constants.kHomePage,
  //   element: <HomePageSelector />,
  // },
  {
    path: constants.kHomePage,
    element: <RootLayout />,
    children: [
      { path: constants.kHomePage, element: <HomePageSelector /> },
      { path: constants.kAboutPage, element: <AboutPage /> },
      { path: constants.kShopPage, element: <ShopPage /> },
      { path: constants.kProfilePage, element: <ProfilePage /> },
      { path: constants.kCartPage, element: <CartPage /> },
      { path: constants.kWishlistPage, element: <WishlistPage /> },
    ],
  },
  { path: constants.kLoginPage, element: <LoginPage /> },
  { path: constants.kSignupPage, element: <SignupPage /> },
];

export const appRoutes = [];
