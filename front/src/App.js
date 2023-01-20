//REACT UTILS
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"; 

//PAGES *********************
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import AllAppointments, {loader as aptLoader} from "./pages/Appointment/AllAppointments";
import ClientList from "./pages/Client/ClientList";
import ClientDetails, {loader as clientDetailLoader} from "./pages/Client/ClientDetails";
import AddAppointment, {loader as clientsLoader} from "./pages/Appointment/AddAppointment";
import UpdateAppointment, {loader as aptById} from "./pages/Appointment/UpdateAppointment";
import AppointmentDetails, {loader as aptDetailLoader}  from './pages/Appointment/AppointmentDetails'
import VehiculeDetails, {loader as vehiculeDetailsLoader}  from './pages/Vehicule/DetailsVehicule'
import AddVehicule from "./pages/Vehicule/AddVehicule";
import AddClient from "./pages/Client/AddClient";
import UpdateClient, {loader as clientById} from "./pages/Client/UpdateClient";
import UpdateVehicule, {loader as vehiculeUpdate} from "./pages/Vehicule/UpdateVehicule";
import EmployeList, {loader as employesLoader} from "./pages/Employe/EmployeList";
import EmployeDetails, {loader as employeDetailLoader} from "./pages/Employe/EmployeDetails";
import AddEmploye from "./pages/Employe/AddEmploye";
import UpdateEmploye, {loader as employeById} from "./pages/Employe/UpdateEmploye";
import AddShift, {loader as employeeDetailLoader} from "./pages/Horaire/AddShift";
import UpdateShift, {loader as shiftDetailLoader} from "./pages/Horaire/UpdateShift";
import ErrroPage from "./pages/Error";

//COMPONENTS ****************
import RootLayout from './components/UI/RootLayout';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Authentication />} errorElement={<ErrroPage />} />
    <Route path='/nav' element={<RootLayout />}  >
      {/* APPOINTMENT ROUTES */}
      <Route path='home' element={<Home />} loader={aptLoader}/>
      <Route path='all-appointments' element={<AllAppointments />} loader={aptLoader} />
      <Route path='add-appointment' element={<AddAppointment />}  loader={clientsLoader} />     
      <Route path='appointment/:idRendezVous' element={<AppointmentDetails />} loader={aptDetailLoader} />
      <Route path='update-appointment/:idRendezVous' element={<UpdateAppointment />} loader={aptById} />  
      {/* CLIENT ROUTES */}
      <Route path='clients' element={<ClientList />} loader={clientsLoader} />
      <Route path='client/:idClient' element={<ClientDetails />} loader={clientDetailLoader} />
      <Route path='add-client' element={<AddClient />} /> 
      <Route path='update-client/:idClient' element={<UpdateClient />} loader={clientById} />     
      {/* VEHICULE ROUTES */}
      <Route path='add-vehiculeClient/:idClient' element={<AddVehicule />}  />    
      <Route path='vehiculeClient/:idVehiculeClient' element={<VehiculeDetails />} loader={vehiculeDetailsLoader} />  
      <Route path='update-vehicule/:idVehiculeClient' element={<UpdateVehicule />} loader={vehiculeUpdate} />  
      {/* EMPLOYEE ROUTES */}
      <Route path='employes' element={<EmployeList />} loader={employesLoader} />
      <Route path='employe/:idEmploye' element={<EmployeDetails />} loader={employeDetailLoader} />
      <Route path='add-employe' element={<AddEmploye />} /> 
      <Route path='update-employe/:idEmploye' element={<UpdateEmploye />} loader={employeById} />   
      {/* HORAIRE ROUTES */}
      <Route path='add-shift/:idEmploye' element={<AddShift />} loader={employeeDetailLoader}  />
      <Route path='update-shift/:idPlageDisponibilite' element={<UpdateShift />} loader={shiftDetailLoader} />
    </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
