import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { postsToAPI, fetchFromAPI } from "../utils/apiRequests";

const Navbar = () => {
  const [value, setValue] = useState(0);
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);

  useEffect(() => {
    const endPoint = "exercise/get-workouts";
    fetchFromAPI(endPoint)
      .then((result) => {
        const workouts = Object.keys(result);
        setWorkoutTypes(workouts);
      })
      .catch((err) => console.error(err));
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    postsToAPI("auth/logout", { withCredentials: true })
      .then((result) => {
        navigate("/login", { state: result });
      })
      .catch((err) => console.log(err));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Workouts
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {workoutTypes.map((workoutType) => {
              return (
                <MenuItem key={workoutType}>
                  <Link to="/workouts" state={{ type: workoutType }}>
                    {workoutType.toUpperCase()}
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
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
