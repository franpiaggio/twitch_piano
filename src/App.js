import {useState ,useEffect, useRef} from 'react';
import socketIOClient from "socket.io-client";
import Keyboard from './components/Keyboard';
import * as Tone from 'tone';
import {notes} from './constants';
import './App.css';
function App() {
  const [currentUser, setCurrentUser] = useState("-");
  const [currentNote, setCurrentNote] = useState(null);
  const socketRef = useRef();
  const synthRef = useRef();
  const playSound = (note, isLast) => {
    setCurrentNote(note);
    synthRef.current.triggerAttackRelease(note, "4n");
    if(isLast){
      setTimeout(() => {
        setCurrentNote(null);
        setCurrentUser("-")
      }, 1000)
    }
  }
  function connect(){
    socketRef.current.connect();
  }
  function disconnect(){
    socketRef.current.disconnect();
  }
  function checkIfNoteExist(chatNote){
    return notes.find(note => ( chatNote.toUpperCase() === note.note || chatNote.toLowerCase() === note.gnote))
  }
  useEffect( () => {
    // Conectate al socket/chat
    synthRef.current = new Tone.PolySynth().toDestination();
    socketRef.current = socketIOClient("http://localhost:4000")
    socketRef.current.on("play_note", (data) => {
      console.log(data.notes)
      console.log(data)
      for(let i = 0; i < data.notes.length; i++){
        const selected = checkIfNoteExist(data.notes[i]);
        console.log(selected)
        if(selected){
          setCurrentUser(data.user.username)
          const isLast = i + 1 === data.notes.length;
          setTimeout(() => {
            playSound(selected.note, isLast);
          }, i * 500);
        }
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [])
  return (
    <>
      <Keyboard 
        currentUser={currentUser}
        currentNote={currentNote} 
        playSoundCb={playSound} 
      />
    </>
  );
}

export default App;
