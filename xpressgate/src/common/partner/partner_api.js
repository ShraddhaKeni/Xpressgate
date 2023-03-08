import { getRequest, postRequest, putRequest} from "../../common/axios_client";

// Program Management
export async function addProgram(data) {
    try {
        return await postRequest('partner/programs', data);
    } catch (error) {
        return error
    }
    
}

export async function getAllPrograms() {
    try {
        return await getRequest('partner/programs');
    } catch (error) {
        return error
    }
}
export async function getProgramById(id) {
    try {
        return await getRequest(`api/partner/programs/${id}`);
    } catch (error) {
        return error
    }
}
export async function updateProgram(id) {
    try {
        return await putRequest(`api/partner/programs`, id);
    } catch (error) {
        return error
    }
}
export async function deleteProgram(id) {
    try {
        return await postRequest(`api/partner/programs`, { program_id: id });
    } catch (error) {
        return error
    }
}