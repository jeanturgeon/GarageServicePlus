import { convertToMinutes, convertToTypeTime } from '../../util/helper';

export default function DurationField(props) {

    if(props.chosenDuration !== "0") {
        let chosenDurationInTypeTime = convertToTypeTime(props.chosenDuration);
        document.getElementById('aptDuration').value = chosenDurationInTypeTime;
    }

    // Gérer quand l'utilisateur saisit la durée
    function handleEnteredDurationChange(event) {
        let enteredDuration = event.target.value;
        let chosenTotal = convertToMinutes(enteredDuration);
        props.setChosenDuration(chosenTotal);
    }

    return (
        <>
            <input
                id="aptDuration"
                name="duration"
                type="time"
                placeholder={props.suggestedDuration}
                onChange={handleEnteredDurationChange}
                required
            /> &nbsp; &nbsp;
            Écart : {props.gapMessage} <br />
            <div style={{ display: props.showGapAlert ? "block" : "none", color: "#EF8275" }}>
                Attention : L'écart de temps dépasse 20 %.
            </div>
        </>
    )
}