import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import ClubHeader from "@components/Bookclub/ClubHeader";

import ClubMemberList from "@components/Bookclub/ClubMemberList";
import ClubMain from "@components/Bookclub/ClubMain";
import axiosConfig from "@utils/axiosConfig";
import * as actionOfClubAuth from "@modules/code/actionOfClubAuth";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch();

    const [main, setMain] = useState<Bookclub["main"]>("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAuthCodeList();
    }, []);

    const showMain = (clubId: string) => {
        switch(main){
            case "member":
                return <ClubMemberList clubId = {clubId} />
                break;
            default:
                return <ClubMemberList clubId = {clubId}/>
        }
    }

    const getAuthCodeList = () => {
        axiosConfig.get("/api/code", {
            params: {
                code: "CLUB_AUTH",
            },
        })
        .then(function (response: any) {
            // success
            let codeOptions: { code: string; value: string; }[] = [];
            response.data.forEach((element: { [x: string]: string; }) => {
                codeOptions.push({
                    code: element["code"],
                    value: element["value"],
                });
            });
            dispatch(actionOfClubAuth.setClubAuthList(codeOptions));
            setLoading(true);
        })
        .catch(function (error) {
            // error
        })
        .then(function () {
            // finally
        });
    };

    return (
        <Container component="main" sx={{mt:1.5}} >
            <ClubHeader header={header} setMain={setMain} />

            {loading&&
                <ClubMain main={showMain(header.clubId)}/>}
        </Container>
    );
}

export default Bookclub;
