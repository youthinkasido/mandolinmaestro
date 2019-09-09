

createNav()
linkToggle()

function createNav() {
    let navBar = document.getElementById('nav-bar')
    if (navBar) {
        document.getElementById('nav-bar').innerHTML = `

    <div id="invisible-box">
    <nav id="nav-bar"class="navbar">
        <h1>Mandolin Maestro</h1>
        <ul id="nav-bar" class="navbar-items>
        <li id="record-tab"><a id="record-tab" href="#">Record</a></li>
        <li><a id="songs-tab" href="#">Songs</a></li>
        <li><a id="settings-tab" href="#">Settings</a></li>
        <li><a id="about-tab"href="#">About</a></li>
        </ul>
        <hr/>
    </nav>


    <div id="recording-form-container" class="recording-form-container hide">
        <div class="recording-form">

        <div class="controls">
            <h5 id="control-heading">New Recording</h5>
            <div class="close-button"><i class="fa fa-trash" aria-hidden="true"></i></div>
            <input placeholder="song title" id="song-title" type="text"/>
            <input placeholder="artist"id="song-artist" type="text"/>

            <button id="record" >REC</button>
            <button id="stop" >STOP</button>
            <button id="save">SAVE</button>

            <div class="volume">
                <i class="fas fa-volume-down"></i>
                <input id="volume-slider" type="range"/>
            </div>
        </div>
        </div>
    </div>

    <div id="song-library-container" class="song-library-container hide">

    <div id="song-library" class="song-library">
    <h3>Song Library</h3>
    <select id="song-list" size="10">
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    <option>Invent in A minor by Tony Gunk</option>
    </select>

        <div class="song-play-bar">
        <button id="next-song-button"><</button>
        <button id="prev-song-button">></button>
        <button id="play-song-button">PLAY</button>
        <button id="stop-song-button">STOP</button>

    </div>
    </div>

    </div>
    `
    }
}

function linkToggle() {
    let recordingFormContainer = document.getElementById('recording-form-container')
    let songLibraryContainer = document.getElementById('song-library-container')

    let recordTab = document.getElementById('record-tab')
    let songsTab = document.getElementById('songs-tab')


    if (recordTab) {
        recordTab.addEventListener('click', function () {
            recordingFormContainer.classList.toggle('hide')
        })
    }

    if (songsTab) {
        songsTab.addEventListener('click', function () {
            songLibraryContainer.classList.toggle('hide')

        })

    }


    // invisibleBox.addEventListener('click', function (e) {
    //     // if (!recordingFormContainer.classList.contains('hide') && (e.target.id !== 'record-tab')) recordingFormContainer.classList.toggle('hide')
    //     // if (!songLibraryContainer.classList.contains('hide') && (e.target.id !== 'songs-tab')) songLibraryContainer.classList.toggle('hide')

    // }
    // )
}






