/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
// global var 
var myMedia = null;
var volumeValue = 0.5;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // media button 
    document.getElementById("playAudio").addEventListener("click", playAudio);
    document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
    document.getElementById("stopAudio").addEventListener("click", stopAudio);
    document.getElementById("volumeUp").addEventListener("click", volumeUp);
    document.getElementById("volumeDown").addEventListener("click", volumeDown);
    document.getElementById("getPosition").addEventListener("click", getPosition);
    document.getElementById("getDuration").addEventListener("click", getDuration);

    // cordova media capture 
    document.getElementById("audioCapture").addEventListener("click", audioCapture);
    document.getElementById("imageCapture").addEventListener("click", imageCapture);
    document.getElementById("videoCapture").addEventListener("click", videoCapture);
}



function getFullMediaURL(s) {
    return cordova.file.applicationDirectory + 'www/audio/music.mp3'
}

// media function 
function playAudio() {
    var src = getFullMediaURL();
    //var src = "/Music/audio.mp3";
    if (myMedia === null) {
        myMedia = new Media(src, onSuccess, onError);
        function onSuccess() {
            console.log("playAudio Success");
        }
        function onError(error) {
            alert("playAudio Error: " + error.code);
        }
    }
    myMedia.play();
}

function pauseAudio() {
    if (myMedia) {
        myMedia.pause();
    }
}

function stopAudio() {
    if (myMedia) {
        myMedia.stop();
    }
    myMedia = null;
}


// Set volumeUp & Down function

function volumeUp() {
    if (myMedia && volumeValue < 1) {
        myMedia.setVolume(volumeValue += 0.1);
    }
}

function volumeDown() {
    if (myMedia && volumeValue > 0) {
        myMedia.setVolume(volumeValue -= 0.1);
    }
}

function getPosition() {
    myMedia.getCurrentPosition(
        // success callback
        function (position) {
            // if (position > -1) {
            //     console.log((position) + " sec");
            // }
            alert("The Position Of This Audio Is " + position);
        },
        // error callback
        function (e) {
            //console.log("Error getting pos=" + e);
            alert("Error getting pos=" + e);
        }
    );
}

// function getDuration() {
//     myMedia.getDuration(
//         // success callback
//         function (duration) {
//             // if (position > -1) {
//             //     console.log((position) + " sec");
//             // }
//             alert("The Duration Of This Audio Is " + duration);
//         },
//         // error callback
//         function (e) {
//             //console.log("Error getting pos=" + e);
//             alert("Error getting dur=" + e);
//         }
//     );
// }


// Get duration
// var counter = 0;
// var timerDur = setInterval(function () {
//     counter = counter + 100;
//     if (counter > 2000) {
//         clearInterval(timerDur);
//     }
//     var dur = myMedia.getDuration();
//     if (dur > 0) {
//         clearInterval(timerDur);
//         document.getElementById('audio_duration').innerHTML = (dur) + " sec";
//     }
// }, 100);


// cordova media capture function here 
function audioCapture() {

    var options = {
        limit: 1,
        duration: 10
    };


    // function (mediaFiles) {
    //     var i, path, len;
    //     for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    //         path = mediaFiles[i].fullPath;
    //         console.log(mediaFiles);
    //     }
    // }

    function onSuccess(mediaFiles) {
        alert("inside success");
        var i, path, len;
        for (i = 0, len <= mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
        }
    }

    // function onError(error) {
    //     alert(error.code);
    //     console.log(error);
    //     navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    // }

    function onError(error) {
        alert(error.code);
        console.log(error);
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    navigator.device.capture.captureAudio(onSuccess, onError, options);
}

// camera function 
function imageCapture() {
    var options = {
        limit: 1
    };
    navigator.device.capture.captureImage(onSuccess, onError, options);
    function onSuccess(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log(mediaFiles);
        }
    }
    function onError(error) {
        alert(error.code);
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
}

// VIDEO Function
function videoCapture() {
    var options = {
        limit: 1,
        duration: 10
    };
    navigator.device.capture.captureVideo(onSuccess, onError, options);
    function onSuccess(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log(mediaFiles);
        }
    }
    function onError(error) {
        alert(error.code);
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
}


