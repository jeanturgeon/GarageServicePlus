import con from "../../config.js"; // connection à la DB

// #### les routes pour la section Employe ####
// ####  La liste des employés Actif
const routes = (app) => {
  app.get("/api/employe/getAllEmploye", (req, resp) => {
    con.query("SELECT * FROM employe WHERE estActif = 1", (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : getAllEmploye" });
      } else {
        resp.send(result);
      }
    });
  });

  // ####    Les informations d'un employé avec son ID
  app.get("/api/employe/getEmployeById/:idEmploye", (req, resp) => {
    // Aller chercher le idEmploye
    var idEmploye = req.params.idEmploye;
    con.query(
      `SELECT * FROM employe WHERE idEmploye = ${idEmploye}`,
      (err, result) => {
        if (err) {
          console.log("Error" + err);
          resp.send({ error: "error in api : getEmployeById" });
        } else {
          resp.send(result);
        }
      }
    );
  });

  // #### Ajouter un employe ####
  app.post("/api/employe/addEmploye", (req, resp) => {
    // Aller chercher les données dans le Forms
    var courriel = req.body.courriel;
    var prenomEmploye = req.body.prenomEmploye;
    var nomEmploye = req.body.nomEmploye;
    var telephone = req.body.telephone;
    var estAdmin = req.body.estAdmin;

    // Inserer les donneés dans la table
    let sql = `INSERT INTO employe (courriel, prenomEmploye, nomEmploye, telephone, estAdmin) 
    VALUES ("${courriel}", "${prenomEmploye}", "${nomEmploye}", "${telephone}","${estAdmin}")`;

    // connexion à la table et ajoute des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : addEmploye" });
      } else {
        resp.send(result);
        console.log("Employe : Employe added successfully");
      }
    });
  });

  // #### Modifier un employe  ####
  app.put("/api/employe/updateEmploye/:idEmploye", (req, resp) => {
    // Aller chercher le idEmploye
    var idEmploye = req.params.idEmploye;
    var courriel = req.body.courriel;
    var prenomEmploye = req.body.prenomEmploye;
    var nomEmploye = req.body.nomEmploye;
    var telephone = req.body.telephone;
    var estAdmin = req.body.estAdmin;

    // Inserer les donneés dans la table
    let sql = `UPDATE employe SET courriel = "${courriel}", prenomEmploye = "${prenomEmploye}", nomEmploye = "${nomEmploye}"
    , telephone = "${telephone}", estAdmin = "${estAdmin}"
     WHERE idEmploye = "${idEmploye}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : updateEmploye" });
      } else {
        resp.send({
          ...result,
          msg: "Employe # " + idEmploye + " has been successfully Updated",
        });
        console.log("A Employe has been successfully updated");
      }
    });
  });

  // #### Désactiver un employe  ####
  app.put("/api/employe/desactivateEmployeById/:idEmploye", (req, resp) => {
    // Aller chercher le idEmploye
    var idEmploye = req.params.idEmploye;

    // Inserer les donneés dans la table
    let sql = `UPDATE employe SET estActif = 0  WHERE idEmploye = "${idEmploye}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : desactivateEmployeById" });
      } else {
        resp.send({
          ...result,
          msg: "Employe # " + idEmploye + " has been successfully desactivated",
        });
        console.log("An Employe has been successfully desactivates");
      }
    });
  });

  // #### Ajouter le FirebasID d'un employé  ####
  app.put("/api/employe/addFirebaseId/:courriel", (req, resp) => {
    // Aller chercher le idEmploye
    var courriel = req.params.courriel;
    var firebaseId = req.body.firebaseId;

    // Inserer les donneés dans la table
    let sql = `UPDATE employe SET firebaseId = "${firebaseId}"  WHERE courriel = "${courriel}"`;

    // connexion à la table et mettre à jour des informations
    con.query(sql, (err, result) => {
      if (err) {
        console.log("Error" + err);
        resp.send({ error: "error in api : addFirebaseId" });
      } else {
        resp.send({
          ...result,
          msg: "FirebaseId has been successfully added to employee " + courriel,
        });
        console.log("FirebaseId has been successfully added to employee");
      }
    });
  });


    // ####   Avoir le statut isAdmid d'un employe avec son firebaseId
    app.get("/api/employe/getEmployeebyFirebaseId/:firebaseId", (req, resp) => {
      // Aller chercher le idEmploye
      var firebaseId = req.params.firebaseId;
      con.query(
        `SELECT * FROM employe WHERE firebaseId = "${firebaseId}" `,
        (err, result) => {
          if (err) {
            console.log("Error" + err);
            resp.send({ error: "error in api : getEmployeebyFirebaseId" });
          } else {
            resp.send(result);
          }
        }
      );
    });      

  
};

export default routes;

