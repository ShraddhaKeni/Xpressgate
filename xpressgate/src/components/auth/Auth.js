export const checkAdmin = ()=>{
    if (localStorage.getItem('mode')=='admin') {
        return true
    } else {
        return false
    }
}

export const checkSociety = ()=>{
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