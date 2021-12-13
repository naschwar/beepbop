var audioPads = {
    audioPads: [
  {
      audioName: "tom",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/tom.wav",
      color: "rgb(94, 114, 62)"
  },
  {
      audioName: "clap",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/clap.wav",
      color: "rgb(152, 208, 0)"
  },
  {
      audioName: "kick",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/kick.wav",
      color: "rgb(244, 255, 36)"
  },
  {
      audioName: "openhat",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/openhat.wav",
      color: "rgb(248, 189, 60)"
  },
  {
      audioName: "boom",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/boom.wav",
      color: "rgb(208, 129, 87)"
  },
  {
      audioName: "ride",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/ride.wav",
      color: "rgb(148, 2, 124)"
  },
  {
    audioName: "snare",
    audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/snare.wav",
    color: "rgb(5, 61, 182)"
}
]
}

var source = document.getElementById("groups-template").innerHTML; 
var template = Handlebars.compile(source); 
document.querySelector("#groups-container").innerHTML += template(audioPads);

source = document.getElementById("pads-template").innerHTML;
template = Handlebars.compile(source);
document.querySelector("#pads-container").innerHTML += template(audioPads);