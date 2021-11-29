const playBtn = document.querySelector(".playBtn");
const stopBtn = document.querySelector(".stopBtn");
let beatLength = 8;
const form = document.getElementById('newAudioForm');
var beatsList = []; 
let tempo = 200;
let isPlaying = false;

window.onload = (event) => {
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads > div");
    pads.forEach((pad, index) => {
     let i = Math.floor(index/beatLength);
      pad.addEventListener("click", (p) => {
        if(p.target.classList.contains("play")) {
            p.target.classList.remove("play");
          } else {
            p.target.classList.add("play");
          }
        if(!isPlaying){
            sounds[i].currentTime = 0;
            sounds[i].play();
        }
      });
    });
    const tomPads = Array.from(document.querySelectorAll(".tom"));
    const clapPads = Array.from(document.querySelectorAll(".clap"));
    const kickPads = Array.from(document.querySelectorAll(".kick"));
    const openhatPads = Array.from(document.querySelectorAll(".openhat"));
    const boomPads = Array.from(document.querySelectorAll(".boom"));
    const ridePads = Array.from(document.querySelectorAll(".ride"));
    beatsList = [{beatName: "toms", beats: tomPads}, {beatName: "claps", beats: clapPads}, {beatName: "kicks", beats: kickPads}, {beatName: "open-hats", beats: openhatPads}, {beatName: "booms", beats: boomPads}, {beatName: "toms", beats: ridePads}]
    for (let i = 0; i < beatsList.length; i ++){
        const level = document.getElementById(beatsList[i].beatName + "Level");
        level.addEventListener("change", updateVolume);
    }

    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("click", () =>{
        event.target.value = null;
    }, false);

    fileInput.addEventListener("change", () =>{
        document.getElementById("fileLabel").innerHTML = document.getElementById("fileInput").value.split(/(\\|\/)/g).pop();
        document.getElementById("uploadFileBtn").innerHTML = "Change File";
    }, false);

};

const updateTempo = (value) => {
    tempo = 400 - value;
} 

const addBtns = (padList) => {
    padList.forEach(pad => {
    pad.addEventListener("click", (p) => {
      if(p.target.classList.contains("play")) {
        p.target.classList.remove("play");
      } else {
        p.target.classList.add("play");
      }
    })
  });
}

const playBeat = (name) => {
    const query = "." + name + " > audio";
    const beat = document.querySelector(query);
    if(beat){
        beat.currentTime = 0;
        beat.play();
    }
}


const iterate = (name, list) => {
    console.log(list);
    list.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("active-pad");
        if(el.classList.contains("play")) {
            playBeat(name);
        }
        setTimeout(() => {
          el.classList.remove("active-pad");
        }, tempo) //timer for each row of pads
      }, i * tempo) 
    });
  };

  const playSounds = () => {
    for (let i = 0; i < beatsList.length; i ++){
        iterate(beatsList[i].beatName, beatsList[i].beats);
    }
  }

  const toggle = () => {
    if (isPlaying){ //stop
        isPlaying = false;
        clearInterval(musicPlaying);
        document.getElementById("playBtn").className = "fa fa-play";
        document.getElementById("tempoDisabled").id = "tempoEnabled";
    }else{
        document.getElementById("tempoEnabled").id = "tempoDisabled";
        // document.getElementById("tempo").min = document.getElementById("tempo").value;
        // document.getElementById("tempo").max = document.getElementById("tempo").value;
        isPlaying = true;
        musicPlaying = setInterval(playSounds, tempo*beatLength);
        document.getElementById("playBtn").className = "fa fa-stop";
    }
  }

  const clearPlaying = () => {
      const playingPads = document.getElementsByClassName("play");
      while (playingPads.length > 0){
        let p = playingPads[0];
        p.classList.remove("play");
      }
  }

const showExpandText = () => {
    const el = document.getElementById("extend");
    el.style.display = "block";
  } 

const hideExpandText = () => {
    const el = document.getElementById("extend");
    el.style.display = "none";
} 

const showNewText = () => {
    const el = document.getElementById("new");
    el.style.display = "block";
  } 

const hideNewText = () => {
    const el = document.getElementById("new");
    el.style.display = "none"; 
} 

const expand = () => {
    let padGroups = document.getElementsByClassName("pads");
    const sounds = document.querySelectorAll(".sound");
    for (let i = 0; i < padGroups.length; i ++){
        const groupName = padGroups[i].firstElementChild.className;
        const el = document.createElement("div");
        el.className = groupName;
        el.addEventListener("click", (p) => {
            if(p.target.classList.contains("play")) {
                p.target.classList.remove("play");
              } else {
                p.target.classList.add("play");
              }
            if(!isPlaying){
                sounds[i].currentTime = 0;
                sounds[i].play();
            }
        });
        padGroups[i].appendChild(el);
        beatsList[i].beats.push(el);

    }
    beatLength ++;
}

const showNewAudioForm = () => {
    document.getElementById("newAudioForm").style.display = "inline-block";
}

function addNewAudio(e) {
    if (e.preventDefault){
        e.preventDefault();
    }
    closeForm();
    var audioName = document.getElementById("audioName").value;
    var audioColor = document.getElementById("colorPicker").value;
    var styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    var styleSheet = styleElement.sheet;
    styleSheet.insertRule("." + audioName + ", #" + audioName + "sLevel { " + "background-color: " + audioColor +  ";}");

    let groupEl = document.getElementsByClassName("pads-group")[0];
    var cln = groupEl.cloneNode(true);
    cln.classList = "pads-group";
    cln.classList.add(audioName + "s");
    cln.getElementsByClassName("name")[0].innerHTML = audioName;
    cln.getElementsByClassName("level")[0].id = audioName + "sLevel";
    const audioFile = document.getElementById("fileInput").files[0];
    const audio = cln.getElementsByClassName("sound")[0];
    audio.setAttribute("src", URL.createObjectURL(audioFile));
    audio.setAttribute("type", audioFile.type);
    document.getElementById("groups-container").appendChild(cln);

    let padsFragment = document.createDocumentFragment();
    let padsRoot = document.createElement('div');
    padsRoot.className = "pads";
    padsFragment.append(padsRoot);
    for (let i = 0; i < beatLength; i ++){
        let el = document.createElement('div')
        el.className = audioName;
        // el.style.backgroundColor = audioColor;
        el.addEventListener("click", (p) => {
            if(!isPlaying){
                console.log(audio);
                audio.currentTime = 0;
                audio.play();
            }
            if(p.target.classList.contains("play")) {
              p.target.classList.remove("play");
            } else {
              p.target.classList.add("play");
            }
          })
        padsRoot.append(el);
    }
    const level = document.getElementById(audioName+"sLevel")
    level.style.backgroundColor = audioColor;
    level.addEventListener("change", updateVolume);

    document.getElementById("pads-container").appendChild(padsFragment);
    const newBeats = document.querySelectorAll("." + audioName);
    beatsList.push({beatName: audioName + "s", beats: newBeats});
}
form.addEventListener('submit', addNewAudio);


const expandFileForm = () =>{
    document.getElementById("addFileForm").style.display = "inline-block";
    document.getElementById("addFileForm").style.zIndex = 60;
}

const closeFileForm = (e) =>{
    document.getElementById("addFileForm").style.display = "none";
}

const closeForm = () => {
    document.getElementById("newAudioForm").style.display = "none";
}

const updateVolume = (event) =>{
    const baseName = event.target.id.substring(0, event.target.id.length - 5);
    const audio = document.querySelector("." + baseName + " > audio");
    audio.volume = event.target.value;
}
