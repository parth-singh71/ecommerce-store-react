import "./styles.scss";
import { useSelector } from "react-redux";
import { HomePage } from "../../pages/home/HomePage";
import StartPage from "../../pages/start/StartPage";
import { getTokenSelector } from "../../utils/slices/tokenSlice";

const HomePageSelector = () => {
  const token = useSelector(getTokenSelector);
  return <div>{token ? <HomePage token={token} /> : <StartPage />}</div>;
};

export default HomePageSelector;
