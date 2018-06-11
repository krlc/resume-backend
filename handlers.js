const fs = require('fs');
const treeify = require('treeify');
const protobuf = require("protobufjs");

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const skeleton = fs.readFileSync('TerminalData.proto', 'utf8');

const root = protobuf.parse(skeleton, { keepCase: true }).root;
const TerminalData = root.lookupType("TerminalData");

const commandHandler = (req, res) => {
    const command = req.params.command;
    const resp = data["commands"][command];

    if (resp != null) {
        const message = TerminalData.create({ status: "ok", response: resp });
        res.send(TerminalData.encode(message).finish());
    } else {
        const message = TerminalData.create({ status: "err" });
        res.send(TerminalData.encode(message).finish());
    }
};

const scriptHandler = (req, res) => {
    const script = req.params.script;
    let resp = data["scripts"][script];

    if (script === 'resume') {
        resp = treeify.asTree(resp, true);
    }

    if (resp != null) {
        const message = TerminalData.create({ status: "ok", response: resp });
        res.send(TerminalData.encode(message).finish());
    } else {
        const message = TerminalData.create({ status: "err" });
        res.send(TerminalData.encode(message).finish());
    }
};

const fileHandler = (req, res) => {
    const file = req.params.file;
    const resp = data["files"][file];

    if (resp != null) {
        const message = TerminalData.create({ status: "ok", response: resp });
        res.send(TerminalData.encode(message).finish());
    } else {
        const message = TerminalData.create({ status: "err" });
        res.send(TerminalData.encode(message).finish());
    }
};

const errorHandler = (req, res, next) => {
    const message = TerminalData.create({ status: "err" });
    res.send(TerminalData.encode(message).finish());

    next()
};

const setHeadersHandler = (req, res, next) => {
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Transfer-Encoding", "binary");
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