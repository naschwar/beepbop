var audioPads = {
    audioPads: [
  {
      audioName: "tom",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/tom.wav",
      color: "0x7daad5"
  },
  {
      audioName: "clap",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/clap.wav",
      color: "0x98D000"
  },
  {
      audioName: "kick",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/kick.wav",
      color: "0xF4FF24"
  },
  {
      audioName: "openhat",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/openhat.wav",
      color: "0xF8BD3C"
  },
  {
      audioName: "boom",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/boom.wav",
      color: "0xdf9bcd"
  },
  {
      audioName: "ride",
      audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/ride.wav",
      color: "0xEC1FFF"
  },
  {
    audioName: "snare",
    audioFile: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1147877/snare.wav",
    color: "0x391FFF"
}
]
}

var source = document.getElementById("groups-template").innerHTML; 
var template = Handlebars.compile(source); 
document.querySelector("#groups-container").innerHTML += template(audioPads);

source = document.getElementById("pads-template").innerHTML;
template = Handlebars.compile(source);
document.querySelector("#pads-container").innerHTML += template(audioPads);