export {
    isLogged,
    loginUser,
    getUserInfo,
}

import * as supabase from "./supabase.js";
import { createImageBlob } from "./api.js";

function expirationDate(expires_in) { return Math.floor(Date.now() / 1000) + expires_in }

// Is user logged?
function isLogged() {

    if (localStorage.getItem('access_token')) {

        if (localStorage.getItem('expirationDate') > Math.floor(Date.now() / 1000)) {
            return true;
        }
    }

    return false;
}

// Get user info from database
async function getUserInfo() {

    if (isLogged()) {

        let user_id = localStorage.getItem("user_id");
        let access_token = localStorage.getItem("access_token");

        let response = await createImageBlob("profiles", user_id, access_token);

        return response;

    }

}

// User login
async function loginUser(email, password) {

    let status = { status: false };

    try {

        let data = await supabase.loginSupabase(email, password);

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("expirationDate", expirationDate(data.expires_in));

        status.success = true;

    } catch (error) {

        status.success = false;
        status.errorText = error.error_description;

    }

    return status;

}