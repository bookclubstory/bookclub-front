import {Container} from "@mui/material";
import React, {useState} from "react";
import ClubHeaderEdit from "@components/Bookclub/ClubHeaderEdit";
import ClubDetailEdit from "@components/Bookclub/ClubDetailEdit";

const initalHeader = {
    clubId: '',
    clubNm: '',
    clubLoc: '',
    totMemberCnt: 1,
    privateYn: false,
    clubIntro: '',
    thumbnail: null,
}

const initalDetail = {
    clubIntro: '',
}

interface Bookclub {
    header: {
        clubNm: string,
        clubLoc: string,
        totMemberCnt:number,
        privateYn:boolean,
        clubIntro: string,
        thumbnail: FileList|null,
    },
    detail: {
        clubIntro: string
    },
}

const AddBookclub = (props: any) => {
    const [bookclub, setBookclub] = useState<Bookclub["header"]>(initalHeader);
    const [bookclubDetail, setBookclubDetail] = useState<Bookclub["detail"]>(initalDetail);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;

        const bookclubInfo = {
            ...bookclub,
            [name]: value,
        };
        setBookclub(bookclubInfo);
    };

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        const bookclubInfo = {
            ...bookclub,
            [name]: checked,
        };
        setBookclub(bookclubInfo);
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bookclubInfo = {
            ...bookclub,
            thumbnail: event.target.files,
        };
        setBookclub(bookclubInfo);
    };

    const handleDetailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;

        const bookclubInfo = {
            ...bookclubDetail,
            [name]: value,
        };
        setBookclubDetail(bookclubInfo);
    };

    //클럽 페이지 작성
   const saveBookclub = () => {
       /*todo 페지 작성*/

    }

    return (
        <Container component="main" sx={{mt:1.5}} >
            <ClubHeaderEdit bookclub={bookclub}
                            handleInputChange={handleInputChange}
                            handleFileInputChange={handleFileInputChange}
                            handleCheckChange={handleCheckChange}/>
            <ClubDetailEdit bookclubDetail={bookclubDetail}
                            handleInputChange={handleDetailInputChange}
                            saveBookclub={saveBookclub}/>
        </Container>
    );
}

export default AddBookclub;
