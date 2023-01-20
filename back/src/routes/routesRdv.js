import con from "../../config.js"; // connection à la DB

let today = new Date();

// #### les routes pour la section Rendez-vous ####
const routes = (app) => {
  // #### Voir la liste des rendez-vous ####
  app.get("/api/rendezVous/getAllRendezVous", (req, resp) => {
    con.query(
      `SELECT rendezVous.idRendezVous, rendezVous.date, rendezVous.heure, rendezVous.description, 
    rendezVous.dureeTotal, rendezVous.idClient, rendezVous.idVehiculeClient, 
    client.prenom, client.nom, client.idClient, 
    vehiculeClient.numeroPlaque, vehiculeClient.idModeleVoiture, 
    modeleVoiture.modele, modeleVoiture.annee, modeleVoiture.idMarqueVoiture,marqueVoiture.nomMarque, 
    employe.nomEmploye, employe.prenomEmploye, employe.idEmploye 

    FROM rendezVous
    LEFT JOIN client ON rendezVous.idClient = client.idClient 
    LEFT JOIN vehiculeClient ON rendezVous.idVehiculeClient = vehiculeClient.idVehiculeClient
    LEFT JOIN modeleVoiture ON vehiculeClient.idModeleVoiture = modeleVoiture.idModeleVoiture
    LEFT JOIN marqueVoiture ON modeleVoiture.idMarqueVoiture  = marqueVoiture.idMarqueVoiture   
    LEFT JOIN HoraireRendezVous ON rendezVous.idRendezVous = HoraireRendezVous.idRendezVous
    LEFT JOIN plageDisponibilite ON HoraireRendezVous.idPlageDisponibilite = plageDisponibilite.idPlageDisponibilite
    LEFT JOIN employe ON plageDisponibilite.idEmploye = employe.idEmploye 
      ORDER BY rendezVous.date  ASC, rendezVous.heure ASC;   
    `,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getAllRendezVous" });
        } else {
          resp.send(result);
          console.log("Rendez-Vous : List displayed successfully");
        }
      }
    );
  });

  // #### Ajouter un rendez-vous ####
  app.post("/api/rendezVous/addRendezVous", (req, resp) => {
    // Aller chercher les données dans le Forms
    var date = req.body.date;
    var heure = req.body.heure;
    var description = req.body.description;
    var dureeTotal = req.body.dureeTotal;
    var idClient = req.body.idClient;
    var idVehiculeClient = req.body.idVehiculeClient;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO rendezVous (date, heure, description, dureeTotal, idClient, idVehiculeClient) VALUES 
    ("${date}", "${heure}", "${description}", "${dureeTotal}", "${idClient}", "${idVehiculeClient}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : addRendezVous" });
      } else {
        resp.send(result);
        console.log("Rendez-Vous : Added with success");
      }
    });
  });

  // #### Modifier un kilometrage dans un véhicule  ####
  app.put("/api/rendezVous/updateKMClient/:idVehiculeClient", (req, resp) => {
    // Aller chercher le idVehiculeClient
    var idVehiculeClient = req.params.idVehiculeClient;
    // Aller chercher les données dans le Forms
    var kilometrage = req.body.kilometrage;

    // Mettre à jours les donneés dans la table selon le idRendezVous
    let sql = `UPDATE vehiculeClient SET kilometrage ="${kilometrage}" WHERE idVehiculeClient = "${idVehiculeClient}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : updateKMClient" });
      } else {
        resp.send(result);
        console.log("Rendez-Vous : KM Updated successfully");
      }
    });
  });

  // #### Supprimer un rendez-vous existant ####
  app.delete("/api/rendezVous/deleteRendezVous/:idRendezVous", (req, resp) => {
    // Aller chercher le idRendezVous
    var idRendezVous = req.params.idRendezVous;

    // Supprimer les informations selon le idRendezVous sélectionné
    let sql = `
    DELETE rendezVous, HoraireRendezVous, TypeService_RendezVous
    FROM TypeService_RendezVous 
    INNER JOIN HoraireRendezVous ON HoraireRendezVous.idRendezVous = TypeService_RendezVous.idRendezVous 
    INNER JOIN rendezVous ON rendezVous.idRendezVous = TypeService_RendezVous.idRendezVous 
    WHERE TypeService_RendezVous.idRendezVous = "${idRendezVous}";`;

    // connexion à la table et supprimer des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : deleteRendezVous" });
      } else {
        resp.send(result);
        console.log("Rendez-Vous : Deleted successfully");
      }
    });
  });

  // #### Voir les détails d'un RendezVous avec un IdRendezVous spécifique
  app.get("/api/rendezVous/detailsRendezVous/:idRendezVous", (req, resp) => {
    // Aller chercher le idRendezVous
    var idRendezVous = req.params.idRendezVous;

    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(
      `SELECT rendezVous.idRendezVous, rendezVous.date, rendezVous.heure, rendezVous.description, 
      rendezVous.dureeTotal, rendezVous.idClient, rendezVous.idVehiculeClient,
      client.prenom, client.nom, client.telephone, client.idClient, 
      vehiculeClient.numeroPlaque, vehiculeClient.idModeleVoiture, vehiculeClient.numeroSerie, vehiculeClient.kilometrage, 
      modeleVoiture.modele, modeleVoiture.annee, modeleVoiture.idMarqueVoiture, marqueVoiture.nomMarque,
      TypeService_RendezVous.idTypeService, GROUP_CONCAT(typeService.nom) AS nomTypeService,
      employe.nomEmploye, employe.prenomEmploye, employe.idEmploye
      
      FROM rendezVous
        LEFT JOIN client ON rendezVous.idClient = client.idClient 
        LEFT JOIN vehiculeClient ON rendezVous.idVehiculeClient = vehiculeClient.idVehiculeClient
        LEFT JOIN modeleVoiture ON vehiculeClient.idModeleVoiture = modeleVoiture.idModeleVoiture
        LEFT JOIN marqueVoiture ON modeleVoiture.idMarqueVoiture = marqueVoiture.idMarqueVoiture
        LEFT JOIN TypeService_RendezVous ON rendezVous.idRendezVous = TypeService_RendezVous.idRendezVous
        LEFT JOIN typeService ON TypeService_RendezVous.idTypeService = typeService.idTypeService
        LEFT JOIN HoraireRendezVous ON rendezVous.idRendezVous = HoraireRendezVous.idRendezVous
        LEFT JOIN plageDisponibilite ON HoraireRendezVous.idPlageDisponibilite = plageDisponibilite.idPlageDisponibilite
        LEFT JOIN employe ON plageDisponibilite.idEmploye = employe.idEmploye
        WHERE rendezVous.idRendezVous = "${idRendezVous}";`,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : detailsRendezVous" });
        } else {
          resp.send(result);
          // console.log("Rendez-Vous : Details display successfully");
        }
      }
    );
  });

  // #### Voir le Prénom & nom & téléphone d'un client filtré avec le  numéro de téléphone
  app.get("/api/rendezVous/nameClientRDV/", (req, resp) => {
    // Aller chercher le telephone
    // var telephone = req.params.telephone;

    // connexion à la table et Afficher les informations de téléphone demandé
    // con.query(`SELECT prenom,nom,telephone FROM client WHERE telephone = "${telephone}"`, (err, result) => {
    con.query(`SELECT prenom,nom,telephone FROM client`, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : nameClientRDV" });
      } else {
        resp.send(result);
        console.log(
          "Rendez-Vous : Customer's first and last name display with success"
        );
      }
    });
  });

  // #### Modifier un rendez-vous existant ####
  app.put("/api/rendezVous/updateRendezVous/:idRendezVous", (req, resp) => {
    // Aller chercher le idRendezVous
    var idRendezVous = req.params.idRendezVous;
    // Aller chercher les données dans le Forms
    var date = req.body.date;
    var heure = req.body.heure;
    var description = req.body.description;
    var dureeTotal = req.body.dureeTotal;
    var idClient = req.body.idClient;
    var idVehiculeClient = req.body.idVehiculeClient;

    // Mettre à jours les donneés dans la table selon le idRendezVous
    let sql = `UPDATE rendezVous 
    SET date ="${date}", heure = "${heure}",  description ="${description}", dureeTotal = "${dureeTotal}", idClient = "${idClient}", idVehiculeClient = "${idVehiculeClient}" 
    WHERE idRendezVous = "${idRendezVous}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : updateRendezVous" });
      } else {
        resp.send(result);
        console.log("Rendez-Vous : Updated successfully");
      }
    });
  });

  // #### Voir la liste des types de service
  app.get("/api/rendezVous/getAllTypeService/", (req, resp) => {
    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(`SELECT * FROM typeService `, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : getAllTypeService" });
      } else {
        resp.send(result);
        console.log("Rendez-Vous : Details display successfully");
      }
    });
  });

  // #### Voir la liste des véhicule par IdClient
  app.get("/api/rendezVous/getVehiculeByClient/:idClient", (req, resp) => {
    // Aller chercher le idRendezVous
    var idClient = req.params.idClient;

    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(
      `SELECT vehiculeClient.idVehiculeClient, vehiculeClient.estActifVC, 
    vehiculeClient.numeroPlaque  ,vehiculeClient.numeroSerie  ,vehiculeClient.kilometrage  ,vehiculeClient.idClient ,
    vehiculeClient.idModeleVoiture  ,vehiculeClient.idTypeVehicule,
    modeleVoiture.modele, modeleVoiture.annee, modeleVoiture.idMarqueVoiture,marqueVoiture.nomMarque,typeVehicule.nomTypeVehicule
     FROM vehiculeClient 
     LEFT JOIN modeleVoiture ON  vehiculeClient.idModeleVoiture = modeleVoiture.idModeleVoiture
     LEFT JOIN marqueVoiture ON  modeleVoiture.idMarqueVoiture  = marqueVoiture.idMarqueVoiture 
     LEFT JOIN typeVehicule  ON  vehiculeClient.idTypeVehicule = typeVehicule.idTypeVehicule 
    WHERE vehiculeClient.idClient = ${idClient} AND vehiculeClient.estActifVC = 1`,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getVehiculeByClient" });
        } else {
          resp.send(result);
          console.log("Rendez-Vous : Details display successfully");
        }
      }
    );
  });

  // #### Voir la liste des rendez vous par IdEmploye
  app.get("/api/rendezVous/getRDVByEmploye/:idEmploye", (req, resp) => {
    // Aller chercher le idRendezVous
    var idEmploye = req.params.idEmploye;

    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(
      `SELECT rendezVous.*, HoraireRendezVous.heureFin FROM rendezVous 
      LEFT JOIN HoraireRendezVous ON rendezVous.idRendezVous = HoraireRendezVous.idRendezVous
      LEFT JOIN plageDisponibilite ON HoraireRendezVous.idPlageDisponibilite = plageDisponibilite.idPlageDisponibilite
      LEFT JOIN employe ON plageDisponibilite.idEmploye = employe.idEmploye WHERE employe.idEmploye = ${idEmploye} 
      ORDER BY rendezVous.date ASC`,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getRDVByEmploye" });
        } else {
          resp.send(result);
          console.log("Rendez-Vous : Details RendezVous display successfully");
        }
      }
    );
  });

  // #### Ajouter un horaireRendezVous
  app.post("/api/rendezVous/addHoraireRendezVous", (req, resp) => {
    // Aller chercher les données dans le Forms
    var heureFin = req.body.heureFin;
    var idRendezVous = req.body.idRendezVous;
    var idPlageDisponibilite = req.body.idPlageDisponibilite;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO HoraireRendezVous (heureFin, idRendezVous, idPlageDisponibilite) VALUES 
    ("${heureFin}", "${idRendezVous}", "${idPlageDisponibilite}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : addHoraireRendezVous" });
      } else {
        resp.send(result);
        console.log("Horaire Rendez-Vous : Added with success");
      }
    });
  });

  // #### Voir la liste des disponibilité par employe
  app.get("/api/rendezVous/getDispoByEmploye/:idEmploye", (req, resp) => {
    // Aller chercher le idEmploye
    var idEmploye = req.params.idEmploye;

    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(
      `SELECT plageDisponibilite.dateDispo, plageDisponibilite.conge, plageDisponibilite.hrsDebutJournee,
    plageDisponibilite.hrsDebutDiner, plageDisponibilite.hrsFinDiner, plageDisponibilite.hrsFinJournee, 
    employe.prenomEmploye, employe.nomEmploye 
    FROM plageDisponibilite      
     LEFT JOIN employe ON plageDisponibilite.idEmploye = employe.idEmploye  
    WHERE plageDisponibilite.idEmploye = "${idEmploye}"`,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getDispoByEmploye" });
        } else {
          resp.send(result);
          console.log("Rendez-Vous : Details display successfully");
        }
      }
    );
  });

  // #### Ajouter un Type de service bu IdRendezVous
  app.post("/api/rendezVous/addTypeServiceByIdRendezVous", (req, resp) => {
    // Aller chercher les données dans le Forms
    var idTypeService = req.body.idTypeService;
    var idRendezVous = req.body.idRendezVous;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO TypeService_RendezVous (idTypeService, idRendezVous) VALUES 
    ("${idTypeService}", "${idRendezVous}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : addTypeServiceByIdRendezVous" });
      } else {
        resp.send(result);
        console.log("TypeService : Added with success");
      }
    });
  });

  // #### Voir la liste des disponibilité par employe
  app.get("/api/rendezVous/getRDVByDate/:dateRDV", (req, resp) => {
    // Aller chercher le date

    var dateRDV = req.params.dateRDV;

    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(
      `SELECT 
      rendezVous.idRendezVous, rendezVous.heure, rendezVous.date,
      HoraireRendezVous.idHoraireRendezVous, HoraireRendezVous.heureFin,
      plageDisponibilite.idPlageDisponibilite,
      employe.idEmploye
    FROM rendezVous       
     LEFT JOIN HoraireRendezVous ON rendezVous.idRendezVous = HoraireRendezVous.idRendezVous 
     LEFT JOIN plageDisponibilite ON HoraireRendezVous.idPlageDisponibilite = plageDisponibilite.idPlageDisponibilite 
     LEFT JOIN employe ON plageDisponibilite.idEmploye = employe.idEmploye 
    WHERE rendezVous.date = "${dateRDV}" 
    
    `,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getRDVByDate" });
        } else {
          resp.send(result);
          console.log("Rendez-Vous : Details display successfully");
        }
      }
    );
  });

  // #### Voir la liste des disponibilité par plageDisponibilité
  app.get("/api/rendezVous/getDispoByShiftDate/:dateDispo", (req, resp) => {
    // Aller chercher le date

    var dateDispo = req.params.dateDispo;
    // connexion à la table et Afficher les informations de idRendezVous demandé
    con.query(
      `SELECT plageDisponibilite.idPlageDisponibilite, plageDisponibilite.dateDispo, plageDisponibilite.conge, 
      plageDisponibilite.hrsDebutJournee, plageDisponibilite.hrsFinJournee, 
      plageDisponibilite.hrsDebutDiner, plageDisponibilite.hrsFinDiner, 
      employe.idEmploye, employe.prenomEmploye, employe.nomEmploye
    FROM plageDisponibilite       
    LEFT JOIN HoraireRendezVous ON plageDisponibilite.idPlageDisponibilite = HoraireRendezVous.idPlageDisponibilite  
    LEFT JOIN employe ON plageDisponibilite.idEmploye = employe.idEmploye 
    WHERE plageDisponibilite.dateDispo = "${dateDispo}" 
    GROUP BY plageDisponibilite.idPlageDisponibilite
    `,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getDispoByShiftDate" });
        } else {
          resp.send(result);
          console.log("Rendez-Vous : Details display successfully");
        }
      }
    );
  });

  // #### Voir la liste des typesServices avec le IdRendezVous
  app.get(
    "/api/rendezVous/getTypesServiceByIdRendezVous/:idRendezVous",
    (req, resp) => {
      // Aller chercher le date

      var idRendezVous = req.params.idRendezVous;
      // connexion à la table et Afficher les informations de idRendezVous demandé
      con.query(
        `SELECT *
    FROM TypeService_RendezVous       
    WHERE idRendezVous = "${idRendezVous}" 
    `,
        (err, result) => {
          if (err) {
            console.log("Error" + err);
            resp.send({
              error: "error in api : getTypesServiceByIdRendezVous",
            });
          } else {
            resp.send(result);
            console.log(
              "Rendez-Vous : TypeService with idRendezVous display successfully"
            );
          }
        }
      );
    }
  );

  // #### Modifier un des informations dans HoraireRendezVous ####
  app.put(
    "/api/rendezVous/updateHoraireRendezVous/:idRendezVous",
    (req, resp) => {
      // Aller chercher le idRendezVous
      var idRendezVous = req.params.idRendezVous;
      // Aller chercher les données dans le Forms
      var heureFin = req.body.heureFin;
      var idPlageDisponibilite = req.body.idPlageDisponibilite;

      // Mettre à jours les donneés dans la table selon le idRendezVous
      let sql = `UPDATE HoraireRendezVous SET heureFin = "${heureFin}", idPlageDisponibilite = "${idPlageDisponibilite}" WHERE idRendezVous = "${idRendezVous}"`;

      // connexion à la table et mettre à jour des informations
      con.query(sql, (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : updateHoraireRendezVous" });
        } else {
          resp.send(result);
          console.log("Horaire Rendez-Vous : Updated successfully");
        }
      });
    }
  );

  // #### Supprimer une entrée dans la table TypeService_RendezVous ####
  app.delete("/api/rendezVous/deleteTypeServiceRendezVous", (req, resp) => {
    // Récupérer les données du body de la requête
    let idRendezVous = req.body.idRendezVous;
    let idTypeService = req.body.idTypeService;

    // Requête pour supprimer l'entrée correspondante dans TypeService_RendezVous
    let sql = `DELETE TypeService_RendezVous FROM TypeService_RendezVous WHERE TypeService_RendezVous.idRendezVous = "${idRendezVous}" AND TypeService_RendezVous.idTypeService = "${idTypeService}";`;

    // Connexion à la table et lancement de la requête
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : deleteTypeServiceRendezVous" });
      } else {
        console.log("TypeService_RendezVous deleted successfully");
        resp.send(result);
      }
    });
  });
};

export default routes;
