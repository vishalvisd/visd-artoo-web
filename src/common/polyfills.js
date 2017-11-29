/* eslint-disable no-extend-native */
Array.prototype.merge = function(/* variable number of arrays */){
  for(var i = 0; i < arguments.length; i++){
    var array = arguments[i];
    for(var j = 0; j < array.length; j++){
      if (this.indexOf(array[j]) === -1) {
        this.push(array[j]);
      }
    }
  }
  return this;
};
