Mandolin Maestro is a 16 note virtual instrument with recording and playback functionality created with Javascript, HTML, and CSS.

https://mandolinmaestro.herokuapp.com/

![alt text](https://github.com/youthinkasido/mandolinmaestro/blob/master/mandolin.png?raw=true)

## Features:
- Recording and playback functionality with Local Storage that supports multi audio sample recording.
- Virtual fretboard using CSS Flexbox and CSS keyframe animations to produce realistic animations.

## Code Snippet
The following code snippet uses case statements over 'if' conditionals to determine what strings shall vibrate on the mandolin when struck with the appropriate keys. Through the use of case statements, I'm able to greatly reduce the amount of code needed to create this sequence as compared to an 'if' conditional.

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
