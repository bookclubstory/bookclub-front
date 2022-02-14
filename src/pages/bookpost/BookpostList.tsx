import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Tabs,
  Tab,
  Modal,
  Grid,
  Toolbar,
  ThemeProvider,
} from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { createTheme } from "@mui/material/styles";
import Banner from "@components/Banner";
import TabPanel from "@components/TabPanel";
import axiosConfig from "@utils/axiosConfig";
import BookpostAddModal from "@pages/bookpost/BookpostAddModal";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import * as actionOfBookpost from "@modules/bookpost/actionOfBookpost";

const theme = createTheme({
  components: {
    // Name of the component
    MuiImageListItem: {
      defaultProps: {
        style: { height: "240px", width: "100%" },
      },
    },
  },
});

const banner = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
};

const PAGE_SIZE = 6; //추후 사이즈 변경

interface BookpostList {
  content: [
    {
      boardId: number;
      postId: string;
      title: string;
      rprsImageUrl: string;
    }
  ];
}

function tabProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
    "aria-controls": `${name}-${index}`,
  };
}

const BookpostList = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [error, setError] = useState(null);

  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const [postList, setPostList] = useState<BookpostList["content"]>([
    {
      boardId: 0,
      postId: "",
      title: "",
      rprsImageUrl: "",
    },
  ]);

  const currentPage = useRef(0);
  const totalPage = useRef(0);

  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getBookpostList();
  }, []);

  /* 인터섹션 callback */
  const onIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting && currentPage.current < totalPage.current) {
      loadMoreBookPostList();
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(onIntersect, options);

    if (target) {
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const handleClickOpen = () =>
    dispatch(actionOfBookpost.setBookpostOpen(true));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleImgError = (event: any) => {
    //이미지가 없는 경우, default이미지(todo:추후 변경)
    event.target.src =
      "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c";
  };

  const moveToBookpost = (postId: string) => {
    navigate(`/bookpost/list/${postId}`, { replace: true });
  };

  const getBookpostList = async () => {
    setError(null);
    await axiosConfig
      .get("/api/v1/bookpost/list", {
        params: {
          size: PAGE_SIZE,
        },
      })
      .then(function (response: any) {
        // success
        setPostList(response.data.content);

        totalPage.current = response.data.totalPages;
        currentPage.current++;
      })
      .catch(function (error: any) {
        //error
        setError(error);
      })
      .then(function () {
        // finally
      });
  };

  const loadMoreBookPostList = async () => {
    if (currentPage.current > 0) {
      currentPage.current++;

      await axiosConfig
        .get("/api/v1/bookpost/list", {
          params: {
            size: PAGE_SIZE,
            page: currentPage.current,
          },
        })
        .then(function (response: any) {
          // success
          // @ts-ignore
          setPostList((prevState) => [...prevState, ...response.data.content]);
        })
        .catch(function (error: any) {
          //error
          setError(error);
          currentPage.current--;
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ mt: 1.5 }}>
        <Banner banner={banner} />

        <Box sx={{ mt: 3 }}>
          <Toolbar>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                icon={<GridOnIcon />}
                iconPosition="start"
                label="게시물"
                {...tabProps("tab", 0)}
              />
              {/*<Tab icon={<LocalOfferIcon/>} iconPosition="start" label="태그됨" {...tabProps("tab",1)}/>*/}
            </Tabs>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="Open Modal"
                onClick={handleClickOpen}
              >
                <AddCircleOutlinedIcon />
              </IconButton>
            </Box>
          </Toolbar>

          <BookpostAddModal />
        </Box>

        {/*게시물*/}
        <TabPanel name="tab" index={0} value={value}>
          <Grid container spacing={1}>
            {!error &&
              postList.map((item) => {
                return (
                  <Grid item key={item.postId} xs={12} md={4}>
                    <ImageListItem
                      key={item.postId}
                      onClick={() => moveToBookpost(item.postId)}
                    >
                      <img
                        src={`${item.rprsImageUrl}?auto=format`}
                        srcSet={`${item.rprsImageUrl}?auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        onError={handleImgError}
                      />
                      <ImageListItemBar
                        sx={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        }}
                        title={item.title}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: "white" }}
                            aria-label={`${item.title}`}
                          >
                            <PhotoLibraryOutlinedIcon />
                          </IconButton>
                        }
                        actionPosition="right"
                      />
                    </ImageListItem>
                  </Grid>
                );
              })}
          </Grid>
        </TabPanel>

        {/*태그됨*/}
        {/*<TabPanel name="tab" index={1} value={value}>*/}
        {/*</TabPanel>*/}
      </Container>

      <div ref={setTarget} />
    </ThemeProvider>
  );
};

export default BookpostList;
