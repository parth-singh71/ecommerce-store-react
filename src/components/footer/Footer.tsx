import constants from "../../utils/constants";
import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer_layout">
      <p>&copy; 2023 {constants.kAppName} All rights reserved.</p>
      <p>Designed & developed by {constants.kAppDeveloper}</p>
    </footer>
  );
};

export default Footer;
