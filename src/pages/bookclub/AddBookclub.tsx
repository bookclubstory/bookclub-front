import {Container} from "@mui/material";
import React, {useState} from "react";
import ClubHeaderEdit from "@components/Bookclub/ClubHeaderEdit";
import ClubDetailEdit from "@components/Bookclub/ClubDetailEdit";
import axiosConfig from "@utils/axiosConfig";
import {useNavigate} from "react-router-dom";

const initialHeader = {
    clubId: '',
    clubNm: '',
    clubLoc: '',
    totMemberCnt: 1,
    privateYn: false,
    clubIntro: '',
    file: null,
}

const initialDetail = {
    clubIntro: '',
}

interface Bookclub {
    header: {
        clubNm: string,
        clubLoc: string,
        totMemberCnt:number,
        privateYn:boolean,
        clubIntro: string,
        file: FileList|null,
        [propsName:string]: any
    },
    detail: {
        clubIntro: string
    },
}

const AddBookclub = (props: any) => {
    let navigate = useNavigate();

    const [bookclub, setBookclub] = useState<Bookclub["header"]>(initialHeader);
    const [bookclubDetail, setBookclubDetail] = useState<Bookclub["detail"]>(initialDetail);

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
            file: event.target.files,
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
       let formData = new FormData();

       let data = {
           clubNm: bookclub["clubNm"],
           clubLoc:bookclub["clubLoc"],
           totMemberCnt:bookclub["totMemberCnt"],
           privateYn:bookclub["privateYn"],
           clubIntro:bookclub["clubIntro"],
       }

       if(bookclub.file) formData.append('file', bookclub.file[0]);
       formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}))

       axiosConfig
           .post(`/api/v1/bookclub`,formData)
           .then(function (response: any) {
               let clubId = response.data;
               // success
               navigate(`/bookclub/list/${clubId}`, { replace: true });

           })
           .catch(function (error: any) {
               //error
           })
           .then(function () {
               // finally
           });

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
