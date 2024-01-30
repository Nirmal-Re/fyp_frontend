import { AppBar, Toolbar, Tabs, Tab, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { useState } from "react";
import { postsToAPI } from "../utils/apiRequests";

const Navbar = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    postsToAPI("auth/logout", { withCredentials: true })
      .then((result) => {
        navigate("/login", { state: result });
      })
      .catch((err) => console.log(err));
  };
  return (
    <AppBar sx={{ background: "#333333", position: "absolute" }}>
      <Toolbar>
        <Tabs
          textColor="inherit"
          value={value}
          onChange={(e, value) => setValue(value)}
          indicatorColor="secondary"
        >
          <Tab icon={<Home />} component={Link} to="/dashboard" />
          <Tab label="Journal" component={Link} to="/journal" />
          <Tab label="Workouts" component={Link} to="/workouts" />
        </Tabs>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ marginLeft: "auto" }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{ marginLeft: "15px" }}
        >
          signup
        </Button>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ marginLeft: "15px" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
