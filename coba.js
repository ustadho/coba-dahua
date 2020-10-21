var ipcamera = require("./dahua");
var http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Options:
var options = {
  host: "192.168.10.113",
  port: "80",
  user: "admin",
  pass: "admin123",
  log: true,
};

var dahua = new ipcamera.dahua(options);

// console.log('CEK DH :', dahua)
// Switch to Day Profile
// dahua.nightProfile();

// PTZ Go to preset 10
// dahua.ptzPreset(10);

// Monitor Camera Alarms
// dahua.getUserInfoAll();
// dahua.getLog("2020-07-01 00:00:00", "2020-12-31 24:00:00");

// dahua.getAlarmAccessRecordInfo("2020-07-01 00:00:00", "2020-12-31 24:00:00")
// dahua.getAccessRecordByCard("2020-07-01 00:00:00", "2020-12-31 24:00:00", "2", "500")
dahua.getAccessControl();

dahua.on("alarm", function (code, action, index) {
  if (code === "VideoBlind" && action === "Start")
    console.log("Video Blind Detected");
  if (code === "VideoBlind" && action === "Stop")
    console.log("Video Blind Ended");
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
  if (code === "HeatImagingTemper" && action === "Start")
    console.log("HeatImagingTemper!");
  if (code === "HeatImagingTemper" && action === "Stop")
    console.log("HeatImagingTemper!");
  if (code === "FaceDetection" && action === "Start")
    console.log("FaceDetection start!");
  if (code === "FaceDetection" && action === "Stop")
    console.log("FaceDetection stop!");
  if (code === "TemperatureAlarm" && action === "Start")
    console.log("TemperatureAlarm start!");
  if (code === "TemperatureAlarm" && action === "Stop")
    console.log("TemperatureAlarm stop!");
});
dahua.on("accessControl", function (
  cardNo,
  cardName,
  createTime,
  currentTemperature,
  type
) {
  console.log("-----------------Access Control-------------------");
  console.log("cardNo: " + cardNo);
  console.log("cardName: " + cardName);
  console.log("createTime: " + createTime);
  console.log("currentTemperature: " + currentTemperature);
  console.log("type: " + type);
  console.log("-----------------Access Control-------------------");
  console.log("\n");
});

// Find Files
var query = {
  channel: "0",
  startTime: "2020-10-01 09:00:00",
  endTime: "2020-10-29 12:00:00",
  types: ["jpg", "dav"], // [ “dav”, “jpg”, “mp4” ]
  count: 10, // max. 100
};

dahua.findFiles(query);
dahua.on("filesFound", function (data) {
  console.log("filesFound:", data);
});

dahua.on("face-recognition", function (data) {
  console.log("Recognition :", data);
});

// Save File
var fileMeta = {
  Channel: "0",
  EndTime: "2020-10-01 10:45:00",
  FilePath:
    "/var/www/sd/2018-05-19/001/dav/10/10.36.45-10.45.00[R][0@0][0].dav",
  StartTime: "2018-10-29 10:36:45",
  Type: "dav",
};

// dahua.saveFile(fileMeta);
// dahua.on("saveFile", function (msg) {
//   console.log("File saved!");
// });

// Get a snapshot
// dahua.getSnapshot();
dahua.on("getSnapshot", function (msg) {
  console.log("getSnapshot" + msg);
});
dahua.on("ptzStatus", function (msg) {
  console.log(msg);
});
