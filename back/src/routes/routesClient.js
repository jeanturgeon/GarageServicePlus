import con from "../../config.js"; // connection à la DB

// #### les routes pour la section Client ####
const routes = (app) => {
  // #### Liste des client Actif ####
  app.get("/api/client/getAllClient", (req, resp) => {
    con.query("SELECT * FROM client WHERE estActif = 1", (err, result) => {
      if (err) {
        resp.send("error in api");
      } else {
        resp.send(result);
      }
    });
  });

  // #### Désactiver un client  ####
  app.put("/api/client/deactivatClient/:idClient", (req, resp) => {
    // Aller chercher le idClient
    var idClient = req.params.idClient;

    // Mettre à jours les donneés dans la table selon le idClient
    let sql = `UPDATE client SET estActif = 0 WHERE idClient = "${idClient}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send("error in api");
        console.log("error :" + err);
      } else {
        resp.send(result);        
      }
    });
  });

  // #### Voir la liste des clients avec leur ID ####
  app.get("/api/client/getClientById/:idClient", (req, resp) => {
    // Aller chercher le idClient
    var idClient = req.params.idClient;

    // connexion à la table et Afficher les informations de idClient demandé
    con.query(
      `SELECT * FROM client WHERE idClient = ${idClient}`,
      (err, result) => {
        if (err) {
          console.log(err);
          resp.send("error in api");
          console.log("error :" + err);
        } else {
          resp.send(result);
          console.log("Client : Details of a customer with his ID");
        }
      }
    );
  });

  // #### Ajouter un client ####
  app.post("/api/client/addClient", (req, resp) => {
    // Aller chercher les données dans le Forms
    var prenom = req.body.prenom;
    var nom = req.body.nom;
    var courriel = req.body.courriel;
    var adresse = req.body.adresse;
    var apt = req.body.apt;
    var ville = req.body.ville;
    var province = req.body.province;
    var codePostal = req.body.codePostal;
    var telephone = req.body.telephone;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO client (prenom, nom, courriel, adresse, apt, ville, province, codePostal, telephone) 
    VALUES ("${prenom}", "${nom}", "${courriel}", "${adresse}","${apt}", "${ville}","${province}","${codePostal}","${telephone}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send("error in api");
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Client : Customer added successfully");
      }
    });
  });

  // #### Modifier un client ####
  app.put("/api/client/modifyClient/:idClient", (req, resp) => {
    // Aller chercher le idClient
    var idClient = req.params.idClient;
    var prenom = req.body.prenom;
    var nom = req.body.nom;
    var courriel = req.body.courriel;
    var adresse = req.body.adresse;
    var apt = req.body.apt;
    var ville = req.body.ville;
    var province = req.body.province;
    var codePostal = req.body.codePostal;
    var telephone = req.body.telephone;

    // Mettre à jours les donneés dans la table selon le idClient
    let sql = `UPDATE client SET prenom = "${prenom}", nom = "${nom}", courriel = "${courriel}", adresse = "${adresse}", 
    apt = "${apt}", ville = "${ville}", province = "${province}", codePostal = "${codePostal}", telephone = "${telephone}"
     WHERE idClient = "${idClient}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send("error in api");
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Client : A client has been successfully updated");
      }
    });
  });

  // #### Voir tous les rendez-vous d'un client par son ID ####
  app.get("/api/client/getRDVByIdClient/:idClient", (req, resp) => {
    // Aller chercher le idClient
    var idClient = req.params.idClient;

    // connexion à la table et Afficher les informations de idClient demandé
    con.query(
      `SELECT * FROM rendezVous 
      WHERE idClient = ${idClient}
      ORDER BY date ASC`,
      (err, result) => {
        if (err) {
          console.log(err);
          resp.send("error in api");
          console.log("error :" + err);
        } else {
          resp.send(result);
          console.log("Client : List of past appointments of a client");
        }
      }
    );
  });

  app.delete("/api/client/deleteRDVByIdClient/:idClient", (req, resp) => {
    // Aller chercher le idClient
    var idClient = req.params.idClient;

    // connexion à la table et Afficher les informations de idClient demandé
    con.query(
      `DELETE rendezVous.* FROM TypeService_RendezVous, HoraireRendezVous , rendezVous
      LEFT JOIN TypeService_RendezVous AS TSRDV  ON  rendezVous.idRendezVous = TSRDV.idRendezVous
      LEFT JOIN HoraireRendezVous AS HRDV ON rendezVous.idRendezVous = HRDV.idRendezVous
      WHERE  (rendezVous.idRendezVous = HRDV.idRendezVous) AND (rendezVous.idRendezVous = TSRDV.idRendezVous) AND (rendezVous.idClient = ${idClient} )`,
      (err, result) => {
        if (err) {
          console.log(err);
          resp.send("error in api");
          console.log("error :" + err);
        } else {
          resp.send(result);
          console.log("Client : Delete all Appointments");
        }
      }
    );
  });
};

export default routes;
