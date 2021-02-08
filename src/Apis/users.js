import axios from 'axios';

export default {
    getCSRF() {
        return axios.get(`${process.env.Backend_URL}/sanctum/csrf-cookie`);
    },
    verifyEmail(id){
        return axios.get(`${process.env.API_URL}/email/verify/${id}`);
    },
    login(loginObj) {
        return axios.post(`${process.env.Backend_URL}/login`, loginObj);
    },
    logout() {
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem("current_user");
        return axios.post(`${process.env.Backend_URL}/logout`);
    },
    getCurrentUser() {
        return axios.get(`${process.env.API_URL}/user`);
    },
    forgetPasswordEmail(emailObj) {
        return axios.post(`${process.env.API_URL}/user/password-reset-email`, emailObj);
    },
    postResetPassword(form) {
        return axios.post(`${process.env.API_URL}/user/reset-password`, form);
    },
    updatePassword(id,form){
        return axios.post(`${process.env.API_URL}/user/update-password/${id}`, form);
    },
    adminUpdatePassword(form){
        return axios.post(`${process.env.API_URL}/user/admin-update-password/${form.id}`, form);
    },
    adminUpdateSeason(form){
        return axios.post(`${process.env.API_URL}/user/admin-update-season/${form.id}`, form);
    },
    requestUsers(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/users/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/users`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/users/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/users`);
        }
    },
    getUserCategories(id){
        return axios.get(`${process.env.API_URL}/user-with-categories/${id}`);        
    },
    getByGenger(gender){
        return axios.get(`${process.env.API_URL}/users?gender=${gender}`);
    },
    PaidUserInLadder(gender,rank_category_id){
        return axios.get(`${process.env.API_URL}/paid-user-in-ladder/${rank_category_id}?gender=${gender}`);
    },
    PaidUserInLadderWithCurrent(gender,rank_category_id){
        return axios.get(`${process.env.API_URL}/paid-user-in-ladder/${rank_category_id}?gender=${gender}&with_current=true`);
    }
}