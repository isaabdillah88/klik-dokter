import Cookies from "js-cookie";

export const setHeaders = () => {
    const header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get("x-klikdokter-token")}`
        }
    }

    return header;
}
