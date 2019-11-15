const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');

const app = express();

const port = 8000
const mongo_url = process.env.MONGO_URL || "mongodb://localhost/lxscars";

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json({}));



console.log(chalk.bold(`In dev, cors enabled for localhost:3000`));
app.use(cors({
    origin: 'http://localhost:3000'
}));

// get model
require('./user-model.js') 
// Globbing model files
// global.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
//     require(path.resolve(modelPath));
// });

// Connect Mongo DB
mongoose.connect(mongo_url);

const InfosysUser = mongoose.model('InfosysUser');

app.route('/api/addUser').post(function(req, res){
    console.log(req.body);
    const newUser = new InfosysUser(req.body);
    console.log(newUser);
    newUser.save(function(err, user){
        // console.log(err, user);
        if(err){
            return res.status(400).json({'message': 'something goes wrong'})
        }

        return res.status(200).json(user);
    });
});

// Start the app
app.listen(port, () => {
    console.log(chalk.bold(`Backend application started on port: ${port}`));
})