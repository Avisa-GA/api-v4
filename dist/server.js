"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var app = (0, express_1["default"])();
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handler/user");
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
/*
app.use((req, res, next) => {
  req.shh_secret = 'doggy'
  next()
})
*/
app.use(express_1["default"].static('static'));
app.get('/', function (req, res, next) {
    setTimeout(function () {
        next(Error('not implemented'));
    }, 1000);
    // res.sendFile(path.resolve('src/pages/index.html'))
});
app.use('/api', auth_1.protect, router_1["default"]);
app.post('/user', user_1.createNewUser);
app.post('/signin', user_1.signin);
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    }
    else {
        res.status(500).json({ message: 'oops that\'s on us' });
    }
});
exports["default"] = app;
//# sourceMappingURL=server.js.map