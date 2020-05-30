import axios from 'axios'

// export function postNewNote(incidentID, author, note){
//     axios.post('http://127.0.0.1/api/note/new',  {
//         'incidentID': incidentID,
//         'author': author,
//         'text': note
//     }, {
//         headers: {
//             'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
//             'Access-Control-Allow-Origin': '*'
//         }
//     })
//     .then(res => {
//         //Successfully submitted new note, refresh page to show in table
//         if(res.status === 200){
//             window.location.replace("/incidents")
//         }
//     })
//     .catch(error => {
//         alert(error.response);
//     })
// }
function getUsersIncidents(username, setIncidents){
    axios.get(`http://127.0.0.1/api/account/${username}/incidents`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        setIncidents(res.data);
    })
    .catch(error => {
        if(error.response.status === 422){
            alert("Error " + error.response.status + " - Not logged in");
            window.location.replace("/");
        }
        else {
            alert(error);
        }
    })
}
export default getUsersIncidents