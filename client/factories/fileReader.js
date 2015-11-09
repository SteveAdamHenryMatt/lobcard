angular.module("snapCard.factories", [])

.factory("fileReader", function($q){
  var myfile;
  var getFile = function(){
    return myFile;
  };

  var setFile = function(file){
    myFile = file;
  };

  var onLoad = function(reader, deferred, scope) {
      return function () {
          //console.log(scope);
          scope.$apply(function () {
              deferred.resolve(reader.result);
          });
      };
  };

  var onError = function (reader, deferred, scope) {
      return function () {
          scope.$apply(function () {
              deferred.reject(reader.result);
          });
      };
  };

  var getReader = function(deferred, scope) {
      var reader = new FileReader();
      //console.log("The reader is, ", reader);
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      return reader;
  };

  var readAsDataURL = function (file, scope) {
      var deferred = $q.defer();
      //console.log("Inside readAsDataURL");
      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);

      return deferred.promise;
  };

  return {
      readAsDataUrl: readAsDataURL
  };

});