var express = require("express");
var router = express.Router();
var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  var query = `
  SELECT * FROM mahasiswa ORDER by nim DESC
  `;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      res.render("mahasiswa", {
        title: "Table Mahasiswa ITTP",
        action: "list",
        dataMahasiswa: data,
      });
    }
  });
});

router.get("/add", function (req, res, next) {
  res.render("mahasiswa", { title: "Pengisian Data Mahasiswa", action: "add" });
});

router.post("/add_mahasiswa", function (req, res, next) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jenis_kelamin = req.body.jenis_kelamin;
  var prodi = req.body.prodi;
  var ipk = req.body.ipk;

  var query = `
  INSERT INTO mahasiswa
  (nim, nama, jenis_kelamin, prodi, ipk)
  VALUES ("${nim}", "${nama}", "${jenis_kelamin}", "${prodi}", "${ipk}")
  `;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      res.redirect("/");
    }
  });
});

router.get("/edit/:nim", function (req, res, next) {
  var nim = req.params.nim;

  var query = `
  SELECT * FROM mahasiswa WHERE nim = "${nim}"
  `;

  database.query(query, function (error, data) {
    res.render("mahasiswa", {
      title: "Edit Data Mahasiswa",
      action: "edit",
      dataMahasiswa: data[0],
    });
  });
});

router.post("/edit/:nim", function (req, res, next) {
  var nim_id = req.params.nim;

  var nim = req.body.nim;
  var nama = req.body.nama;
  var jenis_kelamin = req.body.jenis_kelamin;
  var prodi = req.body.prodi;
  var ipk = req.body.ipk;

  var query = `
  UPDATE mahasiswa
  SET nim = "${nim}",
  nama = "${nama}",
  jenis_kelamin = "${jenis_kelamin}",
  prodi = "${prodi}",
  ipk = "${ipk}"
  `;

  database.query(query, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect("/");
    }
  });
});

router.get("/delete/:nim", function (req, res, next) {
  var nim = req.params.nim;

  var query = `
	DELETE FROM mahasiswa WHERE nim = "${nim}"
	`;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/");
    }
  });
});

module.exports = router;
