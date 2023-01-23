export const MESSAGES = {
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
    DATA_ERROR: "Somethign went wrong, Try later",
    SUCCESS: "Success!",
}


export const TOAST = {
    DELETE_SUCCESS: { show: true, type: "success", message: MESSAGES.DELETE_SUCCESS },
    UPDATE_SCCESS: { show: true, type: "success", message: MESSAGES.UPDATE_SCCESS },
    ERROR: (message) => { return { show: true, type: "error", message: message || MESSAGES.DATA_ERROR } },
    SUCCESS: (message) => { return { show: true, type: "success", message: message || MESSAGES.SUCCESS } }

}


export const goBackInOneSec = (navigate) => {
    setTimeout(() => {
        navigate(-1);
    }, 1000)
}

export const reloadInOneSec = () => {
    setTimeout(() => {
        window.location.reload()
    }, 1000)

}
