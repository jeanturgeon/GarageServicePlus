import { getDetailsVehicule } from "../../util/routes";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Button, Card, ListGroup } from "react-bootstrap";
import DisableVCButton from "../../components/Vehicule/DisableVCButton"; 

export default function DetailsVehicule() {
  const vehiculeDetailsLoader = useLoaderData();
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="VehiculeDetails">
      <Card>
        <Card.Header as="h3" style={{ background: "#10222E", color: "white" }}>
          Détail du Véhicule
          <DisableVCButton vehiculeDetailsLoader={vehiculeDetailsLoader} />
        </Card.Header>
        {vehiculeDetailsLoader.map((VCDetails) => (
          <Card.Body style={{ background: "#7B9EA8", color: "white" }}>
            <Card.Title as="h4">              
            {VCDetails.nomMarque} {VCDetails.modele} {VCDetails.annee}
            </Card.Title>
            <Card.Text>
              <ListGroup variant="flush">
                <div className="fw-bold">Propriétaire:</div>
                <ListGroup.Item>
                  {" "}
                  {VCDetails.prenom} {VCDetails.nom}
                </ListGroup.Item>
                <div className="fw-bold">Immatriculation:</div>
                <ListGroup.Item>{VCDetails.numeroPlaque}</ListGroup.Item>
                <div className="fw-bold">Kilométrage:</div>
                <ListGroup.Item>{VCDetails.kilometrage} Km</ListGroup.Item>
                <div className="fw-bold">Numéro de Série:</div>
                <ListGroup.Item>{VCDetails.numeroSerie}</ListGroup.Item>
              </ListGroup>
            </Card.Text>
          </Card.Body>
        ))}
        <Card.Footer style={{ background: '#10222E' }}>
          <Button variant="outline-light" onClick={handlePreviousPage}>Retour à la page précédente</Button>
      </Card.Footer>
      </Card>
    </div>
  );
}

export function loader({ params }) {
  const idVehiculeClient = params.idVehiculeClient;
  return getDetailsVehicule(idVehiculeClient);
}
