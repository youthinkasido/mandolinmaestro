add a recording as a db item

recording phases:

recorder = 'off' // possible phases are 'off', 'armed', 'recording'. defaults to 'off';
recordedNotes = [];

handleClick(e){
e.preventDefault()
if (recorder === 'off') recorder = 'armed' // prepare the recorder so any keystroke starts the recording phase
if (recorder === 'recording') recorder = 'off'
}

// if the recorder is armed and a key is pressed, initiate recording

handleKeyPress(event){
 let key = event.keyCode.toUpperCase() || event.key.toUpperCase()
 if (key && recorder === 'armed'){
    recorder = 'recording'
 }

 switch(key){
     case: 'Z'
     audio = new Audio(zNote).play()
    
     recordedNotes.push(new Note('Z')) // new note is timestamped and pushed into array
 }
}

stopRecording(){

}


playBackRecording(recording){
    
}


// note constructor with mongoose 

const mongoose = require('mongoose')
const Schema = mongoose.Schema





const NoteSchema = new Schema {
 note: {
    type: String,
    required: true
 },

indexWithinRecording: {
    type: Integer
}


const recordingFile = new Schema({
    notes: [{
        type: String
        required: true
    }],

    length:{
        type: Integer,
        required: true
    }
})




 switch(key){
     case: 'Z'
     audio = new Audio(zNote).play()
     recordedNotes.push(new Note('Z')) // new note is timestamped and pushed into array
 }
}

stopRecording(){

}


playBackRecording(recording){
    
}


handleClick(e){ // handles recording button
e.preventDefault()
if (recorder === 'off') recorder = 'armed' // prepare the recorder so any keystroke starts the recording phase
if (recorder === 'recording') recorder = 'off' // 

    switch(key){
        audio = new Audio()
    }
}

changeNoteType(){

}


handleKeyPress(event){
 let key = event.keyCode.toUpperCase() || event.key.toUpperCase()

    let audio = new Audio(key+noteType)
    let new Audio(audio)
    recordedNotes.push()











 switch(key){

     case Z:
     case X: 
     case C:
     case V:
     

 }
 if (key && recorder === 'armed'){
    recorder = 'recording'
 }
