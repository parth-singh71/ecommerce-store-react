import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {
  Box,
  Link as Link,
  List,
  ListItem,
  ListItemButton,
  Popover,
  SwipeableDrawer,
  SxProps,
  Theme,
} from "@mui/material";
import constants from "../../utils/constants";
import { Link as RouterLink } from "react-router-dom";
import React, { ElementType, PropsWithChildren, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useLogout from "../../utils/hooks/useLogout";

const Navbar = (props: { token: string }) => {
  const { token } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const shouldOpenPopover = Boolean(anchorEl);
  const id = shouldOpenPopover ? "simple-popover" : undefined;
  const closePopOver = () => {
    setAnchorEl(null);
  };
  const logout = useLogout();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <CustomDrawer />
        <NavLink to={constants.kHomePage} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {constants.kAppName}
          </Typography>
        </NavLink>
        <Box
          component="div"
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            textOverflow: "ellipsis",
          }}
        >
          <NavLink title="Home" to={constants.kHomePage} />
          <NavLink title="About" to={constants.kAboutPage} />
          <NavLink title="Shop" to={constants.kShopPage} />
          <NavLink title="Cart" to={constants.kCartPage} />
          <NavLink title="Wishlist" to={constants.kWishlistPage} />
          <NavLink title="Profile" to={constants.kProfilePage} />
        </Box>
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
            onClick={() => logout(token, true)}
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

export const NavLink = ({
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

const CustomDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleClick = (status?: boolean) => {
    if (status) {
      setIsDrawerOpen(status);
    } else {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };
  const anchor = "left";
  return (
    <React.Fragment key={anchor}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 1, display: { sm: "block", md: "none" } }}
        onClick={() => handleClick()}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={anchor}
        open={isDrawerOpen}
        onClose={() => handleClick(false)}
        onOpen={() => handleClick(true)}
      >
        <List>
          <CustomListItem
            title="Home"
            to={constants.kHomePage}
            onClick={() => handleClick(false)}
          />
          <CustomListItem
            title="About"
            to={constants.kAboutPage}
            onClick={() => handleClick(false)}
          />
          <CustomListItem
            title="Shop"
            to={constants.kShopPage}
            onClick={() => handleClick(false)}
          />
          <CustomListItem
            title="Cart"
            to={constants.kCartPage}
            onClick={() => handleClick(false)}
          />
          <CustomListItem
            title="Wishlist"
            to={constants.kWishlistPage}
            onClick={() => handleClick(false)}
          />
          <CustomListItem
            title="Profile"
            to={constants.kProfilePage}
            onClick={() => handleClick(false)}
          />
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

const CustomListItem = ({
  title,
  to,
  onClick,
}: {
  title: string;
  to: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <ListItem key={title} disablePadding>
      <ListItemButton dense sx={{ my: 0, py: 0, px: 5 }} onClick={onClick}>
        <NavLink
          title={title}
          to={to}
          isColorWhite={false}
          sx={{ my: 0, py: 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Navbar;
