import React from "react";
import { Slide, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

function TransitionLeft(props) {
    return <Slide {...props} direction="up" />;
}
export const ToastMessage = ({ show, message, type, handleClose }) => {
    return (
        <Snackbar
            open={show || false}
            autoHideDuration={3000}
            key="bottomcenter"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
        >
            <Alert severity={type} sx={{ width: "100%", fontSize: '1.7rem' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};