
import Select from 'react-select';
import axios from "axios";

export default function ModelCarDropdown(props) {
    const options = [];

    let urlModelCar = "http://localhost:4000/api/vehicule/getModelCar";
    axios.get(urlModelCar)
        .then((response) => {
            response.data.map(type => options.push({ value: type.idModeleVoiture, label: type.nomMarque + " " + type.modele + " " + type.annee}));
        })
        .catch(error => {
            alert(error);
        });

    return (
        <>
            <Select
                defaultValue={props.selectedModelCar}
                onChange={props.setSelectedModelCar}
                options={options}
                className="selectAddVehicule"
                placeholder="Choisir un modèle de véhicule"
            />
        </>
    )
}