import { useRef, useContext } from "react";

import { useNavigate, NavLink } from "react-router-dom";
import { addEmploye } from "../../util/routes";
import { AuthContext } from "../../util/auth.context";

export default function AddEmploye() {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const formData = {
    inputFirstName: useRef(),
    inputLastName: useRef(),
    inputTelephone: useRef(),
    inputEmail: useRef(),
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
    addEmploye(dataObj).then((response) => {
      if (response === "OK") {
        setTimeout(() => navigate("/nav/employes"), 500);
      } else {
        alert("Une erreur est survenue!");
      }
    });
  };

  const FormAddEmployee = () => {
    return (
      <>
        <h1 className="mb-4">Créer un nouvel employé</h1>
        <form onSubmit={validateFormData}>
          {/* Prenom et nom */}
          <div className="row mb-5">
            <label htmlFor="idFirstName" className="col-1 col-form-label">
              Prénom:<span className="required-field">*</span>
            </label>
            <div className="col-3">
              <input type="text" className="form-control" id="idFirstName" ref={formData.inputFirstName} required />
            </div>
            <label htmlFor="idLastName" className="col-auto form-label ms-5">
              Nom:<span className="required-field">*</span>{" "}
            </label>
            <div className="col-3">
              <input type="text" className="form-control" id="idLastName" ref={formData.inputLastName} required />
            </div>
          </div>
          {/* telephone */}
          <div className="row mb-5">
            <label htmlFor="idTelephone" className="col-1 form-label">
              Téléphone:<span className="required-field">*</span>
            </label>
            <div className="col-2">
              <input type="tel" className="form-control" id="idTelephone" pattern="[0-9]{10}" ref={formData.inputTelephone} aria-describedby="idTelExemple" required />
            </div>
            <span className="col-auto" id="idTelExemple">
              ex.: 5145555555
            </span>
          </div>
          {/* courriel */}
          <div className="row mb-5">
            <label htmlFor="idEmail" className="col-1 form-label">
              Courriel:<span className="required-field">*</span>
            </label>
            <div className="col-5">
              <input type="email" className="form-control" id="idEmail" ref={formData.inputEmail} required />
            </div>
            {/* estAdmin */}
            <label htmlFor="idEstAdmin" className="col-auto form-label">
              Est admin:<span className="required-field">*</span>
            </label>
            <div className="col-1">
              <select className="form-select" ref={formData.inputEstAdmin}>
                <option defaultValue></option>
                <option value="0" selected>
                  Non
                </option>
                <option value="1">Oui</option>
              </select>
            </div>
          </div>
          {/* boutons */}
          <button className="button" type="submit">
            Enregistrer
          </button>
          <NavLink to="/nav/employes">
            <button className="button ms-5" type="reset">
              Annuler
            </button>
          </NavLink>
        </form>
      </>
    );
  };

  return <>{isAdmin ? <FormAddEmployee /> : ""}</>;
}
