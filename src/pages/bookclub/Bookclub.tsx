import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import ClubHeader from "@components/Bookclub/ClubHeader";

import ClubMemberList from "@components/Bookclub/ClubMemberList";
import ClubMain from "@components/Bookclub/ClubMain";
import axiosConfig from "@utils/axiosConfig";
import * as actionOfClubAuth from "@modules/code/actionOfClubAuth";
import {useDispatch} from "react-redux";
import ClubDetail from "@components/Bookclub/ClubDetail";
import {useParams} from "react-router";

const header = {
    clubId: "1",
    clubNm: '공덕역 방구석 철학자들',
    clubLoc: "서울",
    memberCnt: 0,
    totMemberCnt:0,
    privateYn:false,
    clubIntro: '혼자선 읽기 힘든 철학서적들 독서 품앗이로 함께 읽어요',
    thumbnail: 'https://source.unsplash.com/random',
    owner:{
        username: "Starrything",
        description: "꿈꾸는 개발자"
    }
}

interface Bookclub {
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
    main:string,
    clubId: string,
}

const Bookclub = (props: any) => {
    const dispatch = useDispatch();
    const {clubId} = useParams<Bookclub["clubId"]>();

    const [main, setMain] = useState<Bookclub["main"]>("")
    const [loading, setLoading] = useState(false);
    const [bookclub, setBookclub] = useState<Bookclub["header"]>(header);

    useEffect(() => {
        getAuthCodeList();
        getBookclub(clubId);
    }, []);

    const showMain = (bookclub: Bookclub["header"]) => {
        switch(main){
            case "main":
                return <ClubDetail clubId = {bookclub.clubId} clubIntro={bookclub.clubIntro} />
                break;
            case "member":
                return <ClubMemberList clubId = {bookclub.clubId} />
                break;
            default:
                return <ClubDetail clubId = {bookclub.clubId} clubIntro={bookclub.clubIntro}/>
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

    const getBookclub = (clubId: any) => {
        axiosConfig.get(`/api/v1/bookclub/${clubId}`)
            .then(function (response: any) {
                setBookclub(response.data);
            })
            .catch(function (error) {
                // error
            })
            .then(function () {
                // finally
            });
    }

    return (
        <Container component="main" sx={{mt:1.5}} >
            <ClubHeader header={bookclub} setMain={setMain} />

            {loading&&
                <ClubMain main={showMain(bookclub)}/>}
        </Container>
    );
}

export default Bookclub;
