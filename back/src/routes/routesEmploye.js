import con from '../../config.js' // connection à la DB

// #### les routes pour la section Employe ####
const routes = (app) => {

    app.get("/api/employe/getAllEmploye", (req, resp) => {
        con.query("SELECT * FROM employe", (err, result) => {
            if (err) { resp.send("error in api") }
            else { resp.send(result) }
        })
    });

};


export default routes;
