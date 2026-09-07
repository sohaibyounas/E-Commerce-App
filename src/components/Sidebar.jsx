import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MENU_ITEMS, SIDEBAR_WIDTH } from "../constants/ui";
import { Storefront as StorefrontIcon } from "@mui/icons-material";

const Sidebar = ({ mobileOpen, handleDrawerToggle, window }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerContent = (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          component="img"
          src="/icon.svg"
          alt="Logo"
          sx={{ width: 36, height: 36, borderRadius: 0 }}
        />
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ fontWeight: 600, fontSize: 15 }}
        >
          Admin Dashboard
        </Typography>
      </Box>
      <Box sx={{ overflow: "auto", mt: 2, px: 2 }}>
        <List>
          {MENU_ITEMS.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    navigate(item.path);
                    if (mobileOpen) handleDrawerToggle();
                  }}
                  sx={{
                    borderRadius: 2,
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main + "20", // 20 is opacity in hex
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main + "30",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isSelected
                        ? theme.palette.primary.main
                        : "inherit",
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
            backgroundColor: theme.palette.background.paper,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
