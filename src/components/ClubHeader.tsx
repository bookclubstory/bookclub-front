import {
    Avatar,
    Box,
    Divider,
    Grid, ListItem, ListItemAvatar, ListItemText,
    Paper,
    Typography
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ClubHeaderProps {
    header:{
        title: string,
        image: string,
        subtitle: string,
        memberCnt: number,
        memberTotCnt: number,
        username: string,
        description: string
    };
}

const ClubHeader = (props: ClubHeaderProps) =>{
    const { header } = props;

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
                backgroundImage: `url(${header.image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={header.image} />}
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
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {header.title}
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
                                <Typography variant="subtitle1" component="p" paragraph>
                                    {header.subtitle}
                                </Typography>
                                <Typography variant="body2" component="div" align="right">
                                    {header.memberCnt}/{header.memberTotCnt}
                                </Typography>
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
                                        <ListItemText primary={header.username} secondary={header.description} />
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
