function getFullMediaURL(s) {
    return cordova.file.applicationDirectory + 'www/audio/button-1.mp3'
  }

  function playMP3() {
    let src = getFullMediaURL();
    var myMedia =
      new Media(src,
        function () { },
        function (e) { alert('Media Error: ' + JSON.stringify(e)); }
      );
    myMedia.play();
    myMedia.setVolume('1.0');
  }