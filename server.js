const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());

// Helper function to read users from JSON file
const getUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./users.json', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
};

// Middleware to check the authorization header
app.use((req, res, next) => {
        console.log('req is: ', req.originalUrl);
        const token = req.headers.authorization;
        const refreshToken = req.headers['x-refresh-token'];
        console.log('auth header is: ', token);
        console.log('x-refresh-token is: ', refreshToken);

        if (refreshToken) {
            if (refreshToken < 50) {
                res.status(401).send('Unauthorized: Access is denied due to invalid credentials.');
            } else {
                next();
            }
            return;
        }

        if (token) {
            const authValue = parseInt(token, 10);
            if (authValue < 50) {
                res.status(401).send('Unauthorized: Access is denied due to invalid credentials.');
            } else {
                next(); // Authorization is successful, continue to the next middleware
            }
            return;
        }

        next();
    }
);

// Endpoint to get refresh token
app.get('/refresh', async (req, res) => {
    try {
        console.log('888888888888888888888')
        const refreshHeader = req.headers;
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, 2000)
        })

        await promise;
        return res.json({token: '95', refreshToken: '95'});

        console.log('refresh header is: ', refreshHeader);
    } catch (err) {
        console.log('errrrrrr: ', err);
        res.status(500).send('Error reading users data.');
    }
});

// Endpoint to get anonymous token
app.get('/anonymous-token', async (req, res) => {
    try {
        res.json({token: '75', refreshToken: '75'});
    } catch (err) {
        res.status(500).send('Error reading users data.');
    }
});

// Endpoint to get all users
app.get('/users1', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error reading users data.');
    }
});

// Endpoint to get all users
app.get('/users2', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error reading users data.');
    }
});

// Endpoint to get all users
app.get('/users3', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error reading users data.');
    }
});

// Endpoint to get a specific user by ID
app.get('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const users = await getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error reading users data.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});