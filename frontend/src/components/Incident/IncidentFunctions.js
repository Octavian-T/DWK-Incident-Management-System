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

export async function getDepartments(){
    return axios.get(`http://127.0.0.1/api/department/all`, {
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

export async function getIncidentPriorityRequests(){
    return axios.get(`http://127.0.0.1//api/incident/request/all`, {
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

export function approveIncidentPriorityRequest(requestID, newPriority, newSeverity, newImpact, approved){
    axios.delete('http://127.0.0.1/api/incident/request/delete',
    {
        data: { 'requestID': requestID, 'newPriority': newPriority, 'newSeverity': newSeverity, 'newImpact': newImpact, 'approved':  approved === "Yes"},
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        //Successfully approved incident
        if(res.status === 200){
            window.location.replace("/incidents")
        }
    })
    .catch(error => {
        alert(error.response);
    })
}

export function postIncidentRequestPriority(incidentID, username, priority, severity, impact, reason){
    axios.post('http://127.0.0.1/api/incident/request/new',  {
        'incidentID': incidentID,
        'username': username,
        'priority': priority,
        'severity': severity,
        'impact': impact,
        'reason': reason
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

export default { getUsersIncidents, getMajorIncidents, postIncidentRequestPriority, approveIncidentPriorityRequest, getDepartments, getIncidentPriorityRequests, updateIncident, showNotes, postNewNote }