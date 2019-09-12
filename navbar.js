createNav()
linkToggle()

function createNav() {
    let navBar = document.getElementById('nav-bar')
    if (navBar) {
        document.getElementById('nav-bar').innerHTML = `

<div class="navbar-container">
    <nav id="nav-bar"class="navbar">
        <h1>Mandolin Maestro</h1>
        <ul id="nav-bar" class="navbar-items>
        <li id="record-tab"><a id="record-tab" href="#">Record</a></li>
        <li><a id="songs-tab" href="#">Songs</a></li>
        <li><a id="settings-tab" href="#">Settings</a></li>
        <li><a id="about-tab"href="#">About</a></li>
           <li> 
                <div class="volume">
                    <img src="volume.png" id="volume-icon"></img>
                    
                </div>
            </li>
        </ul>
    </nav>
</div>
        <div id="warning-form-container" class="warning-form-container">
            <div class="warning-form">
                <div class="warning-form__header"></div>
                <h3 class="warning-form__message">You have to name your song first!</h3>
                <p class="warning-form__details"> Give your song a cactchy and memorable name.</p>
                <button id="warning-form__button" class="warning-form__button">OK</button>
            </div>
        </div>

        <div id="recording-form-container" class="recording-form-container hide">
            <h4 id="recording-form__close"><i class="fas fa-window-close"></i></h4>
            <div class="recording-form">

            <div class="controls">
                <h5 id="recording-form-container-header">New Recording</h5>
                <input required autocomplete="off" placeholder="song title" id="song-title" type="text"/>
                <input placeholder="artist"id="song-artist" type="text"/>

                <button id="record" >REC</button>
                <button id="stop" >STOP</button>
                <button id="save">SAVE</button>
                <span id="recorder-prompt" class="hide">Press any key to begin recording</span>

        </div>
        </div>
    </div>
    </div>

    <div id="settings-form-container" class="settings-form-container hide">
        <h4 id="settings-form__close"><i class="fas fa-window-close"></i></h4>

        <div id="settings-form" class="settings-form">
            <h3 id="settings-form-container-header">Settings</h3>
                <li> 
                <div class="settings-volume">
                   <i class="fas fa-volume-down"></i>
                    <input id="settings-volume-slider" type="range" />

                    </div>
                    <input type="checkbox" name="performance mode" value="performance mode">Performance Mode</input>
            </li>
        </div>
    </div>

    <div id="song-library-container" class="song-library-container hide">
        <h4 id="song-library__close"><i class="fas fa-window-close"></i></h4>
        <div id="song-library" class="song-library">
        <h3 id="song-library-container-header">Song Library</h3>

    <select id="song-list" size="10">
    <option>Invent in A minor by Tony Gunk</option>
    </select>

        <div class="song-play-bar">
        <button id="next-song-button"><</button>
        <button id="prev-song-button">></button>
        <button id="play-song-button">PLAY</button>
        <button id="stop-song-button">STOP</button>

    </div>
    </div>
   
    `
    }
}

dragElement(document.getElementById("song-library-container"));
dragElement(document.getElementById("recording-form-container"));
dragElement(document.getElementById("settings-form-container"));

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "-header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(element.id + "-header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        document.onmousemove = elementDrag;
        element.style.zIndex = 40;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {

        document.onmouseup = null;
        document.onmousemove = null;

    }
}


function linkToggle() {
    let recordingFormContainer = document.getElementById('recording-form-container')
    let songLibraryContainer = document.getElementById('song-library-container')
    let settingsFormContainer = document.getElementById('settings-form-container')

    let recordTab = document.getElementById('record-tab')
    let songsTab = document.getElementById('songs-tab')
    let settingsTab = document.getElementById('settings-tab')


    if (recordTab) { //if the recording tab is loaded and we click it.
        recordTab.addEventListener('click', function () {
            recordingFormContainer.classList.toggle('hide')
            recordingFormContainer.style.zIndex = songLibraryContainer.style.zIndex + 1
        })
    }

    if (songsTab) {
        songsTab.addEventListener('click', function () {
            songLibraryContainer.classList.toggle('hide')
            songLibraryContainer.style.zIndex = recordingFormContainer.style.zIndex + 1
        })

    }

    if (settingsTab) {
        settingsTab.addEventListener('click', function () {
            settingsFormContainer.classList.toggle('hide')
            settingsFormContainer.style.zIndex = recordingFormContainer.style.zIndex + 1
        })
    }

    let warningFormButton = document.getElementById('warning-form__button')


    if (warningFormButton) {
        warningFormButton.addEventListener('click', function () {

            let warningFormContainer = document.getElementById('warning-form-container')
            warningFormContainer.classList.toggle('hide')
        })
    }

    var toggle = false;

    let navVolume = document.getElementById('volume-icon')
    navVolume.addEventListener('click', function (volumeToggle) {

        if (navVolume) {
            if (toggle === true) {
                navVolume.src = 'volume.png'
            } else {
                navVolume.src = "volumemute.png"
                document.querySelectorAll('audio').volume = '0'
            }
            toggle = !toggle;
        }
    })


    let recordingFormClose = document.getElementById('recording-form__close')
    let songLibraryClose = document.getElementById('song-library__close')
    let settingsFormClose = document.getElementById('settings-form__close')

    recordingFormClose.addEventListener('click', function () {
        recordingFormContainer.classList.toggle('hide')
    })

    songLibraryClose.addEventListener('click', function () {
        songLibraryContainer.classList.toggle('hide')
    })

    settingsFormClose.addEventListener('click', function () {
        settingsFormContainer.classList.toggle('hide')
    })


    // invisibleBox.addEventListener('click', function (e) {
    //     // if (!recordingFormContainer.classList.contains('hide') && (e.target.id !== 'record-tab')) recordingFormContainer.classList.toggle('hide')
    //     // if (!songLibraryContainer.classList.contains('hide') && (e.target.id !== 'songs-tab')) songLibraryContainer.classList.toggle('hide')

    // }
    // )
}



// volume slider for future update
{/* <input id="settings-volume-slider" type="range" /> */ }
{/* <input id="volume-slider" type="range" /> */ }
