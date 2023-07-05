import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink } from "../navbar/Navbar";
import constants from "../../utils/constants";

const Breadcrum = ({ currentRoute }: { currentRoute: string }) => {
  const pathElements: string[] = currentRoute.split("/").slice(1, -1);
  const pathLen = pathElements.length;
  return (
    <Breadcrumbs
      sx={{ pt: 1, px: 2, pb: 2, display: pathLen == 0 ? "none" : "block" }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {pathLen == 0 ? (
        <BreadCrumCurrentLink title="Home" />
      ) : (
        <BreadCrumLink title="Home" to={constants.kHomePage} />
      )}
      {pathElements.map((pathElement: string, index: number) => {
        if (index == pathLen - 1) {
          return <BreadCrumCurrentLink key={pathElement} title={pathElement} />;
        } else {
          const subpe = pathElements.splice(0, index);
          return <BreadCrumLink title={pathElement} to={subpe.join("/")} />;
        }
      })}
    </Breadcrumbs>
  );
};

const BreadCrumLink = ({ title, to }: { title: string; to: string }) => {
  return (
    <NavLink
      sx={{ fontStyle: "italic" }}
      title={title[0].toUpperCase() + title.substring(1)}
      to={to}
      underline="hover"
      color="inherit"
    >
      Home
    </NavLink>
  );
};
const BreadCrumCurrentLink = ({ title }: { title: string }) => {
  return (
    <Typography color="text.primary" sx={{ fontStyle: "italic" }}>
      {title[0].toUpperCase() + title.substring(1)}
    </Typography>
  );
};

export default Breadcrum;
