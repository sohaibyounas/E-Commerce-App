import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Something went wrong
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            An unexpected error occurred while rendering this page. Please try
            again.
          </Typography>
          <Button variant="contained" onClick={this.handleReload}>
            Reload Page
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundary = ({ children }) => {
  const location = useLocation();
  return (
    <ErrorBoundaryClass key={location.pathname}>{children}</ErrorBoundaryClass>
  );
};

export default ErrorBoundary;