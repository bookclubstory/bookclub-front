import React, { useContext, useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { ReducerType, resetStore, initStore } from "@modules/index";
import { SessionContext } from "@utils/session";
import {
  alpha,
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  styled,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as session from "@utils/session";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SigninBlock = (props: any) => {
  const dispatch = useDispatch();
  const session = useContext(SessionContext);
  // Description: 로그인 후 개인 메뉴 기능 (아이콘 드랍다운 메뉴)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    // 1. clear redux store
    dispatch(initStore())
    // 2. clear browser Local storage
    global.localStorage.clear();
    // 3. clear Cookies
    //session.removeCookie("session");
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    handleClose();
  }

  if (props.signinYn) {
    return (
      <div>
        <IconButton
          sx={{ my: 2, mx: 1, color: "white" }}
          aria-label="my profile"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => signout()}>Logout</MenuItem>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          sx={{ my: 2, mx: 1 }}
          component={Link}
          to={"/login"}
        >
          Log in
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          sx={{ my: 2, mx: 1 }}
          component={Link}
          to={"/signup"}
        >
          Sign Up
        </Button>
      </div>
    );    
  }
};

const Gnb = (props: any) => {
  const dispatch = useDispatch();
  const session = useContext(SessionContext);
  const [signinYn, setSigninYn] = useState<boolean>(false);
  let storedSession = useSelector((state: RootStateOrAny) => state.session.loginInfo);

  useEffect(() => {
    console.log("Changed session...!")
    console.log(storedSession);
    if (storedSession.loginId) {
      console.log("useEffect: true");
      setSigninYn(true);
    } else {
      console.log("useEffect: false");
      setSigninYn(false);      
    }
  }, [storedSession]);

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: "text.primary",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <AutoStoriesIcon sx={{ my: 1, mx: 1 }}></AutoStoriesIcon>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => dispatch(resetStore())}
            >
              우동북
            </Link>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/overview"}
            >
              Overview
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/bookclub/list"}
            >
              북클럽
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to={"/bookpost/list"}
            >
              독서로그
            </Button>
            <SigninBlock signinYn={signinYn} />
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Gnb;
