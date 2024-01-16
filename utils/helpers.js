var Database = require("../types_db");

var Price = Database["public"]["Tables"]["prices"]["Row"];

var getURL = function () {
  var url =
    (process && process.env && process.env.NEXT_PUBLIC_SITE_URL) || // Set this to your site URL in production env.
    (process && process.env && process.env.NEXT_PUBLIC_VERCEL_URL) || // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : "https://" + url;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : url + "/";
  return url;
};

var postData = function (options) {
  var url = options.url;
  var data = options.data;

  console.log("posting,", url, data);

  return fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  }).then(function (res) {
    if (!res.ok) {
      console.log("Error in postData", { url: url, data: data, res: res });

      throw Error(res.statusText);
    }

    return res.json();
  });
};

var toDateTime = function (secs) {
  var t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

module.exports = {
  getURL: getURL,
  postData: postData,
  toDateTime: toDateTime,
};
