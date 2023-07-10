const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const auth = require('./routes/auth');
const { BadRequestError, NotFoundError } = require("./utils/errors");
const bcrypt = require("bcrypt")
const db = require("./db")
const security = require("./middlewear/security")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//for every request, check if a token exists
//in the authorization header
//if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt)

app.use('/auth', auth);


app.use((req, res, next) => {
    return next(new NotFoundError());
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status }
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
