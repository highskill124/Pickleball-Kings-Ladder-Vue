export function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") == 'true';
}
export function logIn() {
    localStorage.setItem("isLoggedIn", true);
}
export function setCurrentUser(dataObj){
    localStorage.setItem("current_user", JSON.stringify(dataObj));
}
export function getCurrentUser(){
    return JSON.parse(localStorage.getItem("current_user"));
}
export function getCurrentUserId(){
    return (JSON.parse(localStorage.getItem("current_user"))).id;
}
export function loginAdmin() {
    localStorage.setItem("isAdmin", true);
}
export function isloginAdmin() {
    return localStorage.getItem("isAdmin") == 'true';
}

export function logOut() {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
    localStorage.removeItem("current_user");
}