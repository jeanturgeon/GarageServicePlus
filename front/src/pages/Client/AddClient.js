import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { addClient } from "../../util/routes";

export default function AddClient() {  

  const navigate = useNavigate();
    
  const formData = {
    inputFirstName: useRef(),
    inputLastName: useRef(),
    inputAddress: useRef(),
    inputApartment: useRef(),
    inputCity: useRef(),
    inputProvince: useRef(),
    inputPostalCode: useRef(),
    inputTelephone: useRef(),
    inputEmail: useRef(),
  };

  const validateFormData = (event) => {
    event.preventDefault();
    const dataObj = {
      prenom: formData.inputFirstName.current.value,
      nom: formData.inputLastName.current.value,
      courriel: formData.inputEmail.current.value,
      adresse: formData.inputAddress.current.value,
      apt: formData.inputApartment.current.value,
      ville: formData.inputCity.current.value,
      province: formData.inputProvince.current.value,
      codePostal: formData.inputPostalCode.current.value.toLowerCase().replace(/ +/g, ""),
      telephone: formData.inputTelephone.current.value
    }
    addClient(dataObj)
      .then(response => {
        if (response === "OK") {
          setTimeout(() => navigate('/clients'), 500)
        } else {
          alert("Une erreur est survenue!");
        }
      });    
  };


  return (
    <>
      <h1 className="mb-4">Créer un nouveau client</h1>
      <form onSubmit={validateFormData}>
      {/* Prenom et nom */}
        <div className="row mb-5">          
          <label htmlFor="idFirstName" className="col-1 col-form-label">Prénom:<span className="required-field">*</span></label>
          <div className="col-3">
            <input type="text" className="form-control" id="idFirstName" ref={formData.inputFirstName} required />
          </div>          
          <label htmlFor="idLastName" className="col-auto form-label ms-5">Nom:<span className="required-field">*</span> </label>
          <div className="col-3">
            <input type="text" className="form-control" id="idLastName" ref={formData.inputLastName} required />
          </div>
        </div>
        {/* adresse et apt */}
        <div className="row mb-5">          
          <label htmlFor="idAdress" className=" col-1 form-label">Adresse:<span className="required-field">*</span> </label>
          <div className="col-5">
            <input type="text" className="form-control" id="idAdress" ref={formData.inputAddress} required />
          </div>          
          <label htmlFor="idApartment" className="col-auto form-label ms-5">Apt: </label>
          <div className="col-1">
            <input type="text" className="form-control" id="idApartment" ref={formData.inputApartment} />
          </div>          
        </div>
         {/* ville, province et code postal */}
         <div className="row mb-5">          
          <label htmlFor="idAdress" className=" col-1 form-label">Ville:<span className="required-field">*</span> </label>
          <div className="col-3">
            <input type="text" className="form-control" id="idAdress" ref={formData.inputCity} required />
          </div>          
          <label htmlFor="idApartment" className="col-auto form-label ms-5">Province:<span className="required-field">*</span> </label>
          <div className="col-2">
            <select className="form-select" ref={formData.inputProvince}>
              <option defaultValue="QC">Québec</option>
              <option value="ON">Ontario</option>
              <option value="NB">Nouveau-Brunswick</option>
              <option value="NS">Nouvelle-Écosse</option>
              <option value="NL">Terre-Neuve et Labrador</option>
              <option value="PE">Île-du-Prince-Édouard</option>
              <option value="MB">Manitoba</option>
              <option value="SK">Saskatchewan</option>
              <option value="AB">Alberta</option>
              <option value="CB">Colombie-Britannique</option>
              <option value="NU">Nunavut</option>
              <option value="NT">Territoires-du-Nord-Ouest</option>
              <option value="YK">Yukon</option>
            </select>
          </div>                  
          <label htmlFor="idPostalCode" className="col-auto form-label ms-5">Code postal:<span className="required-field">*</span> </label>
          <div className="col-3">
            <input type="text" 
              className="w-50 form-control"
              id="idPostalCode"
              pattern="^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$"
              ref={formData.inputPostalCode}
              required />           
          </div>               
        </div>      
        {/* telephone */}
        <div className="row mb-5">          
          <label htmlFor="idTelephone" className="col-1 form-label">Téléphone:<span className="required-field">*</span></label>
          <div className="col-2">
            <input type="tel" className="form-control" id="idTelephone" pattern='[0-9]{10}' ref={formData.inputTelephone} aria-describedby="idTelExemple" required />
          </div> 
          <span className="col-auto" id="idTelExemple">ex.: 5145555555</span>
        </div>
        {/* courriel */}
        <div className="row mb-5">          
          <label htmlFor="idEmail" className="col-1 form-label">Courriel: </label>
          <div className="col-5">
            <input type="email" className="form-control" id="idEmail" ref={formData.inputEmail} />
          </div> 
        </div>
        {/* boutons */}
        <button className="button" type="submit">Enregistrer</button>
        <NavLink to='/clients' >
          <button className="button ms-5" type="reset">Annuler</button>
        </NavLink>
      </form>       
    </>
  );
}
