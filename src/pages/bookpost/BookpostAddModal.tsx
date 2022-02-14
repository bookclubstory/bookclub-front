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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
  let bookpostOpen = useSelector(
    (state: RootStateOrAny) => state.actionOfBookpost.bookpostOpen
  );

  const handleClose = () => {
    dispatch(actionOfBookpost.setBookpostOpen(false));
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
          <Box
            sx={{
              display: "flex",
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
              display: "flex",
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
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookpostAddModal;
