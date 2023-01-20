import React from "react";
import { useRef, useContext } from "react";
import { useLoaderData, useNavigate, NavLink } from "react-router-dom";

import { AuthContext } from "../../util/auth.context";
import { getEmployeById, updateEmploye } from "../../util/routes";


export default function UpdateEmploye() {
  const {isAdmin} = useContext(AuthContext)
  const employeDetails = useLoaderData();
  const employeData = {
    id: employeDetails[0].idEmploye,
    prenom: employeDetails[0].prenomEmploye,
    nom: employeDetails[0].nomEmploye,
    courriel: employeDetails[0].courriel,
    telephone: employeDetails[0].telephone,
    estAdmin: employeDetails[0].estAdmin,
  };

  const navigate = useNavigate();
  const formData = {
    inputFirstName: useRef(),
    inputLastName: useRef(),
    inputEmail: useRef(),
    inputTelephone: useRef(),
    inputEstAdmin: useRef(),
  };

  const validateFormData = (event) => {
    event.preventDefault();
    const dataObj = {
      prenomEmploye: formData.inputFirstName.current.value,
      nomEmploye: formData.inputLastName.current.value,
      telephone: formData.inputTelephone.current.value,
      courriel: formData.inputEmail.current.value,
      estAdmin: formData.inputEstAdmin.current.value,
    };

    updateEmploye(dataObj, employeData.id).then((response) => {
      if (response === 1) {
        navigate("/nav/employes");
      } else {
        alert("Une erreur est survenue!");
      }
    });
  };

  const FormUpdateEmployee = () => {
    return (
      <>
      <h1 className="mb-4">Modifier un employé</h1>
      <form onSubmit={validateFormData}>
        {/* Prenom et nom */}
        <div className="row mb-5">
          <label htmlFor="idFirstName" className="col-1 col-form-label">Prénom:<span className="required-field">*</span></label>
          <div className="col-3">
            <input type="text" className="form-control" id="idFirstName" ref={formData.inputFirstName} defaultValue={employeData.prenom} required />
          </div>
          <label htmlFor="idLastName" className="col-auto form-label ms-5">Nom:<span className="required-field">*</span> </label>
          <div className="col-3">
            <input type="text" className="form-control" id="idLastName" ref={formData.inputLastName} defaultValue={employeData.nom} required />
          </div>
        </div>
        {/* telephone */}
        <div className="row mb-5">
          <label htmlFor="idTelephone" className="col-1 form-label">Téléphone:<span className="required-field">*</span></label>
          <div className="col-2">
            <input type="tel" className="form-control" id="idTelephone" pattern='[0-9]{10}' ref={formData.inputTelephone} defaultValue={employeData.telephone} aria-describedby="idTelExemple" required />
          </div>
          <span className="col-auto" id="idTelExemple">ex.: 5145555555</span>
        </div>
        {/* courriel */}
        <div className="row mb-5">
          <label htmlFor="idEmail" className="col-1 form-label">Courriel:<span className="required-field">*</span></label>
          <div className="col-5">
            <input type="email" className="form-control" id="idEmail" ref={formData.inputEmail} defaultValue={employeData.courriel} required />
          </div>
          {/* estAdmin */}
          <label htmlFor="idEstAdmin" className="col-auto form-label">
            Est admin:<span className="required-field">*</span>
          </label>
          <div className="col-1">
            <select className="form-select" ref={formData.inputEstAdmin}>
              {employeData.estAdmin === 0 ? (<><option value="0" selected>Non</option><option value="1">Oui</option></>) :
                (<><option value="1" selected>Oui</option><option value="0">Non</option></>)}
            </select>
          </div>
        </div>
        {/* boutons */}
        <button className="button" type="submit">Enregistrer</button>
        <NavLink to='/nav/employes' >
          <button className="button ms-5" type="reset">Annuler</button>
        </NavLink>
      </form>
    </>
    )
  }

  return (
    <>
      {isAdmin ? <FormUpdateEmployee /> : ''}
    </>
  );
}

export function loader({ params }) {
  const idEmploye = params.idEmploye;
  return getEmployeById(idEmploye);
}

