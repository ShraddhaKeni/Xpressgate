import { getRequest } from "../axios_client";

export async function fetchUser() {
    try {
        const user = await getRequest('photos');
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}