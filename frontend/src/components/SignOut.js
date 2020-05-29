function signOut(){
    sessionStorage.clear();
    window.location.replace("/");
}

export default signOut;