// const express = require("express");
// const app = express();

// const port = 1337;

// // Add a route
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// // Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));

const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
