import axios from "axios";


// RENDEZ-VOUS ***********************************
/* Get all */
export async function getApt() {
    const url = 'http://localhost:4000/api/rendezVous/getAllRendezVous';
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get Appointments', status: 500 };
    }
    return response.json();
}

/*Get apt details */
export async function getAptById(idRendezVous) {
    const url = 'http://localhost:4000/api/rendezVous/detailsRendezVous/' + idRendezVous;
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get Appointments', status: 500 };
    }
    return response.json();
}


/*Get apt by date */
export async function getAptByDate(date) {
    const url = 'http://localhost:4000/api/rendezVous/getRDVByDate/' + date;
    const response = await axios.get(url, date)
        .then(response => {
            return response.data;
        })
    return response
}

/*Get shifts by date */
export async function getShiftsByDate(date) {
    const url = 'http://localhost:4000/api/rendezVous/getDispoByShiftDate/' + date;
    const response = await axios.get(url, date)
        .then(response => {
            return response.data;
        })
    return response;
}

/*Get service types by apt */
export async function getServiceTypesByAptId(idRendezVous) {
    const url = 'http://localhost:4000/api/rendezVous/getTypesServiceByIdRendezVous/' + idRendezVous;
    const response = await axios.get(url)
        .then(response => {
            return response.data;
        })
    return response;
}


// CLIENTS  ***********************************
/* Get all clients */
export async function getAllClients() {
    const url = 'http://localhost:4000/api/client/getAllClient';
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get Clients', status: 500 };
    }
    return response.json();
}

export async function addClient(body) {
    const url = "http://localhost:4000/api/client/addClient";
    let response = await axios.post(url, body)
        .then(response => {
            return response.statusText
        })
        .catch(error => console.log(error));
    return response;
}

export async function getClientById(idClient) {
    const url = 'http://localhost:4000/api/client/getClientById/' + idClient;
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get Client details', status: 500 };
    }
    return response.json();

}

export async function updateClient(body, idClient) {
    const url = "http://localhost:4000/api/client/modifyClient/" + idClient;
    const response = await axios.put(url, body)
        .then(response => {        
            return response.data.affectedRows
        })
        .catch(error => console.log(error));
    return response;
}

export async function deactivateClient(idClient) {
    const url = "http://localhost:4000/api/client/deactivatClient/" + idClient;
    const response = await axios.put(url)
        .then(response => {        
            return response.data.affectedRows
        })
        .catch(error => console.log(error));
    return response;
}

export async function getRDVByIdClient(idClient) {
    const url = 'http://localhost:4000/api/client/getRDVByIdClient/' + idClient;
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get past appointment', status: 500 };
    }
    return response.json();
}

// VEHICULES ***********************************

/* Get Vehicule Client by idVehiculeClient */
export async function getDetailsVehicule(vehiculeID) {
    const url = 'http://localhost:4000/api/vehicule/getVehiculeClientByIdVC/' + vehiculeID;
    const response = await fetch(url);
    if (!response.ok) {
        throw { message: 'failed to get VehiculeClient for this IdVehiculeClient', status: 500 };
    }
    return response.json();
}

/* Get la liste des Types de Véhicule */
export async function getTypeVehicule() {
    const url = 'http://localhost:4000/api/vehicule/getTypeVehicule';
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get list car type', status: 500 };
    }
    return response.json();
}

/* Get la liste des Marque et Modèle de véhicule */
export async function getModelCar() {
    const url = 'http://localhost:4000/api/vehicule/getModelCar';
    const response = await fetch(url)
    if (!response.ok) {
        throw { message: 'Failed to get list of model car', status: 500 };
    }
    return response.json();
}



/* Get les véhicules par client */
export async function getVehiculeByClient(idClient) {
    const url = 'http://localhost:4000/api/vehicule/getVehiculeClientByIdClient/' + idClient;
    const response = await axios.get(url)
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error));

    return response;
}



export async function addVehiculeClient(body) {
    const url = "http://localhost:4000/api/vehicule/addVehiculeClient";
    let response = await axios.post(url, body)
        .then(response => {
            return response.statusText
        })
        .catch(error => console.log(error));
    return response;
}



export async function UpdateVehiculeClient(body, idVehiculeClient) {
    const url= "http://localhost:4000/api/vehicule/updateVehiculeClient/" + idVehiculeClient;    
    const response = await axios.put(url, body)
        .then(response => {
            console.table(response.data.affectedRows);
            return response.data.affectedRows
        })
        .catch(error => console.log(error));
    return response;
}


// EMPLOYES ***********************************
