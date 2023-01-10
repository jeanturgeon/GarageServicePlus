import styles from "../../pages/Appointment/appointment.module.css"
import { useState, useEffect } from 'react';
import axios from "axios";

export default function SearchPhoneField(props) {
    const [phoneFieldIsOnFocus, setPhoneFieldIsOnFocus] = useState(false);
    const [matchingClients, setMatchingClients] = useState(props.clients);
    const [showNoVehicleAlert, setShowNoVehicleAlert] = useState(false);

    // Gérer quand le champ du téléphone est on focus
    function handleOnFocus() {
        setPhoneFieldIsOnFocus(true)
    }

    // Gérer quand le champ du téléphone n'est pas on focus
    function handleOnBlur() {
        setTimeout(() => setPhoneFieldIsOnFocus(false), 200);
    }

    // Gérer quand l'utilisateur saisit des chiffres dans le champ du numéro de téléphone
    function handlePhoneNumberFieldChange(event) {
        const { value } = event.target;
        props.setEnteredNumber(value);

        const matches = props.clients.filter(client => client.telephone.startsWith(value));
        setMatchingClients(matches)
    }

    // Mettre à jour les données relatives aux véhicules
    function updateVehicleData(clientId) {
        let urlClientVehicles = "http://localhost:4000/api/rendezVous/getVehiculeByClient/" + clientId;
        axios.get(urlClientVehicles)
            .then((response) => {
                props.setClientVehicles(response.data);
                if (response.data.length > 0) { // Si le client sélectionné a au moins un véhicule
                    setShowNoVehicleAlert(false);
                    props.setHasVehicles(true);
                    props.setShowOtherFields(true);
                    // Si le selectedVehicle est déjà défini dans la bd (rendez-vous existant) et que le client actuellement sélectionné en est le propriétaire, le selectedVehicle du rdv existant est sélectionné dans le dropdown.
                    if (response.data.filter(vehicle => parseInt(vehicle.idVehiculeClient) === parseInt(props.selectedVehicleId)).length > 0) {
                        let existingAptVehicle = response.data.filter(vehicle => parseInt(vehicle.idVehiculeClient) === parseInt(props.selectedVehicleId))[0];
                        props.setPreviousKms(existingAptVehicle.kilometrage);
                        props.setNewKms(existingAptVehicle.kilometrage); 
                    }
                    // Autrement, lorsque le selectedVehicle n'est pas défini dans la bd (nouveau rendez-vous), OU que le selectedVehicle est déjà défini dans la bd mais que le client actuellement sélectionné n'est pas le propriétaire, alors le premier véhicule apparaissant dans le dropdown est sélectionné par défaut comme selectedVehicle.
                    else  {
                        let idFirstVehicle = response.data[0].idVehiculeClient;
                        props.setSelectedVehicleId(idFirstVehicle);
                        let firstVehicleKms = response.data[0].kilometrage;
                        props.setPreviousKms(firstVehicleKms);
                        props.setNewKms(firstVehicleKms); 
                    }
                }
                else { // Si le client sélectionné n'a pas de véhicule
                    setShowNoVehicleAlert(true);
                    props.setHasVehicles(false);
                    props.setShowOtherFields(false);
                    props.setSelectedVehicleId("0");
                    props.setPreviousKms(0);
                    props.setNewKms(0);
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    // Gérer le clic sur un des clients
    function handleClientClick(event) {
        const value = event.currentTarget.getAttribute("value");
        const clientData = value.split(";");
        const clientId = clientData[0];
        const clientPhone = clientData[1];
        const clientFullName = clientData[2];
        props.setSelectedClientId(clientId);
        props.setEnteredNumber(clientPhone);
        props.setClientName(clientFullName);

        updateVehicleData(clientId);
    }

    useEffect(() => {
        if (props.selectedClientId !== "0") {
            updateVehicleData(props.selectedClientId);
        }
    }, [props.selectedClientId]);

    return (
        <>
            <label htmlFor="phoneNumber">Numéro de téléphone : &nbsp;</label>
            <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="ex. : 4186832323"
                value={props.enteredNumber}
                autoFocus={props.autofocus}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChange={handlePhoneNumberFieldChange}
                onClick={handlePhoneNumberFieldChange}
                required
            />
            {/* Liste de clients correspondants aux chiffres saisis */}
            <ul className={styles.ulClients} style={{ display: phoneFieldIsOnFocus ? "block" : "none" }}>
                {
                    matchingClients.length === 0 ?
                        <li className={styles.liClients}>&nbsp;</li> :
                        matchingClients.slice(0, 4).map((client, index) =>
                            <li
                                key={index}
                                className={styles.liClientsPointer}
                                value={client.idClient + ";" + client.telephone + ";" + client.prenom + " " + client.nom}
                                onClick={handleClientClick}
                            >
                                {client.telephone + " – " + client.prenom + " " + client.nom}
                            </li>
                        )
                }
                <li className={styles.liClients}>
                    {
                        matchingClients.length > 4 ?
                            "Et " + (matchingClients.length - 4) + " autre(s) résultat(s) correspondant(s). Veuillez entrer davantage de chiffres." :
                            matchingClients.length + " résultat(s) correspondant(s)"
                    }
                </li>
            </ul>
            {/* Message à afficher si le client sélectionné n'a pas de véhicule */}
            <div style={{ display: showNoVehicleAlert ? "block" : "none", color: "#EF8275" }}>
                    Il n'y a aucun véhicule actif associé au client "{props.clientName}".
            </div>
        </>
    )
}