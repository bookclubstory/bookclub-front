import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Grid, IconButton, ImageListItem, ImageListItemBar} from "@mui/material";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import axiosConfig from "@utils/axiosConfig";

interface BookpostProps {
    item:{
        boardId: number,
        postId: string;
        title: string;
        rprsImageUrl: string;

    };
}

interface Bookpost{
    like:{
        selected:boolean;
        likeCnt:number;
    }
}

const BookpostItem = (props: BookpostProps) => {
    const { item } = props;

    let navigate = useNavigate();

    const [like, setLike] = useState<Bookpost["like"]>(
        {
            selected:false,
            likeCnt:0
        });

    useEffect(() => {
        // 컴포넌트 로드시 1번 실행
        if(item.postId) getBookpostLike(item.postId);
    }, []);

    const moveToBookpost = (postId: string) => {
        navigate(`/bookpost/list/${postId}`, { replace: true });
    };

    const handleImgError = (event: any) => {
        //이미지가 없는 경우, default이미지(todo:추후 변경)
        event.target.src =
            "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c";
    };

    const handleClick = (postId: string) =>{
        updateLike(postId);
    }

    const getBookpostLike = (postId: string) => {
        axiosConfig
            .get(`/api/v1/bookpost/like/${postId}`)
            .then(function (response: any) {
                // success
                setLike(response.data);
            })
            .catch(function (error: any) {
                //error
            })
            .then(function () {
                // finally
            });
    }

    const updateLike = (postId:string) =>{
        axiosConfig
            .post(`/api/v1/bookpost/like/${postId}`)
            .then(function (response: any) {
                // success
                getBookpostLike(postId)

            })
            .catch(function (error: any) {
                //error
            })
            .then(function () {
                // finally
            });
    }

    return (
        <Grid item key={item.postId} xs={12} md={4}>
            <ImageListItem
                key={item.postId}
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
                            sx={{color: "white"}}
                            aria-label={`${item.title}`}
                        >
                            <PhotoLibraryOutlinedIcon/>
                        </IconButton>
                    }
                    actionPosition="right"
                    onClick={() => moveToBookpost(item.postId)}
                />
                <ImageListItemBar
                    position="bottom"
                    actionIcon={
                        <IconButton
                            sx={{color: "white"}}
                            onClick={() =>handleClick(item.postId)}
                        >
                            {like.likeCnt}
                            {like.selected?<FavoriteOutlinedIcon/>:<FavoriteBorderOutlinedIcon/>}
                        </IconButton>
                    }
                    actionPosition="right"
                />
            </ImageListItem>
        </Grid>
    );
}

export default BookpostItem;
