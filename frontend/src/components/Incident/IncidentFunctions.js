import axios from 'axios'

export async function getUsersIncidents(username){
    return axios.get(`http://127.0.0.1/api/account/${username}/incidents`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => res.data)
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

export async function getMajorIncidents(){
    return axios.get(`http://127.0.0.1/api/incident/major`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => res.data)
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

export function updateIncident(incidentData){
    console.log({
        investigatingDepartmentID: incidentData.investigatingDepartmentID,
        priority: incidentData.priority,
        severity: incidentData.severity,
        impact: incidentData.impact,
        status: incidentData.status,
        timeCompleted: incidentData.timeCompleted
    });
    axios.put(`http://127.0.0.1/api/incident/` + incidentData.incidentID,  {
        investigatingDepartmentID: incidentData.investigatingDepartmentID,
        priority: incidentData.priority,
        severity: incidentData.severity,
        impact: incidentData.impact,
        status: incidentData.status,
        timeCompleted: incidentData.timeCompleted
    }, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        //Successfully submitted new note, refresh page to show in table
        if(res.status === 200){
            window.location.replace("/incidents")
        }
    })
    .catch(error => {
        alert(error.response);
    })
}

export function showNotes(noteID){
    console.log(`Showing notes for: ${noteID}`)
    axios.get(`http://127.0.0.1/api/incident/${noteID}/notes`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        const notes = res.data.data;
        if(notes.length === 0){
            alert("No notes for this incident");
        }
        else {
            var notesLog = "";

            for(var i = 0; i < notes.length; i++){
                notesLog += `[${notes[i].author}]: ${notes[i].text} (${notes[i].date})\n`;
            }

            alert(notesLog);
        }
    })
    .catch(error => console.log(error))
}

export function postNewNote(incidentID, author, note){
    axios.post('http://127.0.0.1/api/note/new',  {
        'incidentID': incidentID,
        'author': author,
        'text': note
    }, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        //Successfully submitted new note, refresh page to show in table
        if(res.status === 200){
            window.location.replace("/incidents")
        }
    })
    .catch(error => {
        alert(error.response);
    })
}

export default { getUsersIncidents, getMajorIncidents, updateIncident, showNotes, postNewNote }