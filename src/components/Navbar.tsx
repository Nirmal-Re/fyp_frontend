import {
  AppBar,
  Toolbar,
  Tab,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { postsToAPI, fetchFromAPI } from "../utils/apiRequests";

interface NavbarProps {
  props: {
    isLoggedIn: boolean;
    handleLogout: () => void;
  };
}
const Navbar = ({ props: { isLoggedIn } }: NavbarProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [hasLogout, setHasLogout] = useState(false);
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);
  const [notifications, setNotification] = useState<string[]>([]);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (notifications.length > 0) {
      setNotificationAnchorEl(event.currentTarget);
    }
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const useStyles = makeStyles({
  //   indicator: {
  //     display: "none",
  //   },
  // });

  // const classes = useStyles();

  useEffect(() => {
    const endPoint = "exercise/get-workouts";
    fetchFromAPI(endPoint)
      .then((result) => {
        const workouts = Object.keys(result);
        setWorkoutTypes(workouts);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        console.error(err);
      });
    const notificationEndPoint = "notifications/get-notifications";
    fetchFromAPI(notificationEndPoint)
      .then((result) => {
        // console.log({ result });
        setNotification(result.notifications);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [hasLogout, isLoggedIn]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    postsToAPI("auth/logout", { withCredentials: true })
      .then((result) => {
        setHasLogout(!hasLogout);
        handleLogout();
        navigate("/login", { state: result });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNotification = (index: number) => {
    const endPoint = "notifications/delete-notification";
    postsToAPI(endPoint, { nid: index }).catch((err) => console.error(err));
  };

  return (
    <AppBar sx={{ background: "#333333", position: "absolute" }}>
      <Toolbar>
        <Tab
          icon={<Home />}
          component={Link}
          to={isAuthenticated ? "/dashboard" : "/"}
        />
        {isAuthenticated && (
          <Tab label="Journal" component={Link} to="/journal" />
        )}
        {isAuthenticated && (
          <>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ color: "#ADADAD" }}
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
                  <MenuItem
                    key={workoutType}
                    component={Link}
                    to="/workouts"
                    state={{ type: workoutType }}
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => handleClose()}
                  >
                    {workoutType.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
        {!isAuthenticated && (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{ marginLeft: "auto" }}
          >
            Login
          </Button>
        )}
        {!isAuthenticated && (
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{ marginLeft: "15px" }}
          >
            signup
          </Button>
        )}
        {isAuthenticated && (
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        )}
        {isAuthenticated && (
          <>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnchorEl}
              keepMounted
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationClose}
            >
              {notifications.map((notification, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to="/journal"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    handleNotificationClose();
                    setNotification(
                      notifications.filter((_, i) => i !== index)
                    );
                    handleDeleteNotification(index);
                  }}
                >
                  {notification}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
