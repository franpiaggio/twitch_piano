export default function Key({type, note, playSoundCb, currentNote}){
    return (
        <div
            className={`key ${type} ${currentNote === note ? "pressed" : ""}`} onClick={() => playSoundCb(note)}>
        </div>
    )
}