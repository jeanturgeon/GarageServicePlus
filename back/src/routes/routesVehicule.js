import con from "../../config.js"; // connection à la DB

// #### les routes pour la section Client ####
const routes = (app) => {
  // #### Liste des véhicule d'un idClient ####
  app.get( "/api/vehicule/getVehiculeClientByIdClient/:idClient",
    (req, resp) => {
      // Aller chercher le idClient
      var idClient = req.params.idClient;

      // connexion à la table et Afficher les informations de idClient demandé
      con.query(
        `SELECT vehiculeClient.idVehiculeClient, vehiculeClient.numeroPlaque, vehiculeClient.kilometrage , 
        vehiculeClient.numeroSerie, vehiculeClient.idModeleVoiture,         
        modeleVoiture.idMarqueVoiture, modeleVoiture.modele, modeleVoiture.annee, marqueVoiture.nomMarque    
         FROM vehiculeClient 
        LEFT JOIN modeleVoiture ON vehiculeClient.idModeleVoiture = modeleVoiture.idModeleVoiture
        LEFT JOIN marqueVoiture ON modeleVoiture.idMarqueVoiture  = marqueVoiture.idMarqueVoiture    
        WHERE idClient = ${idClient} AND estActifVC = 1`,
        (err, result) => {
          if (err) {
            console.log(err);
            resp.send("error in api");
            console.log("error :" + err);
          } else {
            resp.send(result);
            console.log("Vehicule : List of past appointments of a client");
          }
        }
      );
    }
  );

  // #### Liste des véhicule d'un IdVehicule ####
  app.get( "/api/vehicule/getVehiculeClientByIdVC/:idVehiculeClient",
    (req, resp) => {
      // Aller chercher le idVehiculeClient
      var idVehiculeClient = req.params.idVehiculeClient;

      // connexion à la table et Afficher les informations de idClient demandé
      con.query(
        `SELECT 
        vehiculeClient.idVehiculeClient, vehiculeClient.numeroPlaque, vehiculeClient.kilometrage , vehiculeClient.numeroSerie, vehiculeClient.idModeleVoiture, 
        client.prenom, client.nom, client.idClient, 
        modeleVoiture.idMarqueVoiture, modeleVoiture.modele, modeleVoiture.annee, marqueVoiture.nomMarque    
       FROM vehiculeClient  
        LEFT JOIN client ON vehiculeClient.idClient = client.idClient 
        LEFT JOIN modeleVoiture ON vehiculeClient.idModeleVoiture = modeleVoiture.idModeleVoiture
        LEFT JOIN marqueVoiture ON modeleVoiture.idMarqueVoiture  = marqueVoiture.idMarqueVoiture
        WHERE idVehiculeClient = ${idVehiculeClient} AND estActifVC = 1`,
        (err, result) => {
          if (err) {
            console.log(err);
            resp.send("error in api");
            console.log("error :" + err);
          } else {
            resp.send(result);
            console.log("Vehicule : Details of a customer's vehicle");
          }
        }
      );
    }
  );

  // #### Ajouter un VéhiculeClient ####
  app.post("/api/vehicule/addVehiculeClient", (req, resp) => {
    // Aller chercher les données dans le Forms

    var numeroPlaque = req.body.numeroPlaque;
    var numeroSerie = req.body.numeroSerie;
    var kilometrage = req.body.kilometrage;
    var idClient = req.body.idClient;
    var idModeleVoiture = req.body.idModeleVoiture;
    var idTypeVehicule = req.body.idTypeVehicule;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO vehiculeClient (numeroPlaque, numeroSerie, kilometrage, idClient , idModeleVoiture, idTypeVehicule) 
        VALUES ("${numeroPlaque}","${numeroSerie}","${kilometrage}","${idClient}","${idModeleVoiture}","${idTypeVehicule}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send("error in api");
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Vehicule : Vehicle has been added to a customer");
      }
    });
  });

  // #### Désactiver un vehicule client  ####
  app.put("/api/vehicule/deactivateVehiculeClient/:idVehiculeClient",
    (req, resp) => {
      // Aller chercher le idClient
      var idVehiculeClient = req.params.idVehiculeClient;

      // Mettre à jours les donneés dans la table selon le idClient
      let sql = `UPDATE vehiculeClient SET estActifVC = 0 WHERE idVehiculeClient = "${idVehiculeClient}"`;

      // connexion à la table et mettre à jour des informations
      con.query(sql, (err, result) => {
        if (err) {
          resp.send("error in api");
          console.log("error :" + err);
        } else {
          resp.send({...result, msg:
            "VehiculeClient # " +
              idVehiculeClient +
              " has been successfully deactivated"
          });
          console.log("Vehicule : A client has been successfully deactivated");
        }
      });
    }
  );

  // #### Avoir la liste des Type de véhicule  ####
  app.get("/api/vehicule/getTypeVehicule", (req, resp) => {
    con.query("SELECT * FROM typeVehicule", (err, result) => {
      if (err) {
        resp.send("error in api");
      } else {
        resp.send(result);
      }
    });
  });

  // #### Avoir la liste des marque et Modèle de véhicule ####
  app.get("/api/vehicule/getModelCar", (req, resp) => {
    con.query(
      `SELECT 
        modeleVoiture.idModeleVoiture, modeleVoiture.modele, modeleVoiture.annee,  
        marqueVoiture.idMarqueVoiture, marqueVoiture.nomMarque
       FROM modeleVoiture  
        LEFT JOIN marqueVoiture ON modeleVoiture.idMarqueVoiture = modeleVoiture.idMarqueVoiture`,
      (err, result) => {
        if (err) {
          resp.send("error in api");
          console.log("Error" + err);
        } else {
          resp.send(result);
        }
      }
    );
  });

  // #### Moddifier un VéhiculeClient ####
  app.post("/api/vehicule/addVehiculeClient/:idClient", (req, resp) => {
    // Aller chercher les données dans le Forms
    var idClient = req.params.idClient;
    var numeroPlaque = req.body.numeroPlaque;
    var numeroSerie = req.body.numeroSerie;
    var kilometrage = req.body.kilometrage;
    var idModeleVoiture = req.body.idModeleVoiture;
    var idTypeVehicule = req.body.idTypeVehicule;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO vehiculeClient (numeroPlaque, numeroSerie, kilometrage, idClient , idModeleVoiture, idTypeVehicule) 
        VALUES ("${numeroPlaque}","${numeroSerie}","${kilometrage}","${idClient}","${idModeleVoiture}","${idTypeVehicule}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send("error in api");
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Vehicule : Vehicle has been added to a customer");
      }
    });
  });

  // #### Ajouter un VéhiculeClient ####
  app.put("/api/vehicule/updateVehiculeClient/:idVehiculeClient", (req, resp) => {
    // Aller chercher les données dans le Forms

    var idVehiculeClient = req.params.idVehiculeClient;
    var numeroPlaque = req.body.numeroPlaque;
    var numeroSerie = req.body.numeroSerie;
    var kilometrage = req.body.kilometrage;

    // Inserer les donneés dans la table
    let sql = `UPDATE vehiculeClient SET numeroPlaque = "${numeroPlaque}", numeroSerie = "${numeroSerie}", kilometrage = "${kilometrage}"
     WHERE idVehiculeClient = "${idVehiculeClient}"`;     

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send("error in api");
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Vehicule : Vehicle has been updated");
      }
    });
  });
};

export default routes;
