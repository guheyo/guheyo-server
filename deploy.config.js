module.exports = {
  apps : [{
    name   : "server",
    script : "./dist/server.js",
    instances: 2,
    exec_mode: "cluster"
  }]
}