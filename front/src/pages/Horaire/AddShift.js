import { useRef } from "react";
import { Table } from 'react-bootstrap';
import { useNavigate, NavLink, useLoaderData, useParams } from "react-router-dom";
import { addShift, getEmployeById } from "../../util/routes";
import { getSecondNextMonday } from '../../util/helper';

export default function AddShift() {

    const employeeDetail = useLoaderData();
    const navigate = useNavigate();
    const { idEmploye } = useParams();

    const secondMonday = getSecondNextMonday(0).toLocaleDateString("en-CA");
    const secondTuesday = getSecondNextMonday(1).toLocaleDateString("en-CA");
    const secondWednesday = getSecondNextMonday(2).toLocaleDateString("en-CA");
    const secondThursday = getSecondNextMonday(3).toLocaleDateString("en-CA");
    const secondFriday = getSecondNextMonday(4).toLocaleDateString("en-CA");

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
        inputDay2Date: useRef(),
        inputDay2OnLeave: useRef(),
        inputDay2DayStartH: useRef(),
        inputDay2DayStartM: useRef(),
        inputDay2LunchStartH: useRef(),
        inputDay2LunchStartM: useRef(),
        inputDay2LunchEndH: useRef(),
        inputDay2LunchEndM: useRef(),
        inputDay2DayEndH: useRef(),
        inputDay2DayEndM: useRef(),
        inputDay3Date: useRef(),
        inputDay3OnLeave: useRef(),
        inputDay3DayStartH: useRef(),
        inputDay3DayStartM: useRef(),
        inputDay3LunchStartH: useRef(),
        inputDay3LunchStartM: useRef(),
        inputDay3LunchEndH: useRef(),
        inputDay3LunchEndM: useRef(),
        inputDay3DayEndH: useRef(),
        inputDay3DayEndM: useRef(),
        inputDay4Date: useRef(),
        inputDay4OnLeave: useRef(),
        inputDay4DayStartH: useRef(),
        inputDay4DayStartM: useRef(),
        inputDay4LunchStartH: useRef(),
        inputDay4LunchStartM: useRef(),
        inputDay4LunchEndH: useRef(),
        inputDay4LunchEndM: useRef(),
        inputDay4DayEndH: useRef(),
        inputDay4DayEndM: useRef(),
        inputDay5Date: useRef(),
        inputDay5OnLeave: useRef(),
        inputDay5DayStartH: useRef(),
        inputDay5DayStartM: useRef(),
        inputDay5LunchStartH: useRef(),
        inputDay5LunchStartM: useRef(),
        inputDay5LunchEndH: useRef(),
        inputDay5LunchEndM: useRef(),
        inputDay5DayEndH: useRef(),
        inputDay5DayEndM: useRef(),
    };

    const validateFormData = (event) => {
        event.preventDefault();

        const dataObj = {
            data: [
                {
                    dateDispo: formData.inputDay1Date.current.value,
                    conge: formData.inputDay1OnLeave.current.value,
                    hrsDebutJournee: formData.inputDay1DayStartH.current.value + ":" + formData.inputDay1DayStartM.current.value,
                    hrsDebutDiner: formData.inputDay1LunchStartH.current.value + ":" + formData.inputDay1LunchStartM.current.value,
                    hrsFinDiner: formData.inputDay1LunchEndH.current.value + ":" + formData.inputDay1LunchEndM.current.value,
                    hrsFinJournee: formData.inputDay1DayEndH.current.value + ":" + formData.inputDay1DayEndM.current.value,
                    idEmploye: idEmploye,
                },
                {
                    dateDispo: formData.inputDay2Date.current.value,
                    conge: formData.inputDay2OnLeave.current.value,
                    hrsDebutJournee: formData.inputDay2DayStartH.current.value + ":" + formData.inputDay2DayStartM.current.value,
                    hrsDebutDiner: formData.inputDay2LunchStartH.current.value + ":" + formData.inputDay2LunchStartM.current.value,
                    hrsFinDiner: formData.inputDay2LunchEndH.current.value + ":" + formData.inputDay2LunchEndM.current.value,
                    hrsFinJournee: formData.inputDay2DayEndH.current.value + ":" + formData.inputDay2DayEndM.current.value,
                    idEmploye: idEmploye,
                },
                {
                    dateDispo: formData.inputDay3Date.current.value,
                    conge: formData.inputDay3OnLeave.current.value,
                    hrsDebutJournee: formData.inputDay3DayStartH.current.value + ":" + formData.inputDay3DayStartM.current.value,
                    hrsDebutDiner: formData.inputDay3LunchStartH.current.value + ":" + formData.inputDay3LunchStartM.current.value,
                    hrsFinDiner: formData.inputDay3LunchEndH.current.value + ":" + formData.inputDay3LunchEndM.current.value,
                    hrsFinJournee: formData.inputDay3DayEndH.current.value + ":" + formData.inputDay3DayEndM.current.value,
                    idEmploye: idEmploye,
                },
                {
                    dateDispo: formData.inputDay4Date.current.value,
                    conge: formData.inputDay4OnLeave.current.value,
                    hrsDebutJournee: formData.inputDay4DayStartH.current.value + ":" + formData.inputDay4DayStartM.current.value,
                    hrsDebutDiner: formData.inputDay4LunchStartH.current.value + ":" + formData.inputDay4LunchStartM.current.value,
                    hrsFinDiner: formData.inputDay4LunchEndH.current.value + ":" + formData.inputDay4LunchEndM.current.value,
                    hrsFinJournee: formData.inputDay4DayEndH.current.value + ":" + formData.inputDay4DayEndM.current.value,
                    idEmploye: idEmploye,
                },
                {
                    dateDispo: formData.inputDay5Date.current.value,
                    conge: formData.inputDay5OnLeave.current.value,
                    hrsDebutJournee: formData.inputDay5DayStartH.current.value + ":" + formData.inputDay5DayStartM.current.value,
                    hrsDebutDiner: formData.inputDay5LunchStartH.current.value + ":" + formData.inputDay5LunchStartM.current.value,
                    hrsFinDiner: formData.inputDay5LunchEndH.current.value + ":" + formData.inputDay5LunchEndM.current.value,
                    hrsFinJournee: formData.inputDay5DayEndH.current.value + ":" + formData.inputDay5DayEndM.current.value,
                    idEmploye: idEmploye,
                }
            ]
        }

        addShift(dataObj)
            .then(response => {
                if (parseInt(response.affectedRows) === 5) {
                    alert("5 plages de disponibilité créées avec succès!");
                    navigate(`/nav/employe/${idEmploye}`);
                } else {
                    alert("Un problème est survenu lors de la création des plages de disponibilité.");
                }
            });
    };

    const propagateMondayShift = (event) => {
        event.preventDefault();

        document.getElementById("day2OnLeave").value = document.getElementById("day1OnLeave").value;
        document.getElementById("day3OnLeave").value = document.getElementById("day1OnLeave").value;
        document.getElementById("day4OnLeave").value = document.getElementById("day1OnLeave").value;
        document.getElementById("day5OnLeave").value = document.getElementById("day1OnLeave").value;

        document.getElementById("day2DayStartH").value = document.getElementById("day1DayStartH").value;
        document.getElementById("day3DayStartH").value = document.getElementById("day1DayStartH").value;
        document.getElementById("day4DayStartH").value = document.getElementById("day1DayStartH").value;
        document.getElementById("day5DayStartH").value = document.getElementById("day1DayStartH").value;

        document.getElementById("day2DayStartM").value = document.getElementById("day1DayStartM").value;
        document.getElementById("day3DayStartM").value = document.getElementById("day1DayStartM").value;
        document.getElementById("day4DayStartM").value = document.getElementById("day1DayStartM").value;
        document.getElementById("day5DayStartM").value = document.getElementById("day1DayStartM").value;

        document.getElementById("day2LunchStartH").value = document.getElementById("day1LunchStartH").value;
        document.getElementById("day3LunchStartH").value = document.getElementById("day1LunchStartH").value;
        document.getElementById("day4LunchStartH").value = document.getElementById("day1LunchStartH").value;
        document.getElementById("day5LunchStartH").value = document.getElementById("day1LunchStartH").value;

        document.getElementById("day2LunchStartM").value = document.getElementById("day1LunchStartM").value;
        document.getElementById("day3LunchStartM").value = document.getElementById("day1LunchStartM").value;
        document.getElementById("day4LunchStartM").value = document.getElementById("day1LunchStartM").value;
        document.getElementById("day5LunchStartM").value = document.getElementById("day1LunchStartM").value;

        document.getElementById("day2LunchEndH").value = document.getElementById("day1LunchEndH").value;
        document.getElementById("day3LunchEndH").value = document.getElementById("day1LunchEndH").value;
        document.getElementById("day4LunchEndH").value = document.getElementById("day1LunchEndH").value;
        document.getElementById("day5LunchEndH").value = document.getElementById("day1LunchEndH").value;

        document.getElementById("day2LunchEndM").value = document.getElementById("day1LunchEndM").value;
        document.getElementById("day3LunchEndM").value = document.getElementById("day1LunchEndM").value;
        document.getElementById("day4LunchEndM").value = document.getElementById("day1LunchEndM").value;
        document.getElementById("day5LunchEndM").value = document.getElementById("day1LunchEndM").value;

        document.getElementById("day2DayEndH").value = document.getElementById("day1DayEndH").value;
        document.getElementById("day3DayEndH").value = document.getElementById("day1DayEndH").value;
        document.getElementById("day4DayEndH").value = document.getElementById("day1DayEndH").value;
        document.getElementById("day5DayEndH").value = document.getElementById("day1DayEndH").value;

        document.getElementById("day2DayEndM").value = document.getElementById("day1DayEndM").value;
        document.getElementById("day3DayEndM").value = document.getElementById("day1DayEndM").value;
        document.getElementById("day4DayEndM").value = document.getElementById("day1DayEndM").value;
        document.getElementById("day5DayEndM").value = document.getElementById("day1DayEndM").value;
    }

    const handlePreviousPage = () => {
        navigate(-1);
    };

    return (
        <>
            <h1 className="mb-5">Ajouter des plages de disponibilité <br />pour&nbsp;<i>{employeeDetail[0].prenomEmploye}&nbsp;{employeeDetail[0].nomEmploye}</i></h1>
            <form onSubmit={validateFormData}>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th style={{ width: '13%' }}>Date</th>
                            <th style={{ width: '9%' }}>En congé</th>
                            <th style={{ width: '18%' }}>Début du quart</th>
                            <th style={{ width: '18%' }}>Début du dîner</th>
                            <th style={{ width: '18%' }}>Fin du dîner</th>
                            <th style={{ width: '23%' }}>Fin du quart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* JOUR 1 */}
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    defaultValue={secondMonday}
                                    ref={formData.inputDay1Date}
                                    required
                                    style={{ width: "120px" }}
                                />
                            </td>
                            <td>
                                <select className="form-select" style={{ width: "80px" }} ref={formData.inputDay1OnLeave} id="day1OnLeave">
                                    <option selected value="0">Non</option>
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
                                            <option selected value="08">08</option>
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
                                            <option selected value="00">00</option>
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
                                            <option selected value="12">12</option>
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
                                            <option selected value="00">00</option>
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
                                            <option selected value="13">13</option>
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
                                            <option selected value="00">00</option>
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
                                            <option selected value="17">17</option>
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
                                            <option selected value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        <button className="button" onClick={propagateMondayShift} title="Utiliser le même horaire pour les autres jours">↓</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {/* JOUR 2 */}
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    defaultValue={secondTuesday}
                                    ref={formData.inputDay2Date}
                                    required
                                    style={{ width: "120px" }}
                                />
                            </td>
                            <td>
                                <select className="form-select" style={{ width: "80px" }} ref={formData.inputDay2OnLeave} id="day2OnLeave">
                                    <option selected value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2DayStartH} id="day2DayStartH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option selected value="08">08</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2DayStartM} id="day2DayStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2LunchStartH} id="day2LunchStartH">
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
                                            <option selected value="12">12</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2LunchStartM} id="day2LunchStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2LunchEndH} id="day2LunchEndH">
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
                                            <option selected value="13">13</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2LunchEndM} id="day2LunchEndM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2DayEndH} id="day2DayEndH">
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
                                            <option selected value="17">17</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay2DayEndM} id="day2DayEndM">
                                            <option selected value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {/* JOUR 3 */}
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    defaultValue={secondWednesday}
                                    ref={formData.inputDay3Date}
                                    required
                                    style={{ width: "120px" }}
                                />
                            </td>
                            <td>
                                <select className="form-select" style={{ width: "80px" }} ref={formData.inputDay3OnLeave} id="day3OnLeave">
                                    <option selected value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3DayStartH} id="day3DayStartH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option selected value="08">08</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3DayStartM} id="day3DayStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3LunchStartH} id="day3LunchStartH">
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
                                            <option selected value="12">12</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3LunchStartM} id="day3LunchStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3LunchEndH} id="day3LunchEndH">
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
                                            <option selected value="13">13</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3LunchEndM} id="day3LunchEndM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3DayEndH} id="day3DayEndH">
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
                                            <option selected value="17">17</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay3DayEndM} id="day3DayEndM">
                                            <option selected value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {/* JOUR 4 */}
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    defaultValue={secondThursday}
                                    ref={formData.inputDay4Date}
                                    required
                                    style={{ width: "120px" }}
                                />
                            </td>
                            <td>
                                <select className="form-select" style={{ width: "80px" }} ref={formData.inputDay4OnLeave} id="day4OnLeave">
                                    <option selected value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4DayStartH} id="day4DayStartH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option selected value="08">08</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4DayStartM} id="day4DayStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4LunchStartH} id="day4LunchStartH">
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
                                            <option selected value="12">12</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4LunchStartM} id="day4LunchStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4LunchEndH} id="day4LunchEndH">
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
                                            <option selected value="13">13</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4LunchEndM} id="day4LunchEndM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4DayEndH} id="day4DayEndH">
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
                                            <option selected value="17">17</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay4DayEndM} id="day4DayEndM">
                                            <option selected value="00">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {/* JOUR 5 */}
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    defaultValue={secondFriday}
                                    ref={formData.inputDay5Date}
                                    required
                                    style={{ width: "120px" }}
                                />
                            </td>
                            <td>
                                <select className="form-select" style={{ width: "80px" }} ref={formData.inputDay5OnLeave} id="day5OnLeave">
                                    <option selected value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-auto">
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5DayStartH} id="day5DayStartH">
                                            <option value="00">00</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option selected value="08">08</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5DayStartM} id="day5DayStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5LunchStartH} id="day5LunchStartH">
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
                                            <option selected value="12">12</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5LunchStartM} id="day5LunchStartM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5LunchEndH} id="day5LunchEndH">
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
                                            <option selected value="13">13</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5LunchEndM} id="day5LunchEndM">
                                            <option selected value="00">00</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5DayEndH} id="day5DayEndH">
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
                                            <option selected value="17">17</option>
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
                                        <select className="form-select" style={{ width: "70px" }} ref={formData.inputDay5DayEndM} id="day5DayEndM">
                                            <option selected value="00">00</option>
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
    const idEmploye = params.idEmploye;
    return getEmployeById(idEmploye);
}