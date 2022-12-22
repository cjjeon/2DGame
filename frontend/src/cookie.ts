import {v4 as uuidv4} from 'uuid';

function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const getFootprintCookie = () => {
    let footprint = getCookie('footprint')
    if (!footprint) {
        footprint = uuidv4()
    }
    setCookie('footprint', footprint, 30)
    return footprint
}


export default {
    getFootprintCookie
}