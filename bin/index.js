#!/usr/bin/env node
var ncp = require("ncp").ncp;
var server = require("pushstate-server");
var open = require("open");
var args = process.argv.slice(2);

if (args[0] === "build") {
  copyAdmin();
}
if (args[0] === "serve") {
  serve();
}

function copyAdmin() {
  ncp(__dirname + "/../build/", process.cwd() + "/build/admin", function(err) {
    ncp(
      process.cwd() + "/src/data/config.json",
      process.cwd() + "/build/admin/config.json",
      function(err) {
        console.log("Admin added");
      }
    );
  });
}

function serve() {
  server.start({
    port: 5000,
    directory: process.cwd() + "/build",
  });

  open("http://localhost:5000/admin");
}
