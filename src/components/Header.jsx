import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useThemeMode } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const { user } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "text.primary", display: { xs: "none", sm: "block" } }}
          >
            Overview
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? (
              <LightModeIcon sx={{ color: "text.secondary" }} />
            ) : (
              <DarkModeIcon sx={{ color: "text.secondary" }} />
            )}
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon sx={{ color: "text.secondary" }} />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {user?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Admin
              </Typography>
            </Box>
            <Avatar
              alt={user?.name}
              src="/placeholder-user.jpg"
              sx={{
                width: 40,
                height: 40,
                cursor: "pointer",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
