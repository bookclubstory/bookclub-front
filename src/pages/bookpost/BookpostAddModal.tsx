import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import * as actionOfBookpost from "@modules/bookpost/actionOfBookpost";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled("input")({
  display: "none",
});

const BookpostAddModal = (props: any) => {
  const dispatch = useDispatch();
  let loginInfo = useSelector(
    (state: RootStateOrAny) => state.session.loginInfo
  );
  let bookpostOpen = useSelector(
    (state: RootStateOrAny) => state.actionOfBookpost.bookpostOpen
  );
  const [imageArea, setImageArea] = useState<number>(12);
  const [descriptionShow, setDescriptionShow] = useState<Boolean>(true);
  const [textArea, setTextArea] = useState<number>(0);
  const [textAreaShow, setTextAreaShow] = useState<Boolean>(false);
  const [uploadImage, setUploadImage] = useState<string>("");

  const handleClose = () => {
    dispatch(actionOfBookpost.setBookpostOpen(false));

    // Do initiate
    setUploadImage("");
    setDescriptionShow(true);
    setTextAreaShow(false);
    setImageArea(12);
    setTextArea(0);
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //
    if (event.target.files && event.target.files[0]) {
      setUploadImage(URL.createObjectURL(event.target.files[0]));
    }
    setDescriptionShow(false);
    setTextAreaShow(true);
    setImageArea(8);
    setTextArea(4);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={bookpostOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              새 게시물 만들기
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={imageArea}>
              <Box
                sx={{
                  display: descriptionShow ? "flex" : "none",
                  justifyContent: "center",
                  m: 3,
                  minWidth: { md: 350 },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <img src="/images/bookpost/image-and-media.png" />
                </Stack>
              </Box>
              <Box
                sx={{
                  display: descriptionShow ? "flex" : "none",
                  justifyContent: "center",
                  m: 3,
                  minWidth: { md: 350 },
                }}
              >
                <Typography component="div">
                  사진과 동영상을 여기에 끌어다 놓으세요.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  m: 3,
                  minWidth: { md: 350 },
                }}
              >
                <img id="target" src={uploadImage} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  m: 3,
                  minWidth: { md: 350 },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="add-bookpost-file">
                    <Input
                      accept="image/*"
                      id="add-bookpost-file"
                      multiple
                      type="file"
                      onChange={(event) => onImageChange(event)}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={textArea}>
              {/* TODO: export Component */}
              <Box
                sx={{
                  display: textAreaShow ? "flex" : "none",
                  mb: 3,
                  verticalAlign: "center",
                }}
              >
                <Avatar>H</Avatar>
                <Typography>&nbsp;&nbsp;{loginInfo.firstName}</Typography>
              </Box>
              <Box sx={{ display: textAreaShow ? "flex" : "none" }}>
                <TextField
                  id="standard-multiline-static"
                  fullWidth
                  label="문구 입력"
                  multiline
                  rows={6}
                  defaultValue="Default Value"
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookpostAddModal;
