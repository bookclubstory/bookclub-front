import React from 'react';
import {Button} from "@mui/material";

interface BtnRendererProps {
}

const BtnRenderer = (props:any) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const name = props.colDef.headerName;

    const buttonClicked = () => {
        console.log(props)
    };

    return (
        <div>
         <Button sx={{display: "block", p:1 }} className="ag-standard-button" onClick={buttonClicked}>{name}</Button>
        </div>
    );
};

export default BtnRenderer;
