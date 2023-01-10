import request from 'supertest';
import app from '../../index.js'
import { expect } from 'chai';

describe('Obtain appointment details with GET /api/rendezVous/detailsRendezVous/:idRendezVous', () => {

    // #####  CLIENT FIRST NAME  #####

    it('should return the CLIENT FIRST NAME for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].prenom).to.equal("Veronique");

        // console.log(response.body);
    });

    it('should return a NULL CLIENT FIRST NAME because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].prenom).to.equal(null);

        // console.log(response.body);
    });

    // #####  CLIENT LAST NAME  #####

    it('should return the CLIENT LAST NAME for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].nom).to.equal("Paré");

        // console.log(response.body);
    });

    it('should return a NULL CLIENT LAST NAME because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].nom).to.equal(null);

        // console.log(response.body);
    });

    // #####  CLIENT PHONE NUMBER  #####

    it('should return the CLIENT PHONE NUMBER for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].telephone).to.equal("4506984568");

        // console.log(response.body);
    });

    it('should return a NULL CLIENT PHONE NUMBER because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].telephone).to.equal(null);

        // console.log(response.body);
    });

    // #####  VEHICLE MAKE  #####

    it('should return the VEHICLE MAKE for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].nomMarque).to.equal("Toyota");

        // console.log(response.body);
    });

    it('should return a NULL VEHICLE MAKE because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].nomMarque).to.equal(null);

        // console.log(response.body);
    });

    // #####  VEHICLE MODEL  #####

    it('should return the VEHICLE MODEL for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].modele).to.equal("Corola");

        // console.log(response.body);
    });

    it('should return a NULL VEHICLE MODEL because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].modele).to.equal(null);

        // console.log(response.body);
    });

    // #####  VEHICLE YEAR  #####

    it('should return the VEHICLE YEAR for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].annee).to.equal(2018);

        // console.log(response.body);
    });

    it('should return a NULL VEHICLE YEAR because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].annee).to.equal(null);

        // console.log(response.body);
    });

    // #####  VEHICLE LICENCE PLATE  #####

    it('should return the VEHICLE LICENCE PLATE for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].numeroPlaque).to.equal("YYY 111");

        // console.log(response.body);
    });

    it('should return a NULL VEHICLE LICENCE PLATE because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].numeroPlaque).to.equal(null);

        // console.log(response.body);
    });

    // #####  VEHICLE KM  #####

    it('should return the VEHICLE KM for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].kilometrage).to.equal(12000);

        // console.log(response.body);
    });

    it('should return a NULL VEHICLE KM because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].kilometrage).to.equal(null);

        // console.log(response.body);
    });

    // #####  SERVICE TYPES  #####

    it('should return the SERVICE TYPES for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].nomTypeService).to.equal("Parallélisme,Radiateur");

        // console.log(response.body);
    });

    it('should return a NULL SERVICE TYPES because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].nomTypeService).to.equal(null);

        // console.log(response.body);
    });

    // #####  DATE  #####

    it('should return the DATE of the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].date.slice(0, 10)).to.equal("2023-01-12");

        // console.log(response.body);
    });

    it('should return a NULL DATE because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].date).to.equal(null);

        // console.log(response.body);
    });

    // #####  HOUR  #####

    it('should return the HOUR of the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].heure.slice(0, 5)).to.equal("09:00");

        // console.log(response.body);
    });

    it('should return a NULL HOUR because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].heure).to.equal(null);

        // console.log(response.body);
    });

    // #####  DURATION  #####

    it('should return the DURATION of the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].dureeTotal).to.equal(120);

        // console.log(response.body);
    });

    it('should return a NULL DURATION because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].dureeTotal).to.equal(null);

        // console.log(response.body);
    });

    // #####  MECHANIC'S FIRST NAME  #####

    it('should return the MECHANICS FIRST NAME of the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].prenomEmploye).to.equal("Catherine");

        // console.log(response.body);
    });

    it('should return a NULL MECHANICS FIRST NAME because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].prenomEmploye).to.equal(null);

        // console.log(response.body);
    });

    // #####  MECHANIC'S LAST NAME  #####

    it('should return the MECHANICS LAST NAME of the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].nomEmploye).to.equal("Chartier Vézina");

        // console.log(response.body);
    });

    it('should return a NULL MECHANICS LAST NAME because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].nomEmploye).to.equal(null);

        // console.log(response.body);
    });

    // #####  DESCRIPTION  #####

    it('should return the DESCRIPTION of the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/195')

        expect(response.body[0].description).to.equal("Test de route");

        // console.log(response.body);
    });

    it('should return a NULL DESCRIPTION because no appointment has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/1')

        expect(response.body[0].description).to.equal(null);

        // console.log(response.body);
    });

    it('should return an EMPTY DESCRIPTION because no description was entered for the appointment that has the matching id', async () => {
        const response = await request(app)
            .get('/api/rendezVous/detailsRendezVous/188')

        expect(response.body[0].description).to.equal("");

        // console.log(response.body);
    });

})