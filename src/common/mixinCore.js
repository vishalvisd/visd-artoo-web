let mixin = function (comp, toMix) {
  let allPropertyNames = toMix.map((v) => {
    return Object.getOwnPropertyNames(v.prototype);
  });
  let m = allPropertyNames.reduce(function (a, b) {
    return a.concat(b);
  }, []).filter(function (item, pos, arr) {
    return arr.indexOf(item) === pos && item !== "constructor";
  });
  m.forEach((method) => {
    var old = comp.prototype[method];
    comp.prototype[method] = function () {
      toMix.forEach((v) => {
        if (typeof v.prototype[method] === "function") {
          v.prototype[method].apply(this, arguments);
        }
      });
      if (typeof old === "function") {
        old.apply(this, arguments);
      }
    };
  });
};

module.exports = mixin;
