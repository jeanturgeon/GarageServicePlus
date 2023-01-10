import styles from "../../pages/Appointment/appointment.module.css"
import Form from "react-bootstrap/Form";

export default function VehicleDropdown(props) {
  // Gérer le choix du véhicule dans le Select
  function handleVehicleChange(event) {
    props.setSelectedVehicleId(event.target.value);
    let selectedVehicleKms = props.clientVehicles.filter(
      (vehicle) =>
        parseInt(vehicle.idVehiculeClient) === parseInt(event.target.value)
    )[0].kilometrage;
    props.setPreviousKms(selectedVehicleKms);
    props.setNewKms(selectedVehicleKms);
  }

  return (
    <Form.Select
      className={styles.selectVehicles}
      value={props.selectedVehicleId}
      onChange={handleVehicleChange}
    >
      {props.clientVehicles.map((vehicle, index) => (
        <option key={index} value={vehicle.idVehiculeClient}>
          {vehicle.nomMarque +
            " " +
            vehicle.modele +
            " " +
            vehicle.annee +
            " – " +
            vehicle.numeroPlaque}
        </option>
      ))}
    </Form.Select>
  );
}
