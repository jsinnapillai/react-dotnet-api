import { ShoppingCart } from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
// or

import {
  AppBar,
  Box,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];
const rihgtLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "text.secondary" },
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component={NavLink} to={"/"} sx={navStyles}>
          Re-Store
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Box>

      <List sx={{ display: "flex" }}>
        {midLinks.map(({ title: midtitlelink, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
            {midtitlelink.toUpperCase()}
          </ListItem>
        ))}
      </List>

      <Box display="flex" alignItems="center">
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <List sx={{ display: "flex" }}>
          {rihgtLinks.map(({ title: rightlink, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {rightlink.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
