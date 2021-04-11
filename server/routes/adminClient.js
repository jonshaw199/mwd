const express = require("express");
const router = express.Router();
var path = require("path");

router.get("/", async (req, res) => {
  router.use(
    express.static(
      path.join(__dirname, "..", "..", "clients/admin-client/build")
    )
  );
  return res.sendFile(
    path.resolve(__dirname + "/../../clients/admin-client/build/index.html")
  );
});

module.exports = router;
