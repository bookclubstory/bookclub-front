import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "@utils/axiosConfig";
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const MySwal = withReactContent(Swal);

const theme = createTheme({
  typography: {
    error: {
      color: 'red',
    }
  }
});
declare module '@mui/material/styles' {
  interface TypographyVariants {
    error: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

interface Code {
  codeList: [{ code: string; value: string }];
}

const Signup = (props: any) => {
  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getTopicList();
    getTownList();
  }, []);

  let navigate = useNavigate();

  const passwordErrorText = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState("");
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
  });
  const { email, password, confirmPassword, firstName } = userinfo;
  const [birthDate, setBirthDate] = useState<Date | null>(new Date());
  const [topicList, setTopicList] = useState([]);
  const [topics, setTopics] = React.useState<string[]>([]);
  const handleChangeTopic = (event: SelectChangeEvent<typeof topics>) => {
    const {
      target: { value },
    } = event;
    setTopics(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [townList, setTownList] = useState([]);
  const [towns, setTowns] = React.useState<string[]>([]);
  const handleChangeTown = (event: SelectChangeEvent<typeof towns>) => {
    const {
      target: { value },
    } = event;
    setTowns(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    let formValue = value;

    if (name === "password" || name === "confirmPassword") {
      let currPassword = "";
      let currConfirmPassword = "";
      if (name === "password") {
        currPassword = value;
        currConfirmPassword = confirmPassword;
        if(password.length == 0 && confirmPassword.length == 0 && passwordErrorText.current !== null) {
          passwordErrorText.current.style.display = "none";
        }
      }

      if (name === "confirmPassword") {
        currPassword = password;
        currConfirmPassword = value;
        if (password.length > 0 && passwordErrorText.current !== null) {
          passwordErrorText.current.style.display = "block";
        }
      }

      if (currPassword === currConfirmPassword) {
        setPasswordError("");
      } else {
        setPasswordError("Passwords must match");
      }
    }

    const nextUserinfo = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...userinfo,
      [name]: formValue,
    };
    //만든 변수를 seInput으로 변경해준다.
    setUserinfo(nextUserinfo);
  };

  const getTopicList = () => {
    axiosConfig
      .get("/api/v1/code", {
        params: {
          code: "INTEREST_TOPIC",
        },
      })
      .then(function (response) {
        // success
        let topics: any = [];
        response.data.forEach((element: { code: string; value: string; }) => {
          topics.push(<MenuItem value={element.code}>{element.value}</MenuItem>);
        });
        setTopicList(topics);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const getTownList = () => {
    axiosConfig
      .get("/api/v1/code", {
        params: {
          code: "INTEREST_TOWN",
        },
      })
      .then(function (response) {
        // success
        let towns: any = [];
        response.data.forEach((element: { code: string; value: string; }) => {
          towns.push(<MenuItem value={element.code}>{element.value}</MenuItem>);
        });
        setTownList(towns);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };

  const register = () => {
    if (email.length === 0) {
      return;
    }
    if (password.length === 0 || passwordError.length > 0) {
      return;
    }
    if (firstName.length === 0) {
      return;
    }

    axiosConfig
      .post("/api/v1/user/signup", {
        email: email,
        password: password,
        firstName: firstName,
        birthDate: birthDate,
        topics: topics,
        towns: towns,
      })
      .then(function (response) {
        // success
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "환영합니다! 성공적으로 가입되었습니다.",
        }).then(function(isConfirm) {
          if(isConfirm) {
            navigate("/login");
          }
        });
      })
      .catch(function (error) {
        // error
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "회원 가입에 실패하였습니다.",
        });
      })
      .then(function () {
        // finally
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              Please with us!
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2} textAlign={"left"}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                  />
                  <Typography variant="error" sx={{ display: "none" }} ref={passwordErrorText}>{passwordError}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MobileDatePicker
                    label="Birth Date"
                    value={birthDate}
                    inputFormat={"yyyy-MM-dd"}
                    toolbarFormat={"yyyy-MM-dd"}
                    onChange={(newBirth) => {
                      setBirthDate(newBirth);
                    }}
                    renderInput={(params) => <TextField id="birth-date" sx={{ width: "100%" }} {...params} />}
                  />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="topic-select-label">Topics</InputLabel>
                      <Select
                        labelId="topic-select-label"
                        id="topic-select"
                        multiple
                        value={topics}
                        label="Topic"
                        onChange={handleChangeTopic}
                      >
                        {topicList.map(topic => {
                          return topic;
                        })}
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="town-select-label">Towns</InputLabel>
                      <Select
                        labelId="town-select-label"
                        id="town-select"
                        multiple
                        value={towns}
                        label="Town"
                        onChange={handleChangeTown}
                      >
                        {townList.map(town => {
                          return town;
                        })}
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={register}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default Signup;
