import React from "react";
import {Box} from "@mui/material";

interface ClubMain {
    main: JSX.Element
}

const ClubMain = (props:ClubMain) =>{
    const { main } = props;

    return (
        <Box sx={{mt:3}}>
            {main}
        </Box>
    );
}

export default ClubMain;
