import React, {useRef, useState} from "react";
import {
    Box, Checkbox, FormControl,
    Grid, IconButton, InputLabel, OutlinedInput,
    Paper, TextField, Typography
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const ClubHeaderEdit = (props: any) =>{
    const { bookclub, handleInputChange,handleFileInputChange, handleCheckChange } = props;

    const { clubNm, clubLoc, totMemberCnt, privateYn, clubIntro, thumbnail } = bookclub;

    const [imageSrc, setImageSrc] = useState<string>('');

    const imgInput = useRef<HTMLInputElement>(null);

    //이미지 첨부
    const handleClick = () => {
        if (imgInput.current) {
            imgInput.current.click();
        }
    }

    const encodeFileToBase64 = (fileBlob:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise<string|void>((resolve) => {
            reader.onload = () => {
                let result = reader.result as string;
                setImageSrc(result);
                console.log(reader);
                resolve();
            };
        });
    };


    const handleFileChange = (event: any) => {
        handleFileInputChange(event);
        encodeFileToBase64(event.target.files[0]);
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
                backgroundImage: `url(${imageSrc})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={imageSrc} />}
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
                        <FormControl fullWidth>
                            <InputLabel htmlFor="component-outlined">클럽명</InputLabel>
                            <OutlinedInput
                                id="clubNm"
                                name = "clubNm"
                                value={clubNm}
                                onChange={handleInputChange}
                                label="클럽명"
                                sx={{backgroundColor: 'background.paper', color: 'black'}}
                            />
                        </FormControl>
                    </Box>
                   <Box
                       sx={{
                           position: 'relative',
                           p: { xs: 3, md: 6 },
                           pr: { md: 0 },
                       }}
                       onClick={handleClick}
                   >
                       <input ref={imgInput} type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} hidden/>
                       <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                       >
                           <AddCircleOutlinedIcon />
                       </IconButton>
                   </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box
                        component="form"
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexWrap: 'wrap',
                            color: 'text.primary',
                            backgroundColor: 'background.paper',
                            p: { xs: 3, md: 6 },
                            m: 2,
                        }}
                    >
                        <Grid container
                              spacing={2}
                              alignItems="center"
                        >
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="clubIntro"
                                    label="간단한 소개"
                                    name="clubIntro"
                                    multiline
                                    rows={3}
                                    value={clubIntro}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="subtitle1" component="div">
                                    지역
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    id="clubLoc"
                                    name="clubLoc"
                                    label="지역"
                                    variant="outlined"
                                    value={clubLoc}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography variant="subtitle1" component="div">
                                    모집 인원
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    id="totMemberCnt"
                                    name="totMemberCnt"
                                    label="모집인원"
                                    variant="outlined"
                                    type="number"
                                    value={totMemberCnt}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography variant="subtitle1" component="div" >
                                    공개 여부
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Checkbox
                                    id="privateYn"
                                    name="privateYn"
                                    checked={privateYn}
                                    onChange={handleCheckChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ClubHeaderEdit;
