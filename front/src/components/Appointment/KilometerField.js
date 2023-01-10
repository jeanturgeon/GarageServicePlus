export default function KilometerField(props) {

    // Gérer quand l'utilisateur saisit le kilométrage
    function handleKmsChange(event) {
        props.setNewKms(event.target.value);
    }

    return (
        <input type="number" placeholder={props.previousKms} value={props.newKms} onChange={handleKmsChange} required />
    )
}