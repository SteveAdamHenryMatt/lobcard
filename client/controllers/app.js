angular.module('snapCard.app', [])

.controller('AppController', function ($scope, $route, $q, fileReader) {
  // drawing info will go here.
  var takePicture = document.querySelector('#takePicture');

  //listens for the browser event of uploading or capturing a picture.
  takePicture.onchange = function (event) {
    // Get a reference to the taken picture or chosen file
    var files = event.target.files,
      file;
    if (files && files.length > 0) {
      file = files[0];
      var myFile = fileReader.readAsDataUrl(file, $scope);
      myFile.then(function(file){
        console.log("The file is, ", file);
        $scope.imageSrc = file;
      });
    }
  };

  $scope.imageSrc = "";
 });
