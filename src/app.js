//// KEY DOWN EVENTS
// import {goToRecording} from './recording'

// var goToRecording = require('./recording')['goToRecording']

// test()


// function test() {
//   goToRecording()
// }

// test()

import { createFretboard } from './fretboard.js'
import { test } from './recording.js'

test()

document.addEventListener("keydown", function (event) {
  var key = event.key.toUpperCase() || event.keyCode.toUpperCase();
  keyPressed(key);
});

function highlightNote(note) { // highlight, then de-highlight pressed note
  setTimeout(function () {
    document.getElementById(note).classList.toggle("note-pressed")
  }, 100)

  setTimeout(function () {
    document.getElementById(note).classList.toggle("note-pressed");
  }, 10);

  // highlightNonfrettedNotes(note)
}

function assignNameAndPlayNote(key) {

  if (key === 'SHIFT') {
    let lownote = new Audio(sounds['noteSHIFT'].src)
    // lownote.play()
  }
  keyNote = "note" + key;
  let audio = new Audio(sounds[keyNote].src);
  audio.play();

}

function determineRecordingStatus() {

  let recordButton = document.getElementById('record')
  if (recordButton.innerHTML === 'ARMED') {
    recordButton.innerHTML = 'RECORDING...'
    beginRecording()
  }
}


function vibrateString(key) { //vibrate string based on location of note
  let string
  switch (key) {
    case "SHIFT": case "Z": case "X": case "C": case "V":

      string = document.querySelector(".string4")
      string.classList.toggle('plucked4')
      setTimeout(function () {
        string.classList.toggle("plucked4");
      }, 100);
      break

    case "B": case "N": case "M": case ",": case "B": case "N": case "M":
    case ",": case "A": case "S": case "D": case "F":

      string = document.querySelector(".string3");
      string.classList.toggle("plucked3");

      setTimeout(function () {
        string.classList.toggle("plucked3");
      }, 100);
      break;

    case "Q": case "W": case "E": case "R":
      string = document.querySelector(".string2");
      string.classList.toggle("plucked2");

      setTimeout(function () {
        string.classList.toggle("plucked2");
      }, 100);
      break


    case "1": case "2": case "3": case "4":
      string = document.querySelector(".string1");
      string.classList.toggle("plucked1");

      setTimeout(function () {
        string.classList.toggle("plucked1");
      }, 100);
      break
  }
}

function keyPressed(key) {

  assignNameAndPlayNote(key)
  highlightNote(keyNote)
  determineRecordingStatus()

  switch (key) {
    case "SHIFT": case "Z": case "X": case "C": case "V":
      vibrateString(key)
      break;

    case "B": case "N": case "M": case ",": case "B": case "N": case "M":
    case ",": case "A": case "S": case "D": case "F":
      vibrateString(key)
      break;

    case "Q": case "W": case "E": case "R":
      vibrateString(key)
      break;
    case "1": case "2": case "3": case "4":
      vibrateString(key)
      break;
  }
}


/// RECORDER SETUP TOOLS, AND PLAYBACK
function beginRecording() {
  recording = setInterval(function () {
    let i = 0;

    if (keyNote !== 'undefined') {

      console.log(sounds[keyNote])
      let audio = new Audio(sounds[keyNote].src)
      let recordedNote = {
        audio: audio,
        keyNote: keyNote
      }
      recordedNotes.push(recordedNote)
      keyNote = 'undefined' /// !!!!!!!!!! may be the problem causing the 'src' error

    } else {
      recordedNotes.push(0)
    }

    if (recordedNotes.length > 40 && recordButton.innerHTML === 'REC') {
      clearInterval(recording)
      playBackRecording()
    }
  }, 1)
}

function playBackRecording() {

  localStorage.setItem(`recording1`, JSON.stringify(recordedNotes))
  i = 0

  let playing = setInterval(function () {
    if (recordedNotes[i] !== 0) { // if the current note in recording array isnt empty
      assignNameAndPlayNote(recordedNotes[i].keyNote.slice(4))
      setTimeout(function () {
        console.log(recordedNotes[i].keyNote)
        highlightNote(keyNote)
      }, 100)
    }
    i++
    if (i === recordedNotes.length) i = 0;
    checkIfStopIsPressed(playing)
  }, 1)

}
function handleRecordButton() {

  recordButton = document.getElementById("record")
  recordButton.addEventListener('click', function () {


    if (recordButton.innerHTML === 'REC') {
      recordButton.innerHTML = 'ARMED'
    } else {
      recordButton.innerHTML = 'RECORDING...'
    }

    if (recordButton.innerHTML === 'RECORDING...') {
      recordButton.innerHTML = 'REC'
    }
  })
}


function checkIfStopIsPressed(playing) {
  let stopButton = document.getElementById('stop')
  stopButton.addEventListener('click', function () {

    if (stopButton.innerHTML === 'STOP') {
      stopButton.innerHTML = 'PLAY'
      stopRecordingPlayback(playing)
    }
    if (stopButton.innerHTML === 'PLAY') {
      stopButton.innerHTML = 'STOP'
      // playBackRecording()
    }
  })
}

function stopRecordingPlayback(playing) {
  clearInterval(playing)
}

// note avant guard randomizer mode, hold one button to auto play notes
// let audio = new Audio(sounds[Math.floor(Math.random() * 10 + 1)].src);







//// STARTUP ////
(async () => {
  sounds = await getSounds();
  console.log(sounds)
  renderMandolin();
  populateRecordings()
})();
handleRecordButton()

async function getSounds() {
  const response = await fetch("./soundwaves.json");
  const sounds = await response.json();
  return sounds;
}

function renderMandolin() {
  createFretboard();
  loadSongList()
}
/////////////////////////////


function loadSongList() {
  let songList = document.getElementById('song-lister')
  for (let s = 0; s < localStorage.length; s++) {

    let optionTag = document.createElement('option')
    optionTag.innerHTML = localStorage.recording1
    songList.appendChild(optionTag)
  }

}
function createFretboard() {
  while (rowCount < 4) {
    let row = addRowToFretboard();
    let string = addStringsToFretboard(row);
    let fret = addFretToRow(row);
  }
}

function addStringsToFretboard(row) {
  let string = document.createElement("div");
  string.setAttribute("tag", "string");
  addDetailsToElement(string);
  row.appendChild(string);
  stringCount++;
}

function addRowToFretboard() {
  let row = document.createElement("div");
  row.setAttribute("tag", "row");
  addDetailsToElement(row);

  fretboard.appendChild(row);
  rowCount++;
  return row;
}

function addFretToRow(row) {

  for (let i = 0; i < 8; i++) {
    let fret = document.createElement("div");
    fret.setAttribute("tag", "fret");

    addDetailsToElement(fret);
    addDetailsToElement(row);

    row.appendChild(fret);
    addNoteToFret(fret);
    fretCount++;
    finalFret = fret; // do away with when functional
  }
  return finalFret; // same here
}

function addNoteToFret(fret) {
  let note = document.createElement("div");

  note.setAttribute("tag", "note");
  addDetailsToElement(note);

  fret.appendChild(note);
  finalNote = note;
  noteCount++;
  return finalNote;
}

function addClassToElement(element) {
  if (element.getAttribute("tag") === "row") element.classList = "row";
  if (element.getAttribute("tag") === "fret") element.classList = "fret";
  if (element.getAttribute("tag") === "note") {
    element.classList = "note";
    element.classList += " note-pressed"
  }
  if (element.getAttribute("tag") === "string") element.classList = `string${stringCount + 1} plucked${stringCount + 1}`;

}

function addIdToElement(element) {

  if (element.getAttribute("tag") === "row") element.setAttribute("id", rowCount);
  if (element.getAttribute("tag") === "fret") element.setAttribute("id", fretCount);
  if (element.getAttribute("tag") === "string") element.setAttribute("id", stringCount);

  if (element.getAttribute("tag") === "note") {

    element.innerHTML = sounds[noteIndex[i]].note[0]
    element.setAttribute("id", noteIndex[i]);
    i++
  }


}

function addDetailsToElement(element) {
  addIdToElement(element);
  addClassToElement(element);
}





///// SETUP/SETTINGS
////////// KEY INPUTS


noteIndex = ["note1", "note2", "note3", "note4", "note5", "note6", "note7", "note8",
  "noteQ", "noteW", "noteE", "noteR", "noteT", "noteY", "noteU", "noteI",
  "noteA", "noteS", "noteD", "noteF", "noteG", "noteH", "noteJ", "noteK",
  "noteZ", "noteX", "noteC", "noteV", "noteB", "noteN", "noteM", "note,"]

const fretboard = document.querySelector("#fretboard");
fretboard.classList += "fretboard";

rowCount = 0;
fretCount = 0;
noteCount = 0;
stringCount = 0;
recordedNotes = [];
noteTiming = 0;
i = 0

ambience()


function ambience() {
  volume = document.querySelector('#ambient-volume')
  progress = document.querySelector('#progress')
  ambientElement = document.createElement('div')

  ambientElement.setAttribute('id', 'ambient-sound')
  fretboard.appendChild(ambientElement)

  // ambientAudio = new Audio("https://firebasestorage.googleapis.com/v0/b/mandolin-a1ce1.appspot.com/o/waterfall.mp3?alt=media&token=a32a5fd4-8fae-4aa4-a211-a6e5cbd81e62")
  // ambientAudio.volume = 0.1;
  // ambientAudio.play()
}

// volume.addEventListener("mousemove", function (e) {
//   ambientAudio.volume = e.currentTarget.value / 100
// })






// let songPlayButton = document.getElementById('song-play-button')
// songPlayButton.addEventListener('click', function () {
//   let songList = document.getElementById('song-lister')

//   recordedNotes = JSON.parse(localStorage.getItem('recording1'))
//   console.log(recordedNotes)
//   playBackRecording(recordedNotes)
// })