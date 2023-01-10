export default function StartTimeField(props) {

    return (
        <input
            id="aptStartTime"
            name="startTime"
            type="time"
            ref={props.startTimeInputRef}
            required
        />
    )
}