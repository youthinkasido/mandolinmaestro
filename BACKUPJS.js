// const fretboard = document.querySelector("#fretboard");
// fretboard.classList += "fretboard";

// numberOfNotes = 0;
// recordedNotes = [];
// noteTiming = 0;

// rowCount = 0;
// fretCount = 0;
// noteCount = 0;

// (async () => {
//   sounds = await getSounds();

//   addNotesToFretboard(sounds);
// })();

// // Create recorder button
// let recorder = document.createElement("button");
// recorder.setAttribute("id", "myBtn");
// recorder.innerHTML = "RECORD";
// fretboard.appendChild(recorder);

// // recorder
// let record = document.getElementById("myBtn");
// record.addEventListener("click", function() {
//   if (record.innerHTML === "RECORD") {
//     record.innerHTML = "STOP";

//     beginRecording();
//   } else {
//     record.innerHTML = "RECORD";
//     playRecording(recordedNotes);
//   }
// });

// function beginRecording() {
//   let recorder = document.getElementById("myBtn");
//   recordTimer = setInterval(() => {
//     console.log(noteTiming);

//     // recordedNotes.push(' ')
//   }, 100);

//   let record = document.getElementById("myBtn");

//   record.addEventListener("click", function() {
//     clearInterval(recordTimer);
//     playRecording(recordedNotes);
//   });
// }

// function playRecording(recordedNotes) {
//   let i = 0;

//   setInterval(() => {
//     for (i = 0; i < recordedNotes.length; i++) {
//       i++;
//       if (recordedNotes[i].timing === i) {
//         recordedNotes[i].note.play();
//       }
//     }
//   }, 1);
//   i = 0;
// }

// async function getSounds() {
//   const response = await fetch("./soundwaves.json");
//   const sounds = await response.json();
//   return sounds;
// }

// function addNotesToFretboard(sounds) {
//   while (numberOfNotes < 16) {
//     let rowDiv = document.createElement("div");
//     addRowToFretboard(rowDiv);
//     addNotesToEachRow(rowDiv);
//     addStringsToFretboard();
//   }
// }

// function addRowToFretboard(rowDiv) {
//   rowDiv.classList += "row";
//   rowDiv.setAttribute("id", numberOfNotes / 4);
//   fretboard.appendChild(rowDiv);
// }

// function addNotesToEachRow(rowDiv) {
//   for (let i = 0; i < 4; i++) {
//     let noteBox = document.createElement("div");
//     let note = addNoteBoxesToRow(rowDiv, noteBox);
//     addClassAndIdToNoteBox(noteBox);
//     numberOfNotes++;
//   }
// }

// function addStringsToFretboard() {
//   let string = document.createElement("div");
//   string.setAttribute("id", `string${numberOfNotes / 4}`);
//   string.classList += ` plucked${numberOfNotes / 4}`;
//   fretboard.appendChild(string);
// }

// function addNoteBoxesToRow(rowDiv, noteBox) {
//   rowDiv.appendChild(noteBox);
// }

// function addClassAndIdToNoteBox(noteBox) {
//   noteBox.classList += "note-box";
//   noteBox.setAttribute("id", numberOfNotes);

//   let note = document.createElement("div");
//   // note.innerHTML += sounds[numberOfNotes].title[0];
//   note.setAttribute("id", `${numberOfNotes}note`);
//   note.classList += "note-circle";
//   noteBox.appendChild(note);
// }

// document.addEventListener("keydown", function(event) {
//   var key = event.key.toUpperCase() || event.keyCode.toUpperCase();
//   keyPressed(key);
// });

// function keyPressed(key) {
//   let keyNote = "note" + key;
//   let audio = new Audio(sounds[keyNote].src);
//   audio.play();
//   recordedNotes.push({ note: audio, timing: noteTiming });
//   noteTiming++;
//   // toggle string pluck class
//   let string;
//   switch (key) {
//     case "SHIFT":
//     case "Z":
//     case "X":
//     case "C":
//     case "V":
//       string = document.getElementById("string4");
//       string.classList.toggle("plucked4");

//       // string is plucked
//       setTimeout(function() {
//         string.classList.toggle("plucked4");
//       }, 100);
//       break;

//     case "B":
//     case "N":
//     case "M":
//     case ",":
//     case "B":
//     case "N":
//     case "M":
//     case ",":
//     case "A":
//     case "S":
//     case "D":
//     case "F":
//       string = document.getElementById("string3");
//       string.classList.toggle("plucked3");

//       // string is plucked
//       setTimeout(function() {
//         string.classList.toggle("plucked3");
//       }, 100);
//       break;

//     case "Q":
//     case "W":
//     case "E":
//     case "R":
//       string = document.getElementById("string2");
//       string.classList.toggle("plucked2");

//       setTimeout(function() {
//         string.classList.toggle("plucked2");
//       }, 100);

//       break;

//     case "1":
//     case "2":
//     case "3":
//     case "4":
//       string = document.getElementById("string1");
//       string.classList.toggle("plucked1");

//       setTimeout(function() {
//         string.classList.toggle("plucked1");
//       }, 100);

//       break;
//   }
// }

// note avant guard randomizer mode, hold one button to auto play notes
// let audio = new Audio(sounds[Math.floor(Math.random() * 10 + 1)].src);

const fretboard = document.querySelector("#fretboard");
fretboard.classList += "fretboard";

rowCount = 0;
fretCount = 0;
noteCount = 0;

(async () => {
  sounds = await getSounds();
  renderMandolin();
})();

async function getSounds() {
  const response = await fetch("./soundwaves.json");
  const sounds = await response.json();
  return sounds;
}

function renderMandolin() {
  createFretboard();
}

function createFretboard() {
  while (rowCount < 4) {
    let row = addRowToFretboard();
    let fret = addFretToRow(row);
  }
}

function addRowToFretboard() {
  let row = document.createElement("div");
  row.setAttribute("tag", "row");
  addIdToElement(row);
  addClassToElement(row);
  fretboard.appendChild(row);
  rowCount++;
  return row;
}

function addFretToRow(row) {
  for (let i = 0; i < 4; i++) {
    let fret = document.createElement("div");
    fret.setAttribute("tag", "fret");
    addIdToElement(fret);
    addClassToElement(fret);
    row.appendChild(fret);
    addNoteToFret(fret);
    fretCount++;
    finalFret = fret;
  }
  return finalFret;
}

function addNoteToFret(fret) {
  let note = document.createElement("div");
  note.setAttribute("tag", "note");
  addIdToElement(note);
  addClassToElement(note);
  fret.appendChild(note);
  finalNote = note;
  return finalNote;
}

function addClassToElement(element) {
  if (element.getAttribute("tag") === "row") element.classList += "row";
  if (element.getAttribute("tag") === "fret") element.classList += "fret";
  if (element.getAttribute("tag") === "note") element.classList += "note";
}

function addIdToElement(element) {
  if (element.getAttribute("tag") === "row")
    element.setAttribute("id", rowCount);
  if (element.getAttribute("tag") === "fret")
    element.setAttribute("id", fretCount);
  if (element.getAttribute("tag") === "note")
    element.setAttribute("id", noteCount);
}

function addAttributeToElement(element) {}
