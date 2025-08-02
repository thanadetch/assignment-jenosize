import {AppBar, Toolbar, Typography} from "@mui/material";

export const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" >
                    Marketing
                </Typography>
            </Toolbar>
        </AppBar>
    );
};