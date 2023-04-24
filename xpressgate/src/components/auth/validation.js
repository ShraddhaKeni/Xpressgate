import { Email } from "@mui/icons-material";
import validator from "validator";


export const validatePassword = async (password) => {
    try {
        if (validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return true
        }
        else {

            return false
        }
    } catch (error) {
        console.log(error)
    }
}


export const otpValidation = async (otp) => {
    try {
        if (validator.isLength(otp, { min: 4, max: 4 })) {
            if (validator.isNumeric(otp, { no_symbols: true }))
                return true
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}


export const mobileValidation = async (mob) => {
    try {
        if (validator.isMobilePhone(mob)) {
            if (validator.isLength(mob, { min: 10, max: 10 }))
                return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

export const passcodeValidation = async (passcode) => {
    try {
       
        if (validator.isNumeric((passcode.toString()))) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

export const emailValidation = (values) => {

    try {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (regEx.test(values)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

