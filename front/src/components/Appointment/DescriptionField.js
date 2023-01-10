export default function DescriptionField(props) {

    return (
        <textarea id="aptDescription" cols="32" rows="2" ref={props.descriptionInputRef} />
    )
}