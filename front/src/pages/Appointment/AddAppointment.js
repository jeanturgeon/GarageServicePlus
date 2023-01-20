import styles from "./appointment.module.css"
import { useState, useRef, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllClients } from "../../util/routes";
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

export default function AddAppointment() {
  const clients = useLoaderData();
  const [enteredNumber, setEnteredNumber] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("0");
  const [clientName, setClientName] = useState("");
  const [showOtherFields, setShowOtherFields] = useState(false);
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
  const [showPastDateAlert, setShowPastDateAlert] = useState(false);
  const navigate = useNavigate();
  const descriptionInputRef = useRef("");
  const startTimeInputRef = useRef();

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
  function addAppointment(event) {
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
      let urlAddAppointment =
        "http://localhost:4000/api/rendezVous/addRendezVous";
      let urlAddScheduleAppointment =
        "http://localhost:4000/api/rendezVous/addHoraireRendezVous";
      let urlAddServiceType =
        "http://localhost:4000/api/rendezVous/addTypeServiceByIdRendezVous";
      let urlUpdateKms =
        "http://localhost:4000/api/rendezVous/updateKMClient/" +
        selectedVehicleId;

      let newAppointmentData = {
        date: selectedDate,
        heure: startTimeInputRef.current.value,
        description: descriptionInputRef.current.value,
        dureeTotal: chosenDuration,
        idClient: selectedClientId,
        idVehiculeClient: selectedVehicleId
      };

      let endTime = calculateEndTime(startTimeInputRef.current.value, chosenDuration)

      let newScheduleAppointmentData = {
        heureFin: endTime,
        idPlageDisponibilite: selectedMechanic.shiftId
      };

      let newKmsData = {
        kilometrage: newKms
      };

      let idNewApt;
      let addAptOK = false;
      let addScheduleAppointmentOK = false;
      let addAllServiceTypesOK = true;
      let updateKmOK = true;
      axios
        .post(urlAddAppointment, newAppointmentData)
        .then((response) => {
          if (response.data.affectedRows > 0) {
            addAptOK = true;
            idNewApt = response.data.insertId;
            return axios.all([
              axios.post(urlAddScheduleAppointment, {
                ...newScheduleAppointmentData,
                idRendezVous: idNewApt,
              })
                .then(response => {
                  if (response.data.affectedRows > 0) {
                    addScheduleAppointmentOK = true;
                  }
                }),
              selectedServiceTypes.forEach((selectedType) => {
                axios.post(urlAddServiceType, {
                  idTypeService: selectedType.value,
                  idRendezVous: idNewApt,
                })
                  .then(response => {
                    if (parseInt(response.data.affectedRows) === 0) {
                      addAllServiceTypesOK = false;
                    }
                  })
              }),
              parseInt(newKms) !== parseInt(previousKms) ?
                axios.put(urlUpdateKms, newKmsData)
                  .then(response => {
                    if (parseInt(response.data.affectedRows) === 0) {
                      updateKmOK = false;
                    }
                  })
                : undefined
            ])
          }
          else {
            alert("Un problème est survenu lors de la création du rendez-vous.")
            return null;
          }
        })
        .then(response => {
          if (addAptOK && addScheduleAppointmentOK && addAllServiceTypesOK && updateKmOK) {
            alert("Rendez-vous créé avec succès!");
            navigate("/nav/home");
          }
          else {
            // console.log(addAptOK);
            // console.log(addScheduleAppointmentOK);
            // console.log(addAllServiceTypesOK);
            // console.log(updateKmOK);
            alert("Un problème est survenu durant la création du rendez-vous.");
          }
        })
        .catch((error) => {
          alert("Erreur : " + error);
        });
    }
  }

  // Fonction exécutée au clic du bouton Annuler
  function handleCancelButtonClick() {
    let answer = window.confirm(
      "Veuillez cliquer sur OK pour confirmer l'annulation. Toutes les données saisies seront perdues."
    );
    if (answer) {
      navigate("/nav/home");
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
          <h1 className="mb-3">Créer un rendez-vous</h1>
          <form onSubmit={addAppointment}>
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
                autofocus={true}
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
                <label>Durée choisie : &nbsp;</label>
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
                <label>
                  Description des services requis : &nbsp;
                </label>{" "}
                <br />
                <DescriptionField
                  descriptionInputRef={descriptionInputRef}
                />
              </div>
              {/* Date */}
              <label className="me-3">
                Date
              </label>
              <input
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
                <label>Heure de début : &nbsp;</label>
                <StartTimeField
                  startTimeInputRef={startTimeInputRef}
                />
              </div>
              {/* Mécanicien */}
              <div className="mb-4 w-50">
                <label>Mécanicien·ne : &nbsp;</label>
                <MechanicDropdown
                  date={selectedDate}
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
          <h6 className={styles['shifts-title']} >Employés à l'horaire le {selectedDate}</h6>
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