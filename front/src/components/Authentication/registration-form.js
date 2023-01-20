import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import { Input, AuthButton, FormTitle } from "./authentication.styles";
import { createAuthUserWithEmailAndPassword } from "../../util/firebase.utils";
import { addFirebaseId } from "../../util/routes";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegistrationForm = () => {
  const navigate = useNavigate();  

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target; //name of the input triggering the event
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      if (user) {        
        addFirebaseId({firebaseId: user.uid}, email);
        navigate("/nav/home");
      }
    
    } catch (error) {
      console.log("Unable to create user :( ", error);
    }
  };

  return (
    <div>
      <FormTitle>Créer un compte</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input type="email" required placeholder="courriel" name="email" onChange={handleChange} value={email} />
        <Input type="password" required placeholder="mot de passe" name="password" onChange={handleChange} value={password} />
        <Input type="password" required placeholder="confirmer le mot de passe" name="confirmPassword" onChange={handleChange} value={confirmPassword} />
        <AuthButton>S'enregistrer</AuthButton>
      </Form>
    </div>
  );
};
