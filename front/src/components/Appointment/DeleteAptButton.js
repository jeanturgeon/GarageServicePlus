import { useNavigate } from "react-router-dom";
import axios from "axios";

import uiStyles from '../UI/uistyles.module.css'
import { IconDelete } from "../UI/icons.styles";

export default function DeleteAptButton(props) {

    const navigate = useNavigate();
    let urlDeleteAppointment = "http://localhost:4000/api/rendezVous/deleteRendezVous/" + props.aptDetails[0].idRendezVous;

    function handleDeleteAptButtonClick() {
        let answer = window.confirm("Veuillez cliquer sur OK pour confirmer la suppression du rendez-vous. Le rendez-vous sera supprimé définitivement.")
        if (answer) {
            axios.delete(urlDeleteAppointment, {})
            .then(response => {
                if (response.data.affectedRows > 0) {
                    alert("Rendez-vous supprimé avec succès!");
                    navigate("/nav/home");
                }
                else {
                    alert("Un problème est survenu lors de la suppression du rendez-vous.");
                }
            })
        }
    }

    return (
        <button
            className={uiStyles.deleteButton}
            type="button"
            value="Supprimer le rendez-vous"
            onClick={handleDeleteAptButtonClick}>
            <IconDelete />
        </button>
    )
}