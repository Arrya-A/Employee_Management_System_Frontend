import commonAPI from "./commonAPI";
import serverUrl from "./serverURL";

export const uploadDataAPI = async (uploadData) => {
    return await commonAPI("POST", `${serverUrl}/allEmployees`, uploadData)
}

export const getDataAPI = async () => {
    return await commonAPI("GET", `${serverUrl}/allEmployees`)
}

export const removeDataAPI = async (id) => {
    return await commonAPI("DELETE", `${serverUrl}/allEmployees/${id}`,{})
}
