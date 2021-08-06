import Key from './Key'
import Info from './Info'
import {notes} from '../constants'
export default function Keyboard({playSoundCb, currentNote, currentUser}){
    return(
        <div className="piano">
          <Info currentUser={currentUser} />
          {notes.map(note => (
              <Key
                id={note.note}
                key={note.note} 
                type={note.type} 
                note={note.note}
                playSoundCb={playSoundCb}
                currentNote={currentNote}
              />
          ))}            
        </div>
    )
}