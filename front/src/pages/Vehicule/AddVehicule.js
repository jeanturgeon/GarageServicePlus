import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import TypeVehiculeDropdown from "../../components/Vehicule/TypeVehiculeDropdown";
import ModelCarDropdown from "../../components/Vehicule/ModelCarDropdown";


export default function AddVehiculeClient() {
  const [numeroPlaque, setNumeroPlaque] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [kilometrage, setKilometrage] = useState("");
  const [selectedTypeVehicule, setSelectedTypeVehicule] = useState("");
  const [selectedModelCar, setSelectedModelCar] = useState("");
  const [clientName, setClientName] = useState("");
  const params = useParams();
  const [clientId] = useState(params.idClient);

  const navigate = useNavigate();
  const changeNumeroPlaque = (event) => {
    setNumeroPlaque(event.target.value);
  };

  const changeNumeroSerie = (event) => {
    setNumeroSerie(event.target.value);
  };

  const changeKilometrage = (event) => {
    setKilometrage(event.target.value);
  };

  // Aller chercher les informations du client (prénom et nom)
  useEffect(() => {
      axios
        .get(`http://localhost:4000/api/client/getClientById/${clientId}`)
        .then((res) => {
          console.log(res);
          setClientName(res.data[0])
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  function handleOnSubmit(event) {
    event.preventDefault();

    let urlAddVehicule = "http://localhost:4000/api/vehicule/addVehiculeClient";

    const newVehicule = {
      numeroPlaque: numeroPlaque,
      numeroSerie: numeroSerie,
      kilometrage: kilometrage,
      idClient: params.idClient,
      idModeleVoiture: selectedModelCar.value,
      idTypeVehicule: selectedTypeVehicule.value,
    };

    axios
      .post(urlAddVehicule, newVehicule)
      .then((res) => {
        console.log(res.data) ; 
      })
      .catch((error) => {
        console.log(error);
      });
      navigate(-1);  // se rendre à la page du client après le submit

  }

  return (
    <Container className="containerAddVehicule" style={{ background: "#7B9EA8", color: "white" }}>
      <h1 className="mb-3 h1AddVehicule" style={{ background: "#10222E", color: "white" }}>Créer un véhicule </h1>
      <Row className="rowAddVehicule">
          <form onSubmit={handleOnSubmit}>
            <div className="mb-2">
              Propriétaire : <strong>{clientName.prenom} {clientName.nom} </strong>
            </div>
            <br />
            <div className="mb-2">
              <label>Modèle Véhicule : </label>
              <ModelCarDropdown
                selectedModelCar={selectedModelCar}
                setSelectedModelCar={setSelectedModelCar}
              />
            </div>
            <br />
            <div className="mb-2">
              <label>Type de Véhicule : </label>
              <TypeVehiculeDropdown
                selectedTypeVehicule={selectedTypeVehicule}
                setSelectedTypeVehicule={setSelectedTypeVehicule}
              />
            </div>
            <br />
            <div className="mb-2">
              <label>Numéro de Série : </label>
              <br />
              <input
                type="text"
                minLength="16"
                maxLength="16"
                className="inputAddVehicule"
                value={numeroSerie}
                onChange={changeNumeroSerie}
              />
            </div>
            <br />
            <div className="mb-2">
              <label>Immatriculation : </label>
              <br />
              <input
                type="text"
                minLength="1"
                maxLength="7"
                className="inputAddVehicule"
                value={numeroPlaque}
                onChange={changeNumeroPlaque}
              />
            </div>
            <br />
            <div className="mb-2">
              <label>Kilométrage : </label>
              <br />
              <input
                type="number"
                min="1"
                className="inputAddVehicule"
                value={kilometrage}
                onChange={changeKilometrage}
              />
            </div>
            <br />
            <button type="submit" className="button addButtonVehicule">
              Enregistrer
            </button>
          </form>
      </Row>
    </Container>
  );
}
