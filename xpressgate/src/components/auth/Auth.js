import axios from "axios"

export const checkAdmin = ()=>{
    if (localStorage.getItem('mode')=='admin') {
        return true
    } else {
        return false
    }
}

export const checkSociety =()=>{
    if (localStorage.getItem('mode')=='society') {
       return true
    } else {
        return false
    }
}

export const checkGuard = ()=>{
    if (localStorage.getItem('mode')=='guard') {
        return true
    } else {
        return false
    }
}

export const checkPartner = ()=>{
    if (localStorage.getItem('mode')=='partner') {
        return true
    } else {
        return false
    }
}


export const checkGuardLogin = ()=>{
    
}