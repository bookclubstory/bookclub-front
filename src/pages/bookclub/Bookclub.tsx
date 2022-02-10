import React, { useState} from "react";
import {Container} from "@mui/material";
import ClubHeader from "@components/Bookclub/ClubHeader";

import ClubMemberList from "@components/Bookclub/ClubMemberList";
import ClubMain from "@components/Bookclub/ClubMain";

const header = {
    clubId: "1",
    title: '공덕역 방구석 철학자들',
    image: 'https://source.unsplash.com/random',
    subtitle: "혼자선 읽기 힘든 철학서적들 독서 품앗이로 함께 읽어요",
    memberCnt: 4,
    memberTotCnt: 10,
    username: "Starrything",
    description: "EXIT를 꿈꾸는 개발자"
}

interface Bookclub {
    main:string
}

const Bookclub = (props: any) => {
    const [main, setMain] = useState<Bookclub["main"]>("")

    const showMain = (clubId: string) => {
        switch(main){
            case "member":
                return <ClubMemberList clubId = {clubId} />
                break;
            default:
                return <ClubMemberList clubId = {clubId}/>
        }
    }

    return (
        <Container component="main" sx={{mt:1.5}} >
            <ClubHeader header={header} setMain={setMain} />

            <ClubMain main={showMain(header.clubId)}/>
        </Container>
    );
}

export default Bookclub;
