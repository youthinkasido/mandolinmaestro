!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e,t,n,o,r,c,s){try{var i=e[c](s),u=i.value}catch(e){return void n(e)}i.done?t(u):Promise.resolve(u).then(o,r)}function o(e){return function(){var t=this,o=arguments;return new Promise((function(r,c){var s=e.apply(t,o);function i(e){n(s,r,c,i,u,"next",e)}function u(e){n(s,r,c,i,u,"throw",e)}i(void 0)}))}}function r(e){setTimeout((function(){document.getElementById(e).classList.toggle("note-pressed")}),100),setTimeout((function(){document.getElementById(e).classList.toggle("note-pressed")}),10)}function c(e){if("SHIFT"===e)new Audio(sounds.noteSHIFT.src);keyNote="note"+e,new Audio(sounds[keyNote].src).play()}function s(e){var t;switch(e){case"SHIFT":case"Z":case"X":case"C":case"V":(t=document.querySelector(".string4")).classList.toggle("plucked4"),setTimeout((function(){t.classList.toggle("plucked4")}),100);break;case"B":case"N":case"M":case",":case"B":case"N":case"M":case",":case"A":case"S":case"D":case"F":(t=document.querySelector(".string3")).classList.toggle("plucked3"),setTimeout((function(){t.classList.toggle("plucked3")}),100);break;case"Q":case"W":case"E":case"R":(t=document.querySelector(".string2")).classList.toggle("plucked2"),setTimeout((function(){t.classList.toggle("plucked2")}),100);break;case"1":case"2":case"3":case"4":(t=document.querySelector(".string1")).classList.toggle("plucked1"),setTimeout((function(){t.classList.toggle("plucked1")}),100)}}function u(){recording=setInterval((function(){if("undefined"!==keyNote){console.log(sounds[keyNote]);var e={audio:new Audio(sounds[keyNote].src),keyNote:keyNote};recordedNotes.push(e),keyNote="undefined"}else recordedNotes.push(0);recordedNotes.length>40&&"REC"===recordButton.innerHTML&&(clearInterval(recording),a())}),1)}function a(){localStorage.setItem("recording1",JSON.stringify(recordedNotes)),i=0;var e=setInterval((function(){0!==recordedNotes[i]&&(c(recordedNotes[i].keyNote.slice(4)),setTimeout((function(){console.log(recordedNotes[i].keyNote),r(keyNote)}),100)),i++,i===recordedNotes.length&&(i=0),function(e){var t=document.getElementById("stop");t.addEventListener("click",(function(){"STOP"===t.innerHTML&&(t.innerHTML="PLAY",function(e){clearInterval(e)}(e)),"PLAY"===t.innerHTML&&(t.innerHTML="STOP")}))}(e)}),1)}function d(){return l.apply(this,arguments)}function l(){return(l=o(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./soundwaves.json");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){!function(){for(;rowCount<4;){var e=p();g(e),m(e)}}(),function(){for(var e=document.getElementById("song-lister"),t=0;t<localStorage.length;t++){var n=document.createElement("option");n.innerHTML=localStorage.recording1,e.appendChild(n)}}()}function g(e){var t=document.createElement("div");t.setAttribute("tag","string"),y(t),e.appendChild(t),stringCount++}function p(){var e=document.createElement("div");return e.setAttribute("tag","row"),y(e),b.appendChild(e),rowCount++,e}function m(e){for(var t=0;t<8;t++){var n=document.createElement("div");n.setAttribute("tag","fret"),y(n),y(e),e.appendChild(n),v(n),fretCount++,finalFret=n}return finalFret}function v(e){var t=document.createElement("div");return t.setAttribute("tag","note"),y(t),e.appendChild(t),finalNote=t,noteCount++,finalNote}function y(e){!function(e){"row"===e.getAttribute("tag")&&e.setAttribute("id",rowCount),"fret"===e.getAttribute("tag")&&e.setAttribute("id",fretCount),"string"===e.getAttribute("tag")&&e.setAttribute("id",stringCount),"note"===e.getAttribute("tag")&&(e.innerHTML=sounds[noteIndex[i]].note[0],e.setAttribute("id",noteIndex[i]),i++)}(e),function(e){"row"===e.getAttribute("tag")&&(e.classList="row"),"fret"===e.getAttribute("tag")&&(e.classList="fret"),"note"===e.getAttribute("tag")&&(e.classList="note",e.classList+=" note-pressed"),"string"===e.getAttribute("tag")&&(e.classList="string".concat(stringCount+1," plucked").concat(stringCount+1))}(e)}document.addEventListener("keydown",(function(e){!function(e){switch(c(e),r(keyNote),function(){var e=document.getElementById("record");"ARMED"===e.innerHTML&&(e.innerHTML="RECORDING...",u())}(),e){case"SHIFT":case"Z":case"X":case"C":case"V":s(e);break;case"B":case"N":case"M":case",":case"B":case"N":case"M":case",":case"A":case"S":case"D":case"F":s(e);break;case"Q":case"W":case"E":case"R":s(e);break;case"1":case"2":case"3":case"4":s(e)}}(e.key.toUpperCase()||e.keyCode.toUpperCase())})),o(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d();case 2:sounds=e.sent,console.log(sounds),f(),populateRecordings();case 6:case"end":return e.stop()}}),e)})))(),recordButton=document.getElementById("record"),recordButton.addEventListener("click",(function(){"REC"===recordButton.innerHTML?recordButton.innerHTML="ARMED":recordButton.innerHTML="RECORDING...","RECORDING..."===recordButton.innerHTML&&(recordButton.innerHTML="REC")})),noteIndex=["note1","note2","note3","note4","note5","note6","note7","note8","noteQ","noteW","noteE","noteR","noteT","noteY","noteU","noteI","noteA","noteS","noteD","noteF","noteG","noteH","noteJ","noteK","noteZ","noteX","noteC","noteV","noteB","noteN","noteM","note,"];var b=document.querySelector("#fretboard");b.classList+="fretboard",rowCount=0,fretCount=0,noteCount=0,stringCount=0,recordedNotes=[],noteTiming=0,i=0,volume=document.querySelector("#ambient-volume"),progress=document.querySelector("#progress"),ambientElement=document.createElement("div"),ambientElement.setAttribute("id","ambient-sound"),b.appendChild(ambientElement)}]);
//# sourceMappingURL=bundle.js.map