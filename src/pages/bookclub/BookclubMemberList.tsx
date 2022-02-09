import React, {useMemo, useState} from "react";
import {Box, Container, Grid} from "@mui/material";
import ClubHeader from "@components/ClubHeader";
import {AgGridReact} from "ag-grid-react";

const header = {
    title: '공덕역 방구석 철학자들',
    image: 'https://source.unsplash.com/random',
    subtitle: "혼자선 읽기 힘든 철학서적들 독서 품앗이로 함께 읽어요",
    memberCnt: 4,
    memberTotCnt: 10,
    username: "Starrything",
    description: "EXIT를 꿈꾸는 개발자"
}

interface BookclubMemberList{

}

const BookclubMemberList = (props: any) => {
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
        };
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'NO',
            field: 'no',
            width:100,
            type: 'numericColumn',
            valueFormatter: function(params:any) {
                return params.node.rowIndex+1;
            }
        },
        {
            headerName: '아이디',
            field: 'username',
            width:140,
        },
        {
            headerName: '권한',
            field: 'club_auth',
            width:80,
        },
        {
            headerName: '선호(관심)주제',
            field: 'interest',
            width:180,
        },
        {
            headerName: '클럽 가입일',
            field: 'club_join_dt',
            type:'dateColumn',
            width:110,
        },
        {
            headerName: '세션 참여 횟수',
            field: 'session_cnt' ,
            width:190,
        },
        {
            headerName: '메일보내기',
            field: 'option1',
            width:150,
        },
        {
            headerName: '퇴출',
            field: 'option1',
            width:150,
        }
    ]);

    const rowData = [
        {username: "user1", role:"권한", interest:"선호", date: "2022-02-23", session_cnt: 1, option1: "", option2:"" },
        {username: "user2", role:"권한", interest:"선호", date: "2022-02-23", session_cnt: 1, option1: "", option2:"" },
        {username: "user3", role:"권한", interest:"선호", date: "2022-02-23", session_cnt: 1, option1: "", option2:"" },
    ];

    return (
        <Container component="main" sx={{mt:1.5}} >
            <ClubHeader header={header}/>

            <Box sx={{mt:3}}>
                <div className="ag-theme-alpine grid_search_height2" >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                    >
                    </AgGridReact>
                </div>
            </Box>
        </Container>
    );
}

export default BookclubMemberList;
