import React from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReducerType, resetStore } from "@modules/index";
import {alpha, AppBar, Box, Button, IconButton, InputBase, styled, Tab, Toolbar, Typography} from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Gnb = (props: any) => {
  const dispatch = useDispatch();
  const token = useSelector((state: ReducerType) => state.session.loginInfo.token);

  return (
      <React.Fragment>
          <AppBar
              position="fixed"
              elevation={0}
              sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`,bgcolor: 'text.primary' }}
          >
              <Toolbar sx={{ flexWrap: 'wrap' }}>
                  <AutoStoriesIcon sx={{ my: 1, mx: 1 }}></AutoStoriesIcon>
                  <Typography variant="h6" color="inherit" noWrap sx={{ display: { xs: 'none', sm: 'block' } }} >
                    <Link
                       to="/"
                       style={{textDecoration:'none',color: "white"}}
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
                          inputProps={{ 'aria-label': 'search' }}
                      />
                  </Search>

                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <Button
                          sx={{ my: 2, color: 'white', display: 'block' }}
                          component ={Link}
                          to={"/overview"}
                          >
                          Overview
                      </Button>
                      <Button
                          sx={{ my: 2, color: 'white', display: 'block' }}
                          component ={Link}
                          to={"/bookclub/list"}>
                          북클럽
                      </Button>
                      <Button
                          sx={{ my: 2, color: 'white', display: 'block' }}
                          component ={Link}
                          to={"/bookpost/list"}>
                          독서로그
                      </Button>
                      <Button
                          color="inherit"
                          variant="outlined"
                          sx={{ my: 1, mx: 1 }}
                          component ={Link}
                          to={"/login"}>
                          Log in
                      </Button>
                      <Button
                          color="inherit"
                          variant="outlined"
                          sx={{ my: 1, mx: 1 }}
                          component = {Link}
                          to={"/signup"}>
                          Sign Up
                      </Button>
                  </Box>
              </Toolbar>
          </AppBar>
      </React.Fragment>
  );
};

export default Gnb;
