import React, {useState} from "react";
import {Button, ButtonBase, Divider, Grid, Paper, Stack, styled, Typography} from "@mui/material";
import Markdown from "@components/Markdown";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

interface ClubDetailProps{
    clubId: string,
    clubIntro: string
}

interface ClubDetail{
    clubSession:{
        sessionId:string,
        sessionNm:string,
        beginDt:string,
        beginPlc:string,
        memberCnt:number,
        allowedCnt:number,
        closedYn:boolean
    }
}
const initalSession = {
    sessionId:"1",
    sessionNm:"22년 맞이 우당탕탕 공덕역 철학회 셋 세션",
    beginDt:"22.01.07(금) 13:00",
    beginPlc:"경의선 숲길 카페 루크",
    memberCnt:4,
    allowedCnt:10,
    closedYn:false
}

const ClubDetail = (props: ClubDetailProps) => {
    const {clubId, clubIntro} = props;

    const [clubSession, setClubSession] =  useState<ClubDetail["clubSession"]>(initalSession);

    return (
        <Grid container spacing={3} textAlign="left" alignItems="center">
            <Grid item xs={2}>
                <Typography variant="h5" component="div" >
                    모임소개
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Divider />
            </Grid>
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
                <Markdown className="markdown" key={clubId}>
                    {clubIntro}
                </Markdown>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" component="div">
                    진행중인 세션
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{ml:2, mr:2}}>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item>
                            <ButtonBase sx={{ width: 128, height: 140 }}>
                                <Img alt="complex" src="https://source.unsplash.com/random?auto=format" />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {clubSession.sessionNm}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        장소 | {clubSession.beginPlc}
                                    </Typography>
                                    <Typography variant="body2">
                                        시간 | {clubSession.beginDt}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={4} justifyContent="flex-start" alignItems="center"sx={{pr:4}}>
                                        <Button variant="contained" size="large" sx={{ backgroundColor: 'text.secondary' }}>
                                            참여하기
                                        </Button>
                                        <Typography variant="body1" component="div">
                                            {clubSession.memberCnt}/{clubSession.allowedCnt}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ClubDetail;
