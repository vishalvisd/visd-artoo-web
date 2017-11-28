const headEle = document.getElementsByTagName("head")[0];

const addToHead = function (path, type) {
  debugger;
  let url;
  if (path.includes("http://") || path.includes("https://")) {
    url = path;
  } else {
    url = `${window.STATIC_SERVER_URL}/${path}`;
  }
  if (type === "link"){
    let link = document.createElement("link");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    link.setAttribute("rel", "stylesheet");
    headEle.appendChild(link);
  } else if (type === "script") {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    headEle.appendChild(script);
  }
};

const loadVersionJSON = function (callback) {
  debugger;
  window.fetch(`${window.STATIC_SERVER_URL}/version.json?hash=${Date.now()}`)
    .then((data)=>data.json())
    .then(callback);
};

loadVersionJSON(function ({gitVersion}) {
  debugger;
  addToHead(`bundle.js?hash=${gitVersion}`, "script");
});

addToHead("http://localhost:36010/livereload.js", "script");
