const express = require('express');
const handlers = require('./handlers.js');

const app = express();
const router = express.Router();

router.use(handlers.setHeadersHandler);
router.get('/api/v1/command/:command', handlers.commandHandler);
router.get('/api/v1/script/:script', handlers.scriptHandler);
router.get('/api/v1/file/:file', handlers.fileHandler);
router.use(handlers.errorHandler);

app.use("/", router);

const server = app.listen(80);