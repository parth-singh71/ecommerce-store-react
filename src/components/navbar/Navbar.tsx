import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { updateToken } from "../../utils/slices/tokenSlice";
import Cookies from "js-cookie";
import PiousApis from "../../utils/pious_store_apis";
import {
  IconButton,
  Link as Link,
  Menu,
  MenuItem,
  Popover,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import constants from "../../utils/constants";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { ElementType, PropsWithChildren, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Navbar = (props: { token: string }) => {
  const { token } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const shouldOpenPopover = Boolean(anchorEl);
  const id = shouldOpenPopover ? "simple-popover" : undefined;
  const closePopOver = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const onlySmallScreen = theme.breakpoints.down("sm");
  console.log("onlySmallScreen", onlySmallScreen);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}><MenuIcon /></IconButton> */}
        <NavLink to={constants.kHomePage} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Pious Store
          </Typography>
        </NavLink>
        <NavLink title="Home" to={constants.kHomePage} />
        <NavLink title="About" to={constants.kAboutPage} />
        <NavLink title="Shop" to={constants.kShopPage} />
        <NavLink title="Cart" to={constants.kCartPage} />
        <NavLink title="Wishlist" to={constants.kWishlistPage} />
        <NavLink title="Profile" to={constants.kProfilePage} />
        <IconButton onClick={handleClick}>
          <MoreVertIcon style={{ color: "white" }} />
        </IconButton>
        <Popover
          id={id}
          open={shouldOpenPopover}
          anchorEl={anchorEl}
          onClose={closePopOver}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          slotProps={{
            paper: {
              style: {
                width: "wrap-content",
                padding: "0% 20px",
              },
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {" "}
          <NavLink
            title="Cart"
            to={constants.kCartPage}
            isColorWhite={false}
            onClick={closePopOver}
          />
          <NavLink
            title="Wishlist"
            to={constants.kWishlistPage}
            isColorWhite={false}
            onClick={closePopOver}
          />
          <NavLink
            title="Profile"
            to={constants.kProfilePage}
            isColorWhite={false}
            onClick={closePopOver}
          />
          <Link
            component="button"
            underline="hover"
            onClick={() => {
              PiousApis.logoutUser(token).then((isLogoutSuccessful) => {
                if (isLogoutSuccessful) {
                  alert("Successfully logged out");
                }
                Cookies.remove("token");
                dispatch(updateToken(""));
                navigate(constants.kHomePage);
              });
            }}
          >
            <Typography sx={{ p: 2 }}>Logout</Typography>
          </Link>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

type NavLinkPropsType = {
  title?: string;
  to: string;
  className?: string | undefined;
  onClick?:
    | (React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLSpanElement>)
    | undefined;
  sx?: SxProps<Theme> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ElementType<any> | undefined;
  color?: string | undefined;
  underline?: "none" | "hover" | "always" | undefined;
  isColorWhite?: boolean;
};

const NavLink = ({
  className,
  title,
  to,
  component = RouterLink,
  color,
  underline,
  children,
  onClick,
  isColorWhite = true,
  sx,
}: PropsWithChildren<NavLinkPropsType>) => {
  return (
    <Link
      sx={sx}
      className={className}
      component={component}
      to={to}
      color={color ? color : isColorWhite ? "#fff" : undefined}
      underline={underline ? underline : "hover"}
      onClick={onClick ? onClick : undefined}
    >
      {children ? children : <Typography sx={{ p: 2 }}>{title}</Typography>}
    </Link>
  );
};

export default Navbar;
