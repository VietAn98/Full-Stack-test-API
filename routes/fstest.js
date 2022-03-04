var express = require("express");
var router = express.Router();
var fs = require("fs");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fields = ["name", "id", "count"];
router.post("/objectLiteral", urlencodedParser, function (req, res) {
  var file = fs.readFileSync("data.json");
  var data = JSON.parse(file);
  var obj = {};

  fields.map((ele) => {
    if (data[ele] === req.body[ele]) {
      return;
    } else {
      Object.assign(obj, {
        [`${ele}`]: {
          old:
            (isNaN(data[ele]) && data[ele]) || data[ele] >= 0
              ? data[ele]
              : null,
          new:
            (isNaN(req.body[ele]) && req.body[ele]) || req.body[ele] >= 0
              ? req.body[ele]
              : null,
        },
      });
      return obj;
    }
  });
  res.send(obj);
});

module.exports = router;
