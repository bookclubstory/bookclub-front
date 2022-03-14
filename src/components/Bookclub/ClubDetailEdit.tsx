import React, {useEffect, useState} from "react";

import {
    Button,
    Card, CardActions, CardContent, CardMedia,
    Grid,
    IconButton,
    InputBase,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const sampleBooks = [
    {
        no: 1,
        title: "자금세탁방지법 강의",
        author: "지은이",
        publisher: "박영사",
        filePath: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
    },
    {
        no: 2,
        title: "돈의 정체",
        author: "이병희",
        publisher: "출판사",
        filePath: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
    },
    {
        no: 3,
        title: "창업의 정석",
        author: "지은이",
        publisher: "출판사",
        filePath: "https://images.unsplash.com/photo-1522770179533-24471fcdba45"
    },
    {
        no: 5,
        title: "비트코인",
        author: "지은이",
        publisher: "출판사",
        filePath: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
    }
];

interface Book{
    no: number,
    title: string,
    author: string,
    publisher: string,
    filePath: string
}

interface BookclubDetail {
    books: Book[]
}

const ClubDetailEdit = (props: any ) =>{
    const { bookclubDetail, handleInputChange, saveBookclub} = props;
    const [books, setBooks] = useState<BookclubDetail["books"]>(sampleBooks);

    return (
        <>
            <Grid container spacing={3} textAlign="left" alignItems="center">
                <Grid
                    item
                    xs={12}
                    sx={{
                        '& .markdown': {
                            py: 3,
                            pl: 3,
                            pr: 3
                        },
                        mb: 3
                    }}
                >
                    <Typography variant="h6" component="div" gutterBottom>
                        우리 모임에 대해 소개문을 작성해주세요 (소개글, 회칙, 주요 공지사항)
                    </Typography>
                    <TextField
                        id="clubIntro"
                        label="소개글"
                        name="clubIntro"
                        multiline
                        rows={3}
                        value={bookclubDetail.clubIntro}
                        onChange={handleInputChange}
                        fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="div" gutterBottom>
                        우리는 이런책을 읽을 거에요! (모임에서 읽을 책)
                    </Typography>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="경영/경제"
                            inputProps={{ 'aria-label': 'search books' }}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            flexGrow: 1,
                            minHeight: 300,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={4}>
                            {books.map((book) => (
                                <Grid item key={book.no} xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={`${book.filePath}`}
                                            alt="random"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6" component="h2" align="center">
                                                {book.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="center">
                                                {book.author} | {book.publisher}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Remove</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{m:1}}
            >
                <Grid item xs={2}>
                    <Button variant="contained" size="large" sx={{ backgroundColor: 'text.secondary' }} onClick={saveBookclub}>
                        개설하기
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ClubDetailEdit;
