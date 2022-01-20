import React from "react";
import { Link } from "react-router-dom";

import {Box, Container, Typography} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link to="/">
                Jonghyun, Inc.
            </Link>{' '}
            {new Date().getFullYear()} ·
            <Link to="#">Privacy</Link> ·{" "}<Link to="#">Terms</Link>{'.'}
        </Typography>
    );
}

const Footer = (props: any) => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                  Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
};

export default Footer;