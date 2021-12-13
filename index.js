const playBtn = document.querySelector(".playBtn");
const stopBtn = document.querySelector(".stopBtn");
let beatLength = 8;
var uniforms;

const form = document.getElementById('newAudioForm');
form.addEventListener('submit', addNewAudio);

var beatsList = []; 
let tempo = 200;
let isPlaying = false;

window.onload = (event) => {
    const pads = document.querySelectorAll(".pads > div");
    pads.forEach((pad, index) => {
     let i = Math.floor(index/beatLength);
      pad.addEventListener("click", (p) => {
        clickPadHandler(p, i);
      });
    });
    const tomPads = Array.from(document.querySelectorAll(".tom"));
    const clapPads = Array.from(document.querySelectorAll(".clap"));
    const kickPads = Array.from(document.querySelectorAll(".kick"));
    const openhatPads = Array.from(document.querySelectorAll(".openhat"));
    const boomPads = Array.from(document.querySelectorAll(".boom"));
    const ridePads = Array.from(document.querySelectorAll(".ride"));
    const snarePads = Array.from(document.querySelectorAll(".snare"));

    beatsList = [{beatName: "toms", beats: tomPads}, {beatName: "claps", beats: clapPads}, {beatName: "kicks", beats: kickPads}, {beatName: "openhats", beats: openhatPads}, {beatName: "booms", beats: boomPads}, {beatName: "rides", beats: ridePads}, {beatName: "snares", beats: snarePads}]
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
    if (!hasGetUserMedia()) {
        document.getElementById("recordBtn").disabled = true;
    }
};
if (hasGetUserMedia()) {
    var recorder;
    var audio_context
    var audio_stream;
    audio_context = new AudioContext;
    const recordBtn = document.getElementById("recordBtn");
    recordBtn.onclick = () => {
        if (recordBtn.innerHTML=="record"){
            recordBtn.innerHTML = "stop";
            recordBtn.style.backgroundColor = "red";
            startRecording();
        }else{
            recordBtn.innerHTML = "record";
            recordBtn.style.backgroundColor = "#363e5c";
            stopRecording(function(AudioBLOB){
            var url = URL.createObjectURL(AudioBLOB);
                document.getElementById("audioPreview").src = url;
                document.getElementById("audioPreview").title =  "new-beat.wav"
            }, "audio/wav");
            document.getElementById("newBeatPreview").style.display = "inline-block";
        }  
    }  
} else {
    alert("Capturing audio is not supported by your browser");
}

const clickPadHandler = (p, i) =>{
    const sounds = document.querySelectorAll(".sound");
    const col = audioPads.audioPads[i].color
        let colorArr = col.slice(
          col.indexOf("(") + 1, 
          col.indexOf(")")
        ).split(", ");
    if(p.target.classList.contains("play")) {
        p.target.classList.remove("play");
        uniforms.u_ratios.value.x -= colorArr[0]/255;
        uniforms.u_ratios.value.y -= colorArr[1]/255;
        uniforms.u_ratios.value.z -= colorArr[2]/255;
      } else {
        p.target.classList.add("play");
        uniforms.u_ratios.value.x += colorArr[0]/255;
        uniforms.u_ratios.value.y += colorArr[1]/255;
        uniforms.u_ratios.value.z += colorArr[2]/255;
      }
    if(!isPlaying){
        sounds[i].currentTime = 0;
        sounds[i].play();
    }
}


function startRecording(){
    const constraints = {
        audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
        var input = audio_context.createMediaStreamSource(stream);
        audio_stream = stream;
        recorder = new Recorder(input); 
        recorder && recorder.record();
    }).catch(function(err) {
        console.log('The following getUserMedia error occurred: ' + err);
     }); 
}

function stopRecording(callback, AudioFormat) {
    recorder && recorder.stop();
    audio_stream.getAudioTracks()[0].stop();
    if(typeof(callback) == "function"){
        recorder && recorder.exportWAV(function (blob) {
            callback(blob);
            recorder.clear();
        }, (AudioFormat || "audio/wav"));
    }

}
const saveNewBeat = () => {
    const name = document.getElementById("newBeat").value;
    if(name != ""){
        document.getElementById("audioPreview").title = name + ".wav"
    }
}


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
        document.getElementById("tempoEnabled").disabled = false;

    }else{
        document.getElementById("tempoEnabled").disabled = true;
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
    for (let i = 0; i < padGroups.length; i ++){
        const groupName = padGroups[i].firstElementChild.className;
        const el = document.createElement("div");
        el.className = groupName;
        el.addEventListener("click", (p) => {
            clickPadHandler(p, i);
        });
        padGroups[i].appendChild(el);
        beatsList[i].beats.push(el);

    }
    beatLength ++;
}

const showNewAudioForm = () => {
    document.getElementById("newAudioForm").style.display = "inline-block";
    document.getElementById("submit").disabled = true;    
}

function addNewAudio(e) {
    if (e.preventDefault){
        e.preventDefault();
    }
    closeNewAudio();
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
    audioPads.push({
        audioName: audioName,
        audioFile: audioFile,
        color: audioColor
    })
}


const expandFileForm = () =>{
    document.getElementById("addFileForm").style.display = "inline-block";
    document.getElementById("addFileForm").style.zIndex = 60;
}

const closeFileForm = (e) =>{
    document.getElementById("addFileForm").style.display = "none";
}

const closeNewAudio = () => {
    document.getElementById("newAudioForm").style.display = "none";
}

const closeNewRecording = () => {
    document.getElementById("newBeatPreview").style.display = "none";
    document.getElementById("audioPreview").pause();
}

const updateVolume = (event) =>{
    const baseName = event.target.id.substring(0, event.target.id.length - 5);
    const audio = document.querySelector("." + baseName + " > audio");
    audio.volume = event.target.value;
}

const checkForm = () => {
    let files = document.getElementById("fileInput").files;
    console.log(files)
    if (files.length != 0){
        document.getElementById("submit").disabled = false;
    }
}

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
