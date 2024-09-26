import React, {ReactNode} from 'react'
import {Grid} from "@mui/material";
interface CenterProps {
    children: ReactNode;
}
export default function Center({ children }: CenterProps){
    return(
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight:'100vh'}}>
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )
}
