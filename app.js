//// KEY DOWN EVENTS
// import { createFretboard } from './fretboard.js'

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

  assignVolume(audio)
  audio.play();
}
function determineRecordingStatus() {

  let recordButton = document.getElementById('record')
  if (recordButton.innerHTML === 'ARMED') {
    recordButton.innerHTML = 'RECORDING...'
    recordedNotes = [];
    stopRecordingPlayback()
    beginRecording()
  }

  // if record button pressed, clear out any currently playing intervals and recordedNotes


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
  // saveRecording()

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


let speed = [];
function playBackRecording() {
  // after recording, set the selected song in library to the one just recorded and set that to the recordedNotes array
  i = 0
  speed.forEach(item => {
    clearInterval(item)
  })

  playing = setInterval(function () {
    if (recordedNotes[i] !== 0) { // if the current note in recording array isnt empty
      assignNameAndPlayNote(recordedNotes[i].keyNote.slice(4)) // we play it, slicing out unused rests at the end of the recording to make it loop better.
      checkIfStopIsPressed(playing) // while we iterate through our notes, check to make sure stop isnt pressed
      setTimeout(function () { // highlight each note that is played back the recording
        highlightNote(keyNote)
      }, 100)
    }
    i++ // go to the next note
    if (i >= recordedNotes.length) i = 0; // if we have reached the end of the recording, reset it.
  }, 1)

  speed.push(playing) // add the current songs speed so we can clear it out later if we play a different song

  checkIfStopIsPressed(playing) // checks to see if stopped is pressed, passes the current playing interval
}


function selectSongForPlayBack() { // when selecting a song from songList


  let playSongButton = document.getElementById('play-song-button')
  playSongButton.addEventListener('click', function () {
    const selectedSong = document.getElementById('song-list')
    const song = localStorage[selectedSong.value]
    recordedNotes = JSON.parse(song)
    playBackRecording()

    // grab the value of the song from local storage based on the name which is the select tags value 
    // checks to see if the play button is pressed in the song library toolbar, then plays the corresponding song.
    // clearInterval(playing)
    // overwrite the current recording playback with the song retrieved from above
    // parse the string from localStorage into a JS object so it can be played 
    // play the song
  })
}

let songList = document.getElementById('song-list') /// detect if a change is made to the song list
songList.addEventListener('click', function () {
  selectSongForPlayBack()
})

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
function checkIfStopIsPressed() { // checks wether stop or playing is toggled when clicking during song playback

  let stopSongButton = document.getElementById('stop-song-button')
  let songPlayButton = document.getElementById('play-song-button')

  stopSongButton.addEventListener('click', function () {
    stopRecordingPlayback() // clear the playback interval passed in from playBackRecording
  })
}

function stopRecordingPlayback() {

  speed.forEach(item => {
    clearInterval(item)
  })

  // clearInterval(playing)
  recordedNotes = [];

}
function handleSaveButton() { // refactor the interface to include global recordedNotes variable

  let recordingInterface = {
    saveButton: document.getElementById('save'),
    title: document.getElementById('song-title'),
    artist: document.getElementById('song-artist')
  }
  const { saveButton, title, artist } = recordingInterface

  const storedRecording = localStorage.setItem(`${title.value} by ${artist.value}`, JSON.stringify(recordedNotes))

  loadSongList()
  // localStorage.setItem(`${localStorage.length} . ${title.value} by ${artist.value}`, JSON.stringify(recordedNotes))
}
///// save feature //
let saveButton = document.getElementById('save')
if (saveButton) {
  saveButton.addEventListener('click', function () {
    if (saveButton.innerHTML === 'SAVE') {
      handleSaveButton()
    }
  })
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
function loadSongList() { // sort songs

  let storageSongs = {
    songs: Object.keys(localStorage).sort(function (a, b) { return a - b })
  }

  const songList = document.getElementById('song-list')
  const { songs } = storageSongs;

  if (songList.length > 0) { // repopulate song list each time a new song is saved after recording
    songList.remove(1)
  }

  for (let s = 0; s < songs.length; s++) {

    let song = songs[s]

    let listItem = document.createElement('option')

    listItem.innerHTML = song

    songList.appendChild(listItem)
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

saveButton = document.getElementById('save')

rowCount = 0;
fretCount = 0;
noteCount = 0;
stringCount = 0;
recordedNotes = [];
noteTiming = 0;
i = 0

ambience()

function ambience() {
  volume = document.getElementById('volume-slider')


  // ambientAudio = new Audio("https://firebasestorage.googleapis.com/v0/b/mandolin-a1ce1.appspot.com/o/waterfall.mp3?alt=media&token=a32a5fd4-8fae-4aa4-a211-a6e5cbd81e62")
  // ambientAudio.volume = 0.1;
  // ambientAudio.play()
}


function assignVolume(note) {

  let volume = document.getElementById('volume-slider')
  volume.addEventListener("mousemove", function (e) {

    note.volume = e.currentTarget.value / 100
  })
}




//   recordedNotes = JSON.parse(localStorage.getItem('recording1'))
//   console.log(recordedNotes)
//   playBackRecording(recordedNotes)
// })


