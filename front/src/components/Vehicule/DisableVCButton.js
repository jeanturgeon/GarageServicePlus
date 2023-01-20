import { useNavigate } from "react-router-dom";
import axios from "axios";
import uiStyles from '../UI/uistyles.module.css'
import { IconDelete } from "../UI/icons.styles";

export default function DisableVCButton(props) {

    const navigate = useNavigate();
    let urlDesactivateVC = "http://localhost:4000/api/vehicule/deactivateVehiculeClient/" + props.vehiculeDetailsLoader[0].idVehiculeClient;

    function handleDisableVCButtonClick() {
        let answer = window.confirm("Veuillez cliquer sur OK pour confirmer la désactivation de ce véhicule. Cette action sera définitive.")
        if (answer) {
            axios.put(urlDesactivateVC, {})
            .then(response => {
                if (response.data.affectedRows > 0) {
                    alert("Véhicule désactivé avec succès!");
                    navigate(-1);
                }
                else {
                    alert("Un problème est survenu lors de la désactivation du véhicule.");
                }
            })
        }
    }

    return (
        <button
            className={uiStyles.deleteButton}
            type="button"
            value="Désactiver un véhicule"
            onClick={handleDisableVCButtonClick}>
            <IconDelete />
        </button>
    )
}