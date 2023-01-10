import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { getShiftsByDate, getAptByDate } from "../../util/routes";
import styles from '../../pages/Appointment/appointment.module.css'

export default function AppointmentsByDate(props) {
    const [shifts, setShifts] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getShiftsByDate(props.selectedDate)
            .then((response) => {
                setShifts(response);
            })
            .catch(error => {
                alert(error);
            });

        getAptByDate(props.selectedDate)
            .then((response) => {
                setAppointments(response);
            })
            .catch(error => {
                alert(error);
            });
    }, [props.selectedDate]);

    return (
        <>
            {shifts.length > 0 && <h5 className="mt-4">Employés à l'horaire aujourd'hui: </h5>}
            {
                shifts.length > 0 ?
                    shifts.map((shift, index) =>
                        <Card key={index} className={styles["shift-card"]}>
                            <Card.Header className={styles["card-header"]}>
                                {shift.prenomEmploye + " " + shift.nomEmploye}<br />
                                ({shift.hrsDebutJournee.slice(0, 5)} - {shift.hrsFinJournee.slice(0, 5)})
                            </Card.Header>
                            <Card.Subtitle className={styles["card-body"]}>Lunch: {shift.hrsDebutDiner.slice(0, 5) + " - " + shift.hrsFinDiner.slice(0, 5)}</Card.Subtitle>
                            <br />
                            <span className="apt-title">Rendez-vous</span>
                            {appointments.filter(apt => apt.idEmploye === shift.idEmploye).length === 0 ?
                                <i><br />Aucun rendez-vous</i> :
                                appointments.filter(apt => apt.idEmploye === shift.idEmploye).map((apt, index) =>
                                    <Card.Subtitle className={styles["card-body"]} key={index}>{apt.heure.slice(0, 5) + " - " + apt.heureFin.slice(0, 5)}</Card.Subtitle>)}
                        </Card>) :
                    <h5>Aucun employé à l'horaire</h5>
            }
        </>
    )
}