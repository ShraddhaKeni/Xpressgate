import React from "react";
import { CircularProgress, Slide, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";


export const Loader = ({ children, loading = true }) => {
    return loading === true ? (
        <div className="loading" style={{ width: "100%", height: "100%", marginTop: "10%" }}>
            <CircularProgress />
        </div>
    ) : children;
};
