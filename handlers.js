const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const treeify = require('treeify');

const commandHandler = (req, res) => {
    const command = req.params.command;
    const resp = data["commands"][command];

    if (resp != null) {
        res.send(JSON.stringify({"status": "ok", "response": resp}));
    } else {
        res.send(JSON.stringify({"status": "err", "response": ""}));
    }
};

const scriptHandler = (req, res) => {
    const script = req.params.script;
    let resp = data["scripts"][script];

    if (script === 'resume') {
        resp = treeify.asTree(resp, true);
    }

    if (resp != null) {
        res.send(JSON.stringify({"status": "ok", "response": resp}));
    } else {
        res.send(JSON.stringify({"status": "err", "response": ""}));
    }
};

const fileHandler = (req, res) => {
    const file = req.params.file;
    const resp = data["files"][file];

    if (resp != null) {
        res.send(JSON.stringify({"status": "ok", "response": resp}));
    } else {
        res.send(JSON.stringify({"status": "err", "response": ""}));
    }
};

const errorHandler = (req, res, next) => {
    res.send(JSON.stringify({"version": "1.0", "url": "/api/v1"}));
    next()
};

const setHeadersHandler = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
};

module.exports = {
    commandHandler: commandHandler,
    scriptHandler: scriptHandler,
    fileHandler: fileHandler,
    errorHandler: errorHandler,
    setHeadersHandler: setHeadersHandler
};