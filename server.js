const express = require('express');
const bodyParser = require('body-parser');
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const app = express();
const git = simpleGit();
const REPO_PATH = path.join(__dirname, 'NEW-bingo'); // Adjust the path to your repository

app.use(bodyParser.json());

// Route to save user data
app.post('/save', async (req, res) => {
    const { filename, content } = req.body;

    try {
        const filePath = path.join(REPO_PATH, filename);
        fs.writeFileSync(filePath, content);

        await git.cwd(REPO_PATH);
        await git.add(filePath);
        await git.commit(`Add/Update ${filename}`);
        await git.push('origin', 'main');

        res.status(200).send('Data saved to Git repository');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

// Route to get all user data
app.get('/users', async (req, res) => {
    try {
        const files = fs.readdirSync(REPO_PATH);
        const users = files.map(file => {
            const content = fs.readFileSync(path.join(REPO_PATH, file));
            return JSON.parse(content);
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
