import validator from "validator";


export const validatePassword = async(password)=>{
    try {
        if(validator.isStrongPassword(password,{
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        }))
        {
            return true
        }
        else
        {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}