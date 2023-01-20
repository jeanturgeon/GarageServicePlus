import { useRef } from "react";
import { Table } from 'react-bootstrap';
import { useNavigate, useLoaderData } from "react-router-dom";
import { updateShift, getShiftByShiftId } from "../../util/routes";

export default function UpdateShift() {

    const shiftDetails = useLoaderData();
    const navigate = useNavigate();

    const shiftData = {
        idPlage: shiftDetails[0].idPlageDisponibilite,
        date: shiftDetails[0].dateDispo.substring(0, 10),
        conge: shiftDetails[0].conge,
        debutJourneeH: shiftDetails[0].hrsDebutJournee === null ? "00" : shiftDetails[0].hrsDebutJournee.substring(0, 2),
        debutJourneeM: shiftDetails[0].hrsDebutJournee === null ? "00" : shiftDetails[0].hrsDebutJournee.substring(3, 5),
        debutLunchH: shiftDetails[0].hrsDebutDiner === null ? "00" : shiftDetails[0].hrsDebutDiner.substring(0, 2),
        debutLunchM: shiftDetails[0].hrsDebutDiner === null ? "00" : shiftDetails[0].hrsDebutDiner.substring(3, 5),
        finLunchH: shiftDetails[0].hrsFinDiner === null ? "00" : shiftDetails[0].hrsFinDiner.substring(0, 2),
        finLunchM: shiftDetails[0].hrsFinDiner === null ? "00" : shiftDetails[0].hrsFinDiner.substring(3, 5),
        finJourneeH: shiftDetails[0].hrsFinJournee === null ? "00" : shiftDetails[0].hrsFinJournee.substring(0, 2),
        finJourneeM: shiftDetails[0].hrsFinJournee === null ? "00" : shiftDetails[0].hrsFinJournee.substring(3, 5)
    };

    setTimeout(() => {
        document.getElementById("day1Date").value = shiftData.date;
        document.getElementById("day1OnLeave").value = shiftData.conge;
        document.getElementById("day1DayStartH").value = shiftData.debutJourneeH;
        document.getElementById("day1DayStartM").value = shiftData.debutJourneeM;
        document.getElementById("day1LunchStartH").value = shiftData.debutLunchH;
        document.getElementById("day1LunchStartM").value = shiftData.debutLunchM;
        document.getElementById("day1LunchEndH").value = shiftData.finLunchH;
        document.getElementById("day1LunchEndM").value = shiftData.finLunchM;
        document.getElementById("day1DayEndH").value = shiftData.finJourneeH;
        document.getElementById("day1DayEndM").value = shiftData.finJourneeM;
    }, 100);

    const formData = {
        inputDay1Date: useRef(),
        inputDay1OnLeave: useRef(),
        inputDay1DayStartH: useRef(),
        inputDay1DayStartM: useRef(),
        inputDay1LunchStartH: useRef(),
        inputDay1LunchStartM: useRef(),
        inputDay1LunchEndH: useRef(),
        inputDay1LunchEndM: useRef(),
        inputDay1DayEndH: useRef(),
        inputDay1DayEndM: useRef(),
    };

    const validateFormData = (event) => {
        event.preventDefault();

        const dataObj = {
            dateDispo: formData.inputDay1Date.current.value,
            conge: formData.inputDay1OnLeave.current.value,
            hrsDebutJournee: formData.inputDay1DayStartH.current.value + ":" + formData.inputDay1DayStartM.current.value,
            hrsDebutDiner: formData.inputDay1LunchStartH.current.value + ":" + formData.inputDay1LunchStartM.current.value,
            hrsFinDiner: formData.inputDay1LunchEndH.current.value + ":" + formData.inputDay1LunchEndM.current.value,
            hrsFinJournee: formData.inputDay1DayEndH.current.value + ":" + formData.inputDay1DayEndM.current.value,
        }

        updateShift(dataObj, shiftData.idPlage)
            .then(response => {
                if (parseInt(response.affectedRows) > 0) {
                    alert("Plage de disponibilité modifiée avec succès!");
                    navigate(-1);
                } else {
                    alert("Un problème est survenu lors de la modification de la plage de disponibilité.");
                }
            });
    };

    const handlePreviousPage = () => {
        navigate(-1);
    };

    return (
        <>
            <h1 className="mb-5">Modifier une plage de disponibilité</h1>
            <form onSubmit={validateFormData}>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th style={{ width: '14%' }}>Date</th>
                            <th style={{ width: '10%' }}>En congé</th>
                            <th style={{ width: '19%' }}>Début du quart</th>
                            <th style={{ width: '19%' }}>Début du dîner</th>
                            <th style={{ width: '19%' }}>Fin du dîner</th>
                            <th style={{ width: '19%' }}>Fin du quart</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    ref={formData.inputDay1Date}
                                    required
                                    style={{ width: "120px" }}
                                    id="day1Date"
                                />
                            </td>
                            <td>
                                <select className="form-select" style={{ width: "80px" }} ref={formData.inputDay1OnLeave} id="day1OnLeave">
                                    <option value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1DayStartH} id="day1DayStartH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>
                                    :
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1DayStartM} id="day1DayStartM">
                                            <option value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1LunchStartH} id="day1LunchStartH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>
                                    :
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1LunchStartM} id="day1LunchStartM">
                                            <option value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1LunchEndH} id="day1LunchEndH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>
                                    :
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1LunchEndM} id="day1LunchEndM">
                                            <option value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1DayEndH} id="day1DayEndH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>
                                    :
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay1DayEndM} id="day1DayEndM">
                                            <option value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <button className="button" type="submit">Enregistrer</button>
                <button className="button ms-5" type="reset" onClick={handlePreviousPage}>Annuler</button>
            </form>
        </>
    );
}

export function loader({ params }) {
    const idPlageDisponibilite = params.idPlageDisponibilite;
    return getShiftByShiftId(idPlageDisponibilite);
}