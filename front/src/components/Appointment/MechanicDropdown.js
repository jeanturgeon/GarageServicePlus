import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default function MechanicDropdown(props) {
    const options = [];

    let urlShiftsByDate = "http://localhost:4000/api/rendezVous/getDispoByShiftDate/" + props.date;
    axios.get(urlShiftsByDate)
        .then((response) => {
            response.data.filter(shift => shift.conge !== 1).map(shift => options.push({ value: shift.idEmploye, label: shift.prenomEmploye + " " + shift.nomEmploye, shiftId: shift.idPlageDisponibilite }));

            // Trier les options en ordre alphabétique (source : documentation "Array.prototype.sort()")
            options.sort((a, b) => {
                const nameA = a.label.toUpperCase();
                const nameB = b.label.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });

            if (props.existingAptEmployeeId !== "0" && props.selectedMechanic === null) {
                props.setSelectedMechanic(options.filter(option => parseInt(option.value) === parseInt(props.existingAptEmployeeId))[0]);
            }
        })
        .catch(error => {
            alert(error);
        });

    return (
        <Select
            value={props.selectedMechanic}
            onChange={props.setSelectedMechanic}
            options={options}
            isSearchable
            placeholder="Choisir un mécanicien"
        />
    )
}