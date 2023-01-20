import con from "../../config.js"; // connection à la DB
import mysql2 from "mysql2";

// #### les routes pour la section Horaire Disponibilité  ####
const routes = (app) => {
  // Liste des horaires
  app.get("/api/horaire/getAllHoraire", (req, resp) => {
    con.query("SELECT * FROM plageDisponibilite ", (err, result) => {
      if (err) {
        resp.send({ error: "error in api : getAllHoraire"});
      } else {
        resp.send(result);
      }
    });
  });

  // Liste des horaires by idPlageDisponibilite
  app.get(
    "/api/horaire/getHoraireByIdPH/:idPlageDisponibilite",
    (req, resp) => {
      var idPlageDisponibilite = req.params.idPlageDisponibilite;

      con.query(
        `SELECT * FROM plageDisponibilite  WHERE idPlageDisponibilite = ${idPlageDisponibilite}`,
        (err, result) => {
          if (err) {
            resp.send({ error: "error in api : getHoraireByIdPH"});
          } else {
            resp.send(result);
          }
        }
      );
    }
  );

  // Liste des horaires by idEmploye
  app.get("/api/horaire/getHoraireByIdEmploye/:idEmploye", (req, resp) => {
    var idEmploye = req.params.idEmploye;

    con.query(
      `SELECT * FROM plageDisponibilite WHERE idEmploye = ${idEmploye} ORDER BY plageDisponibilite.dateDispo ASC`,
      (err, result) => {
        if (err) {
          resp.send({ error: "error in api : getHoraireByIdEmploye"});
          console.log("Error" + err);
        } else {
          resp.send(result);
        }
      }
    );
  });

  // Liste des horaires by Date
  app.get("/api/horaire/getHoraireByDate/:dateDispo", (req, resp) => {
    var dateDispo = req.params.dateDispo;

    con.query(
      `SELECT * FROM plageDisponibilite WHERE dateDispo = "${dateDispo}"`,
      (err, result) => {
        if (err) {
          resp.send({ error: "error in api : getHoraireByDate"});
          console.log("Error" + err);
        } else {
          resp.send(result);
          console.log("Horaire : display successfully");
        }
      }
    );
  });

  // #### Ajouter un Horaire Disponibilité ####
  app.post("/api/horaire/addHoraire", (req, resp) => {
    // Aller chercher les données dans le Forms
    var dateDispo = req.body.dateDispo;
    var conge = req.body.conge;
    var hrsDebutJournee = req.body.hrsDebutJournee;
    var hrsDebutDiner = req.body.hrsDebutDiner;
    var hrsFinDiner = req.body.hrsFinDiner;
    var hrsFinJournee = req.body.hrsFinJournee;
    var idEmploye = req.body.idEmploye;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO plageDisponibilite (dateDispo, conge, hrsDebutJournee, hrsDebutDiner, hrsFinDiner, hrsFinJournee, idEmploye ) 
    VALUES ("${dateDispo}", "${conge}", "${hrsDebutJournee}", "${hrsDebutDiner}","${hrsFinDiner}", "${hrsFinJournee}","${idEmploye}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send({ error: "error in api : addHoraire"});
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Horaire : Horaire  added successfully");
      }
    });
  });

  // #### Ajouter plusieurs Horaire Disponibilité ####
  app.post("/api/horaire/addHoraireWeek", (req, resp) => {
    // console.log(req.body.data)
      const data = req.body.data;
      if (Array.isArray(data) && data.length > 0) {
          const dataToInsert = data.map((row) => [
            row.dateDispo,
            row.conge,
            row.hrsDebutJournee,
            row.hrsDebutDiner,
            row.hrsFinDiner,
            row.hrsFinJournee,
            row.idEmploye,
          ]);
          con.query(
            "INSERT INTO plageDisponibilite (dateDispo, conge, hrsDebutJournee, hrsDebutDiner, hrsFinDiner, hrsFinJournee, idEmploye) VALUES ?",
            [dataToInsert],
            function (err, result) {
              if (err) {
                console.log("Error" + err);
                resp.send({ error: "Error inserting data" });
              } else {
                console.log(result.affectedRows + " rows inserted.");
                resp.send(result);
              }
            }
          );
      } else {
          resp.send({ error: "Invalid data passed." });
      }
  });

  // #### Modifier un Horaire Disponibilité ####
  app.put("/api/horaire/updateHoraire/:idPlageDisponibilite", (req, resp) => {
    // Aller chercher le idPlageDisponibilite
    var idPlageDisponibilite = req.params.idPlageDisponibilite;
    var dateDispo = req.body.dateDispo;
    var conge = req.body.conge;
    var hrsDebutJournee = req.body.hrsDebutJournee;
    var hrsDebutDiner = req.body.hrsDebutDiner;
    var hrsFinDiner = req.body.hrsFinDiner;
    var hrsFinJournee = req.body.hrsFinJournee;

    // Mettre à jour les données dans la table selon le idPlageDisponibilite
    let sql = `UPDATE plageDisponibilite SET dateDispo = "${dateDispo}", conge = "${conge}", hrsDebutJournee = "${hrsDebutJournee}", 
    hrsDebutDiner = "${hrsDebutDiner}", hrsFinDiner = "${hrsFinDiner}", hrsFinJournee = "${hrsFinJournee}" 
     WHERE idPlageDisponibilite = "${idPlageDisponibilite}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        resp.send({ error: "error in api : updateHoraire" });
        console.log("error :" + err);
      } else {
        resp.send(result);
        console.log("Horaire : Plage Disponibilite successfully updated");
      }
    });
  });

};

export default routes;
