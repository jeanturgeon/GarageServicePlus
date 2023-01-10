import { useState, useRef, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAllClients, getAptById, getServiceTypesByAptId } from "../../util/routes";
import SearchPhoneField from "../../components/Appointment/SearchPhoneField";
import VehicleDropdown from "../../components/Appointment/VehicleDropdown";
import KilometerField from "../../components/Appointment/KilometerField";
import ServiceTypesDropdown from "../../components/Appointment/ServiceTypesDropdown";
import DurationField from "../../components/Appointment/DurationField";
import DescriptionField from "../../components/Appointment/DescriptionField";
import StartTimeField from "../../components/Appointment/StartTimeField";
import MechanicDropdown from "../../components/Appointment/MechanicDropdown";
import AppointmentsByDate from "../../components/Appointment/AppointmentsByDate";
import { convertToMinutes, calculateEndTime } from "../../util/helper";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

export default function UpdateAppointment() {
  const clients = useLoaderData();
  const [showUpdateAptSpinner, setShowUpdateAptSpinner] = useState(true);
  const [enteredNumber, setEnteredNumber] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("0");
  const [clientName, setClientName] = useState("");
  const [showOtherFields, setShowOtherFields] = useState(true);
  const [clientVehicles, setClientVehicles] = useState([]);
  const [hasVehicles, setHasVehicles] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState("0");
  const [previousKms, setPreviousKms] = useState("0");
  const [newKms, setNewKms] = useState("0");
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [suggestedDuration, setSuggestedDuration] = useState("00:00");
  const [chosenDuration, setChosenDuration] = useState("0");
  const [gapMessage, setGapMessage] = useState("");
  const [showGapAlert, setShowGapAlert] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showMechanicAlert, setShowMechanicAlert] = useState(false);
  const todaysDate = new Date().toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [showServiceTypeAlert, setShowServiceTypeAlert] = useState(false);
  const [existingAptServiceTypesIds, setExistingAptServiceTypesIds] = useState([]);
  const [existingAptEmployeeId, setExistingAptEmployeeId] = useState("0");
  const [showPastDateAlert, setShowPastDateAlert] = useState(false);
  const navigate = useNavigate();
  const descriptionInputRef = useRef("");
  const startTimeInputRef = useRef();
  const { idRendezVous } = useParams();

  useEffect(() => {
    getAptById(idRendezVous)
      .then((response) => {
        setSelectedClientId(response[0].idClient);
        setEnteredNumber(response[0].telephone);
        setClientName(response[0].prenom + " " + response[0].nom);
        setSelectedVehicleId(response[0].idVehiculeClient);
        setChosenDuration(response[0].dureeTotal);
        document.getElementById('aptDescription').value = response[0].description;
        setSelectedDate(response[0].date.slice(0, 10));
        document.getElementById('aptDate').value = response[0].date.slice(0, 10);
        document.getElementById('aptStartTime').value = response[0].heure.slice(0, 5);
        setExistingAptEmployeeId(response[0].idEmploye);
      })
      .catch(error => {
        alert(error);
      });

    getServiceTypesByAptId(idRendezVous)
      .then((response) => {
        let existingAptServiceTypeIds = [];
        response.map(serviceType => existingAptServiceTypeIds.push(serviceType.idTypeService));
        setExistingAptServiceTypesIds(existingAptServiceTypeIds);
      })
      .catch(error => {
        alert(error);
      });

  }, [idRendezVous]);

  setTimeout(() => { setShowUpdateAptSpinner(false) }, 3100);

  // Activer le message d'alerte si l'écart entre la durée choisie et la durée suggérée dépasse un certain pourcentage, ce qui est vérifié quand l'utilisateur modifie les types de service ou la durée choisie
  function notifyIfBigGap() {
    let chosenTotal = chosenDuration;
    let suggestedTotal = convertToMinutes(suggestedDuration);
    let difference = chosenTotal - suggestedTotal;
    if (isNaN(difference)) {
      setGapMessage(
        "*** Veuillez vous assurer de remplir les deux champs : heures et minutes. ***"
      );
    } else {
      setGapMessage(difference + " minutes");
    }
    Math.abs(difference) / suggestedTotal > 0.25
      ? setShowGapAlert(true)
      : setShowGapAlert(false);
  }

  useEffect(() => {
    notifyIfBigGap()
  }, [suggestedDuration, chosenDuration]);

  // Fonction exécutée au clic du bouton Enregistrer
  function updateAppointment(event) {
    event.preventDefault();

    if (selectedMechanic === null && selectedServiceTypes.length < 1) {
      setShowMechanicAlert(true);
      setShowServiceTypeAlert(true);
    }
    else if (selectedMechanic === null) {
      setShowMechanicAlert(true);
      setShowServiceTypeAlert(false);
    }
    else if (selectedServiceTypes.length < 1) {
      setShowServiceTypeAlert(true);
      setShowMechanicAlert(false);
    }
    else {
      setShowMechanicAlert(false);
      setShowServiceTypeAlert(false);
      let urlUpdateAppointment = "http://localhost:4000/api/rendezVous/updateRendezVous/" + idRendezVous;
      let urlUpdateScheduleAppointment = "http://localhost:4000/api/rendezVous/updateHoraireRendezVous/" + idRendezVous;
      let urlDeleteServiceType = "http://localhost:4000/api/rendezVous/deleteTypeServiceRendezVous";
      let urlAddServiceType = "http://localhost:4000/api/rendezVous/addTypeServiceByIdRendezVous";
      let urlUpdateKms = "http://localhost:4000/api/rendezVous/updateKMClient/" + selectedVehicleId;

      let updatedAppointmentData = {
        date: selectedDate,
        heure: startTimeInputRef.current.value,
        description: descriptionInputRef.current.value,
        dureeTotal: chosenDuration,
        idClient: selectedClientId,
        idVehiculeClient: selectedVehicleId
      };

      let endTime = calculateEndTime(startTimeInputRef.current.value, chosenDuration)

      let updatedScheduleAppointmentData = {
        heureFin: endTime,
        idPlageDisponibilite: selectedMechanic.shiftId
      };

      let updatedAptServiceTypesIds = [];
      selectedServiceTypes.map(selectedServiceType => updatedAptServiceTypesIds.push(selectedServiceType.value));
      let serviceTypesIdsToRemove = [];
      let serviceTypesIdsToAdd = [];

      // Déterminer quels types de service ont été retirés par l'utilisateur
      existingAptServiceTypesIds.forEach(existingAptServiceTypesId => {
        if (!updatedAptServiceTypesIds.includes(existingAptServiceTypesId)) {
          serviceTypesIdsToRemove.push(existingAptServiceTypesId);
        }
      });

      // Déterminer quels types de service ont été ajoutés par l'utilisateur
      updatedAptServiceTypesIds.forEach(updatedAptServiceTypesId => {
        if (!existingAptServiceTypesIds.includes(updatedAptServiceTypesId)) {
          serviceTypesIdsToAdd.push(updatedAptServiceTypesId);
        }
      });

      let newKmsData = {
        kilometrage: newKms
      };

      let updateAppointmentOK = false;
      let updateScheduleAppointmentOK = false;
      let deleteServiceTypesOK = true;
      let addServiceTypesOK = true;
      let updateKmsOK = true;
      axios.all([
        axios.put(urlUpdateAppointment, updatedAppointmentData)
          .then(response => {
            if (response.data.affectedRows > 0) {
              updateAppointmentOK = true;
            }
          }),
        axios.put(urlUpdateScheduleAppointment, {
          ...updatedScheduleAppointmentData,
          idRendezVous: idRendezVous
        })
          .then(response => {
            if (response.data.affectedRows > 0) {
              updateScheduleAppointmentOK = true;
            }
          }),
        serviceTypesIdsToRemove.length > 0 ? serviceTypesIdsToRemove.forEach((serviceType) => {
          axios.delete(urlDeleteServiceType, {
            data: {
              idTypeService: serviceType,
              idRendezVous: idRendezVous
            }
          })
            .then(response => {
              if (parseInt(response.data.affectedRows) === 0) {
                deleteServiceTypesOK = false;
              }
            })
          // .then(response => {alert("deleted idTypeService : " + serviceType + " - idRdV : " + idRendezVous + " - affectedRows : " + response.data.affectedRows)})
        }) : undefined,
        serviceTypesIdsToAdd.length > 0 ? serviceTypesIdsToAdd.forEach((serviceType) => {
          axios.post(urlAddServiceType, {
            idTypeService: serviceType,
            idRendezVous: idRendezVous
          })
            .then(response => {
              if (parseInt(response.data.affectedRows) === 0) {
                addServiceTypesOK = false;
              }
            })
          // .then(response => {alert("added idTypeService : " + serviceType + " - idRdV : " + idRendezVous + " - affectedRows : " + response.data.affectedRows)})
        }) : undefined,
        parseInt(newKms) !== parseInt(previousKms) ?
          axios.put(urlUpdateKms, newKmsData)
            .then(response => {
              if (parseInt(response.data.affectedRows) === 0) {
                updateKmsOK = false;
              }
            })
          : undefined
      ])
        .then(response => {
          if (updateAppointmentOK && updateScheduleAppointmentOK && deleteServiceTypesOK && addServiceTypesOK && updateKmsOK) {
            alert("Rendez-vous modifié avec succès!");
            navigate("/");
          }
          else {
            // console.log(updateAppointmentOK);
            // console.log(updateScheduleAppointmentOK);
            // console.log(deleteServiceTypesOK);
            // console.log(addServiceTypesOK);
            // console.log(updateKmsOK);
            alert("Un problème est survenu lors de la modification du rendez-vous.");
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  // Fonction exécutée au clic du bouton Annuler
  function handleCancelButtonClick() {
    let answer = window.confirm(
      "Veuillez cliquer sur OK pour confirmer l'annulation. Toutes les données saisies seront perdues."
    );
    if (answer) {
      navigate("/");
    }
  }

  const handleGetAppointmentsByDate = (event) => {
    setSelectedDate(event.target.value);
    setSelectedMechanic(null);
    if (event.target.value < todaysDate) {
      setShowPastDateAlert(true);
    }
    else {
      setShowPastDateAlert(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={5}>
          <h1 className="mb-3">Modifier le rendez-vous</h1>
          <div style={{ display: showUpdateAptSpinner ? "block" : "none" }}>
            <Spinner animation="border" />
          </div>
          <form onSubmit={updateAppointment}>
            {/* Téléphone */}
            <div className="mb-4">
              <SearchPhoneField
                clients={clients}
                clientName={clientName}
                enteredNumber={enteredNumber}
                selectedClientId={selectedClientId}
                selectedVehicleId={selectedVehicleId}
                setClientName={setClientName}
                setClientVehicles={setClientVehicles}
                setEnteredNumber={setEnteredNumber}
                setHasVehicles={setHasVehicles}
                setNewKms={setNewKms}
                setPreviousKms={setPreviousKms}
                setSelectedClientId={setSelectedClientId}
                setSelectedVehicleId={setSelectedVehicleId}
                setShowOtherFields={setShowOtherFields}
                autofocus={false}
              />
            </div>
            <div style={{ display: showOtherFields ? "block" : "none" }}>
              {/* Nom */}
              <div className="mb-4">Nom du client : {clientName}</div>
              {/* Véhicule */}
              <div className="mb-4">
                <label>
                  Véhicule du client : &nbsp;
                </label>
                {!hasVehicles ? (
                  <span>Aucun véhicule</span>
                ) : (
                  <VehicleDropdown
                    clientVehicles={clientVehicles}
                    selectedVehicleId={selectedVehicleId}
                    setNewKms={setNewKms}
                    setPreviousKms={setPreviousKms}
                    setSelectedVehicleId={setSelectedVehicleId}
                  />
                )}
              </div>
              {/* Kilométrage */}
              <div className="mb-4">
                <label>Kilométrage : &nbsp;</label>
                <KilometerField
                  newKms={newKms}
                  previousKms={previousKms}
                  setNewKms={setNewKms}
                />
              </div>
              {/* Types de service */}
              <div className="mb-4 w-100">
                <label>Types de service : &nbsp;</label>
                <ServiceTypesDropdown
                  existingAptServiceTypesIds={existingAptServiceTypesIds}
                  notifyIfBigGap={notifyIfBigGap}
                  selectedServiceTypes={selectedServiceTypes}
                  setSelectedServiceTypes={setSelectedServiceTypes}
                  setSuggestedDuration={setSuggestedDuration}
                />
                <div
                  style={{
                    display: showServiceTypeAlert ? "block" : "none",
                    color: "#EF8275",
                  }}
                >
                  Veuillez choisir au moins un type de service.
                </div>
              </div>
              {/* Durée */}
              <div className="mb-4">
                Durée suggérée : &nbsp; {suggestedDuration} <br />
                <label htmlFor="aptDuration">Durée choisie : &nbsp;</label>
                <DurationField
                  chosenDuration={chosenDuration}
                  notifyIfBigGap={notifyIfBigGap}
                  setChosenDuration={setChosenDuration}
                  suggestedDuration={suggestedDuration}
                  gapMessage={gapMessage}
                  showGapAlert={showGapAlert}
                />
              </div>
              {/* Description */}
              <div className="mb-4">
                <label htmlFor="aptDescription">
                  Description des services requis : &nbsp;
                </label>{" "}
                <br />
                <DescriptionField
                  descriptionInputRef={descriptionInputRef}
                />
              </div>
              {/* Date */}
              <label className="me-3" htmlFor="aptDate">
                Date
              </label>
              <input
                id="aptDate"
                className="mb-3"
                type="date"
                name="selectedDate"
                onChange={handleGetAppointmentsByDate}
                required
              />
              <div
                style={{
                  display: showPastDateAlert ? "block" : "none",
                  color: "#EF8275",
                }}
              >
                Attention : La date choisie est antérieure à la date d'aujourd'hui.
              </div>
              {/* Heure */}
              <div className="mb-4">
                <label htmlFor="aptStartTime">Heure de début : &nbsp;</label>
                <StartTimeField
                  startTimeInputRef={startTimeInputRef}
                />
              </div>
              {/* Mécanicien */}
              <div className="mb-4 w-50">
                <label>Mécanicien·ne : &nbsp;</label>
                <MechanicDropdown
                  date={selectedDate}
                  existingAptEmployeeId={existingAptEmployeeId}
                  selectedMechanic={selectedMechanic}
                  setSelectedMechanic={setSelectedMechanic}
                />
                <div
                  style={{
                    display: showMechanicAlert ? "block" : "none",
                    color: "#EF8275",
                  }}
                >
                  Veuillez choisir un mécanicien.
                </div>
              </div>
              <div className="mb-4">
                {/* Bouton Enregistrer */}
                <button
                  className="button addButton"
                  type="submit"
                  value="Enregistrer"
                >
                  Enregistrer
                </button>
                {/* Bouton Annuler */}
                <input
                  className="button"
                  type="button"
                  value="Annuler"
                  onClick={handleCancelButtonClick}
                />
              </div>
            </div>
          </form>
        </Col>
        <Col md={7}>
          {/* Scheduler */}
          <AppointmentsByDate selectedDate={selectedDate} />
        </Col>
      </Row>
      <Row>
        {/* PANNEAU DE VÉRIFICATION RÉSERVÉ AUX DÉVELOPPEURS */}
        {/* <div style={{ color: "goldenrod" }}>
          <br /> Informations à soumettre pour api/rendezVous/addRendezVous
          <br /> Date : {selectedDate}
          <br /> Heure : {startTimeInputRef.current === undefined ? <span>Aucun</span> : startTimeInputRef.current.value}
          <br /> Description : {descriptionInputRef.current.value} [avec useRef]
          <br /> Duree totale : {chosenDuration}
          <br /> id Client : {selectedClientId}
          <br /> id Vehicule : {selectedVehicleId}
          <br /> <br /> Informations à soumettre pour api/rendezVous/updateKMClient/:idVehiculeClient
          <br /> id Vehicule : {selectedVehicleId}
          <br /> Nouveau kilométrage : {newKms}
          <br /> <br /> Informations à soumettre pour api/rendezVous/addHoraireRendezVous
          <br /> id du rendez-vous créé : [obtenu au clic du bouton Enregistrer]
          <br /> Heure de fin : [calculée au clic du bouton Enregistrer]
          <br /> Id plage disponibilite : {selectedMechanic ? selectedMechanic.shiftId : <span>Aucun</span>}
          <br /> Id employe : {selectedMechanic ? selectedMechanic.value : <span>Aucun</span>}
          <br /> <br /> Informations à soumettre pour api/rendezVous/addTypeServiceByIdRendezVous
          <br /> id du rendez-vous créé : [obtenu au clic du bouton Enregistrer]
          <br /> id de chacun des types de service sélectionnés : {selectedServiceTypes ? selectedServiceTypes.map((type, index) => <span key={index}>{type.value} – </span>) : <span>Aucun</span>}
        </div> */}
      </Row>
    </Container>
  );
}

export function loader() {
  return getAllClients();
}