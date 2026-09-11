import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Logout as LogoutIcon,
  CheckCircle as CheckCircleIcon,
  PersonAdd as PersonAddIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useThemeMode } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { fetchUnreadCount } from "../api/notificationApi";

const notificationIcon = {
  user_registered: <PersonAddIcon fontSize="small" />,
  order_placed: <ShoppingCartIcon fontSize="small" />,
  order_status: <CheckCircleIcon fontSize="small" />,
};

const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = useCallback(async () => {
    try {
      const res = await fetchUnreadCount();
      setUnreadCount(res.data.unreadCount);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [loadUnreadCount]);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

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
            <Badge badgeContent={unreadCount} color="secondary">
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
                {user?.role === "admin" ? "Admin" : "User"}
              </Typography>
            </Box>
            <Avatar
              alt={user?.name}
              src="/placeholder-user.jpg"
              onClick={handleMenuOpen}
              sx={{
                width: 40,
                height: 40,
                cursor: "pointer",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
