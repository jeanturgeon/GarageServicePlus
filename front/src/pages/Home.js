import AppointmentsByDate from "../components/Appointment/AppointmentsByDate";
import AppointmentList from "../components/Appointment/AppointmentList";
import { useLoaderData } from "react-router-dom"
import styles from './home.module.css'

const today = new Date().toLocaleDateString();
const todayString = `${today.substring(6,11)}-${today.substring(3,5)}-${today.substring(0,2)}`;

export default function Home() {

    const appointments = useLoaderData();    
    const todaysApt = appointments.filter(apt => apt.date.substring(0,10) === todayString)

    return (
        <>
            <h1>Portrait de la journée</h1>
            {todaysApt.length > 0 ? <AppointmentList appointments={todaysApt} />
            :
            <h5>Aucun rendez-vous aujourd'hui</h5>
            }
            
            <AppointmentsByDate selectedDate={todayString} />
        </>
    )

}


