import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from "axios";
import { convertToTypeTime } from '../../util/helper';
import Spinner from 'react-bootstrap/Spinner';

export default function ServiceTypesDropdown(props) {
    const [showTypeSpinner, setShowTypeSpinner] = useState(false);
    const [options, setOptions] = useState([]);

    // Générer les options du dropdown, sous la forme d'objets (à partir des types de service dans la BD)
    useEffect(() => {
        let urlServiceTypes = "http://localhost:4000/api/rendezVous/getAllTypeService/";
        axios.get(urlServiceTypes)
            .then((response) => {
                let optionsArray = [];
                response.data.map(type => optionsArray.push({ value: type.idTypeService, label: type.nom + " (" + type.dureePrevu + " minutes)", minutes: type.dureePrevu }));

                // Trier les options en ordre alphabétique (source : documentation "Array.prototype.sort()")
                optionsArray.sort((a, b) => {
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

                setOptions(optionsArray);

                // En cas de modification d'un rdv, sélectionner dans le dropdown les options du rdv existant
                if (props.existingAptServiceTypesIds.length > 0) {
                    let optionsMatchingExistingAptServiceTypesIds = [];

                    props.existingAptServiceTypesIds.map(existingAptServiceTypesId => optionsMatchingExistingAptServiceTypesIds.push(optionsArray.filter(option => parseInt(option.value) === parseInt(existingAptServiceTypesId))[0]));

                    props.setSelectedServiceTypes(optionsMatchingExistingAptServiceTypesIds);
                }
            })
            .catch(error => {
                alert(error);
            });
    }, [props.existingAptServiceTypesIds]);

    // Fournir la durée suggérée chaque fois que les types de service sélectionnés changent
    useEffect(() => {
        // Calculer la durée suggérée en minutes
        let durationsArray = [];
        props.selectedServiceTypes ?
            props.selectedServiceTypes.map(type => durationsArray.push(parseInt(type.minutes))) :
            durationsArray = [];
        let totalMinutes = 0;
        props.selectedServiceTypes ?
            totalMinutes = durationsArray.reduce((partialSum, currentElement) => partialSum + currentElement, 0) :
            totalMinutes = 0;

        // Convertir la durée suggérée en format type time
        let convertedDuration = convertToTypeTime(totalMinutes);

        props.setSuggestedDuration(convertedDuration);

        // Afficher un spinner pendant le traitement lorsqu'un type de service est sélectionné par l'utilisateur
        if (props.selectedServiceTypes.length > 0) {
            setShowTypeSpinner(true)
            setTimeout(() => { setShowTypeSpinner(false) }, 1400);
        }

    }, [props.selectedServiceTypes]);

    return (
        <>
            <Select
                defaultValue={props.selectedServiceTypes}
                value={props.selectedServiceTypes}
                onChange={props.setSelectedServiceTypes}
                options={options}
                isMulti
                isSearchable
                placeholder="Choisir un ou plusieurs types de service"
            />
            <div style={{ display: showTypeSpinner ? "block" : "none" }}>
                <Spinner animation="border" />
            </div>
        </>
    )
}