import React from 'react';
import {Button} from "@mui/material";

interface BtnRendererProps {
}

const BtnRenderer = (props:any) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const name = props.colDef.headerName;
    //버튼 비활성화 여부
    const disable = props.disable;

    const buttonClicked = () => {
        let funcNm = props.funcNm;

        if(funcNm){
            funcNm(props.data);
        }
    };

    return (
        <div>
            {!disable &&
                <Button sx={{display: "block", p: 1}} className="ag-standard-button" onClick={buttonClicked}>{name}</Button>
            }
        </div>
    );
};

export default BtnRenderer;
