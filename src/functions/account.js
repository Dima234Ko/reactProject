import { requestAPI } from "./api";

export async function getAllUsers() {
    let data = await requestAPI("GET", "ADMIN/getAllUsers");
    return data;
}