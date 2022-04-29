import React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

const About = () => {
    return (
        <Container sx={{ pt: 8.5, pb: 6, textAlign: "left" }}>
            <Typography variant="h3">Read with Us</Typography>
            <br />
            <Typography variant="h5">우리동네 북클럽</Typography>
            <br />
            <Box>
                <Typography variant="h6">
                    집 또는 회사 근처 독서모임을 찾고 계신가요?
                </Typography>
                <br />
                <Typography variant="body1">
                    우동북과 함께 동네 독서클럽을 찾아보세요!
                    <br />
                    언제 어디서든 모임을 개설하거나 세션에 참여하실 수 있습니다.
                </Typography>
                <br />
                <br />
                <Typography variant="h6">
                    다양한 모임
                </Typography>
                <br />
                <Typography variant="body1">
                    자유로운 의견 교환으로 집단지성을 발휘해보세요.
                    <br />
                    '내가' 미처 생각하지 못한 것들을 다른 사람과의 대화에서 찾을 수 있습니다.
                </Typography>
            </Box>
        </Container>
    );
}

export default About;
