import { useContext } from "react";
import { AuthContext } from "../util/auth.context";
import { useLoaderData } from "react-router-dom"

import AppointmentsByDate from "../components/Appointment/AppointmentsByDate";
import AppointmentList from "../components/Appointment/AppointmentList";

const today = new Date().toLocaleDateString();
const todayString = `${today.substring(6,11)}-${today.substring(3,5)}-${today.substring(0,2)}`;

export default function Home() {
    const {employeeId, isAdmin} = useContext(AuthContext)

    const appointments = useLoaderData();    
    const todaysApt = appointments.filter(apt => apt.date.substring(0,10) === todayString);
    const todaysAptbyEmployee = todaysApt.filter(apt => apt.idEmploye === employeeId);


    return (
        <>
            <h1>Portrait de la journée</h1>
           {
            isAdmin ? (
                todaysApt.length > 0 ? <AppointmentList appointments={todaysApt} />
            :
            <h5>Aucun rendez-vous aujourd'hui</h5>
            ) : (
                todaysAptbyEmployee.length > 0 ? <AppointmentList appointments={todaysAptbyEmployee} />
            :
            <h5>Aucun rendez-vous aujourd'hui</h5>

            )
           }  

            <h5 className="mt-4">Employés à l'horaire aujourd'hui:</h5>
            <AppointmentsByDate selectedDate={todayString} />
        </>
    )

}


