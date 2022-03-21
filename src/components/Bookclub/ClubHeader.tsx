import {
    Avatar,
    Box, Button,
    Divider,
    Grid, ListItem, ListItemAvatar, ListItemText,
    Paper, Stack,
    Typography
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Dispatch, SetStateAction} from "react";

interface ClubHeaderProps {
    header: {
        clubId: string,
        clubNm: string,
        clubLoc: string,
        memberCnt: number,
        totMemberCnt:number,
        privateYn:boolean,
        clubIntro: string,
        thumbnail: string,
        owner:{
            username: string,
            description:string,
        }
    },
    setMain: Dispatch<SetStateAction<string>>
}

const ClubHeader = (props: ClubHeaderProps) =>{
    const { header, setMain} = props;

    const showMemeberList = () => {
        setMain("member");
    }

    const showMain = () => {
        setMain("main");
    }

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${header.thumbnail})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={header.thumbnail} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item xs={6} md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom onClick={()=>showMain()}>
                            {header.clubNm}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            color: 'text.primary',
                            backgroundColor: 'background.paper',
                            p: { xs: 3, md: 6 },
                            m: 2,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" component="p" textAlign="left" paragraph
                                            sx={{m:2}}>
                                    {header.clubIntro}
                                </Typography>
                                <Stack direction="row" spacing={4} justifyContent="flex-end" alignItems="center" sx={{pr:4}}>
                                    <Button variant="contained" size="large" sx={{ backgroundColor: 'text.secondary' }}>
                                        참여하기
                                    </Button>
                                    <Typography variant="body1" component="div" onClick={()=>showMemeberList()}>
                                        {header.memberCnt}/{header.totMemberCnt}
                                    </Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" />
                                <Box>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={header.owner.username} secondary={header.owner.description} />
                                    </ListItem>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ClubHeader;
