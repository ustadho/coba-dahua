var ipcamera = require("./dahua");

// Options:
var options = {
  host: "192.168.1.100",
  port: "80",
  user: "admin",
  pass: "password123",
  log: false,
};

var dahua = new ipcamera.dahua(options);

// Switch to Day Profile
dahua.nightProfile();

// PTZ Go to preset 10
dahua.ptzPreset(10);

// Monitor Camera Alarms
dahua.on("alarm", function (code, action, index) {
  if (code === "VideoMotion" && action === "Start")
    console.log("Video Motion Detected");
  if (code === "VideoMotion" && action === "Stop")
    console.log("Video Motion Ended");
  if (code === "AlarmLocal" && action === "Start")
    console.log("Local Alarm Triggered: " + index);
  if (code === "AlarmLocal" && action === "Stop")
    console.log("Local Alarm Ended: " + index);
  if (code === "VideoLoss" && action === "Start") console.log("Video Lost!");
  if (code === "VideoLoss" && action === "Stop") console.log("Video Found!");
  if (code === "VideoBlind" && action === "Start") console.log("Video Blind!");
  if (code === "VideoBlind" && action === "Stop") console.log("Video Unblind!");
});

// Find Files
var query = {
  channel: "0",
  startTime: "2018-5-9 09:00:00",
  endTime: "2018-5-9 12:00:00",
  types: ["jpg", "dav"], // [ “dav”, “jpg”, “mp4” ]
  count: 10, // max. 100
};

dahua.findFiles(query);
dahua.on("filesFound", function (data) {
  console.log("filesFound:", data);
});

// Save File
var fileMeta = {
  Channel: "0",
  EndTime: "2018-05-19 10:45:00",
  FilePath: "/mnt/sd/2018-05-19/001/dav/10/10.36.45-10.45.00[R][0@0][0].dav",
  StartTime: "2018-05-19 10:36:45",
  Type: "dav",
};

dahua.saveFile(fileMeta);
dahua.on("saveFile", function (msg) {
  console.log("File saved!");
});

// Get a snapshot
dahua.getSnapshot();
dahua.on("getSnapshot", function (msg) {
  console.log(msg);
});
