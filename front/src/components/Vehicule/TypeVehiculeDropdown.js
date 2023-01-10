import Select from "react-select";
import axios from "axios";

export default function TypeVehiculeDropdown(props) {
  const options = [];

  let urlTypeVehicule = "http://localhost:4000/api/vehicule/getTypeVehicule";
  axios
    .get(urlTypeVehicule)
    .then((response) => {
      response.data.map((type) =>
        options.push({
          value: type.idTypeVehicule,
          label: type.nomTypeVehicule,
        })
      );
    })
    .catch((error) => {
      alert(error);
    });

  return (
    <Select
        defaultValue={props.selectedTypeVehicule}
        onChange={props.setSelectedTypeVehicule}
        options={options}
        className="selectAddVehicule"
        placeholder="Choisir un type de véhicule"
      />
  );
}
