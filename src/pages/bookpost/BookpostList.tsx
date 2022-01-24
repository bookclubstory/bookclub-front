import React, {useEffect, useState} from "react";
import Banner from "@components/Banner";
import {
    Box,
    Container,
    IconButton,
    ImageListItem,
    ImageListItemBar,
    Tabs,
    Tab, Modal, Grid, Toolbar,
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import TabPanel from "@components/TabPanel";

const banner = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
};

const itemData = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        id: 5,
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        id: 6,
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        id: 7,
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        id: 8,
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        id: 9,
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
];

function tabProps(name: string, index: number) {
    return {
        id: `${name}-${index}`,
        'aria-controls': `${name}-${index}`,

    };
}

const BookpostList= (props: any) => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <Container component="main" sx={{mt:1.5}} >
            <Banner banner={banner}/>

            <Box sx={{mt:3}}>
                <Toolbar>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab icon={<GridOnIcon />} iconPosition="start" label="게시물" {...tabProps("tab",0)}/>
                        <Tab icon={<LocalOfferIcon/>} iconPosition="start" label="태그됨" {...tabProps("tab",1)}/>
                    </Tabs>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="Open Modal"
                            onClick={handleOpen}
                        >
                            <AddCircleOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/*START MODAL*/}
                    <Box>
                    </Box>
                    {/* <!-- /END MODAL --> */}
                </Modal>
            </Box>

            {/*게시물*/}
            <TabPanel name="tab" index={0} value={value} >
                <Grid container spacing={1}>
                    {itemData.map((item)=> {
                        return (
                            <Grid item key={item.id} xs={12} md={4}>
                                <ImageListItem key={item.id} >
                                    <img
                                        src={`${item.img}?auto=format`}
                                        srcSet={`${item.img}?auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                        title={item.title}
                                        position="top"
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'white'}}
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
            <TabPanel name="tab" index={1} value={value}>
            </TabPanel>

        </Container>
    );
};

export default BookpostList;
