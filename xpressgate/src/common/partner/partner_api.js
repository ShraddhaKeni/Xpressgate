import { getRequest, postRequest, putRequest, deleteRequest} from "../../common/axios_client";

// Program Management


export async function getAllPrograms() {
    try {
        return await getRequest('partner/programs');
    } catch (error) {
        return error
    }
}
export async function getProgramById(id) {
    try {
        return await getRequest(`partner/programs/${id}`);
    } catch (error) {
        return error
    }
}
export async function updateProgram(id) {
    try {
        return await putRequest(`partner/programs${id}`);
    } catch (error) {
        return error
    }
}
