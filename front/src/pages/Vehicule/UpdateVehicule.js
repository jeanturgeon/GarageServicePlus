import { useLoaderData, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { getDetailsVehicule, UpdateVehiculeClient } from "../../util/routes";
import { Container, Row } from "react-bootstrap";

export default function UpdateVehicule() {
  const vehiculeUpdate = useLoaderData();

  const vehiculeData = {
    idVehiculeClient: vehiculeUpdate[0].idVehiculeClient,
    numeroPlaque: vehiculeUpdate[0].numeroPlaque,
    numeroSerie: vehiculeUpdate[0].numeroSerie,
    kilometrage: vehiculeUpdate[0].kilometrage,
  };

  const navigate = useNavigate();

  const formData = {
    inputNumeroPlaque: useRef(),
    inputNumeroSerie: useRef(),
    inputKilometrage: useRef(),
  };

  const validateFormData = (event) => {
    event.preventDefault();
    const dataObj = {
      numeroPlaque: formData.inputNumeroPlaque.current.value,
      numeroSerie: formData.inputNumeroSerie.current.value,
      kilometrage: formData.inputKilometrage.current.value,
    };

    UpdateVehiculeClient(dataObj, vehiculeData.idVehiculeClient).then(
      (response) => {
        if (response === 1) {
          navigate(-1);
        } else {
          alert("Une erreur est survenue!");
        }
      }
    );
  };

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
    <Container className="containerAddVehicule" style={{ background: "#7B9EA8", color: "white" }}>
      <h1 className="mb-3 h1AddVehicule" style={{ background: "#10222E", color: "white" }}>Modifier un véhicule </h1>
      <Row className="rowAddVehicule">
        
      <form onSubmit={validateFormData}>
        {/*Immatriculation*/}
        <div className="row mb-5">
          <label htmlFor="numeroPlaque" className="col-2 col-form-label">
            Immatriculation:<span className="required-field">*</span>
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              id="numeroPlaque"
              ref={formData.inputNumeroPlaque}
              defaultValue={vehiculeData.numeroPlaque}
              required
            />
          </div>
        </div>
        {/* Numéro de Série*/}
        <div className="row mb-5">
          <label htmlFor="numeroSerie" className="col-2 col-form-label">
            Numéro de Série:<span className="required-field">*</span>
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              id="numeroSerie"
              ref={formData.inputNumeroSerie}
              defaultValue={vehiculeData.numeroSerie}
              required
            />
          </div>
        </div>
        {/* Kilometrage*/}
        <div className="row mb-5">
          <label htmlFor="kilometrage" className="col-2 col-form-label">
            Kilometrage:<span className="required-field">*</span>
          </label>
          <div className="col-3">
            <input
              type="number"
              className="form-control"
              id="kilometrage"
              ref={formData.inputKilometrage}
              defaultValue={vehiculeData.kilometrage}
              required
            />
          </div>
        </div>
        {/* boutons */}
        <button className="button" type="submit">
          Enregistrer
        </button>
        <button
          className="button ms-5"
          type="reset"
          onClick={handlePreviousPage}
        >
          Annuler
        </button>
      </form>
      </Row>
    </Container>
    </>
  );
}

export function loader({ params }) {
  const idVehiculeClient = params.idVehiculeClient;
  return getDetailsVehicule(idVehiculeClient);
}
