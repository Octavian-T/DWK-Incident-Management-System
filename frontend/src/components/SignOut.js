// import React from 'react';

function signOut(){
    sessionStorage.clear();
    window.location.replace("/");
}

export default signOut;