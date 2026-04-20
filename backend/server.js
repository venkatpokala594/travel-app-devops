const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
        res.json({ message: "Login Successful ✅" });
    } else {
        res.json({ message: "Invalid Credentials ❌" });
    }
});

// Flight API
app.get('/flights', (req, res) => {
    const flights = [
        { from: "Hyderabad", to: "Delhi", price: 5000 },
        { from: "Mumbai", to: "Chennai", price: 4000 }
    ];
    res.json(flights);
});

app.listen(5000, () => console.log("Server running on 5000"));