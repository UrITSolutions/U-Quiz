const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const _ = require('lodash');
const xls = require('node-xlsx');

const { User } = require('./model/model.user');
const { Result } = require('./model/model.result');

const PORT = 2000;

mongoose.connect('mongodb://ds113443.mlab.com:13443/lib_man', {
    auth: {
        user: 'richard@admin',
        password: 'successwillcome2u'
    }, useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB.');
});

// app.use((req, res, next)=>{
//     console.log('REQUEST')
// })
app.use(cors());
app.use(express.json());
app.post('/user', async (req, res) => {
    let data = await User.findOne({ phone: req.body.phone });
    if (!data) {
        try {
            let data = await User.create(_.pick(req.body, ['name', 'phone', 'church']))
            res.send({ status: '200', message: 'SUCCESS', data: data });
        } catch (err) {
            res.status(500).send(err);
        }
    } else if (data) {
        res.send({ status: '302', message: 'FOUND', data: data });
    } else if (err) {
        res.status(500).send(err);
    }

})

app.get('/questions', async (req, res) => {
    let path = __dirname + '/ques.xlsx';
    var data = xls.parse(path);
    data[0].data.splice(0, 1);
    res.send({ status: '200', message: 'SUCCESS', data: data[0].data });
})

app.post('/questions', async (req, res) => {
    var result = new Result();
    let answers = req.body.answers;
    result.user = req.body.user;
    result.answers = JSON.stringify(req.body.answers);
    result.time = req.body.timeTaken;
    result.result = 0;

    let path = __dirname + '/ques.xlsx';
    var data = xls.parse(path)[0].data;

    for (var i = 0; i < data.length; i++) {
        let row = data[i];
        console.log('ROW -> ', row[0]);
        console.log('ANSWER - > ', answers[row[0]]);
        console.log('CORRECT ANSWER -> ', row[6])
        console.log('-------------------------------------------------------------------')

        if (answers[row[0]] == row[6]) result.result = result.result + 1;
    }

    console.log(result);

    await Result.create(result)

    res.send({ status: '200', message: 'SUCCESS', data: {} });
})

app.get('/result', async (req, res) => {
    res.json(await Result.find().populate('user'));
})

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });