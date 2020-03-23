const axios = require('axios');
const express = require('express');

let app = express();

app.listen(3000, function () {});

app.get(['/', '/api'], function (req, res) {
    let home = {};
    home.message = 'Welcome to The System of Actions';
    res.send(JSON.stringify(home));
});

app.get('/api/actions', function (req, res) {
    axios.all([
        axios.get('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + req.query.name.toUpperCase() + '.SA&apikey=JL4DMOTNC0MSDWEX')
    ]).then(axios.spread((response) => {
        let data = response.data[Object.keys(response.data)[0]];
        res.send(JSON.stringify(translateInfo(data)));
    })).catch(error => {
        console.log(error);
    });
});

function translateInfo(data) {
    let obj = {};
    obj.name = data[Object.keys(data)[0]].split('.')[0];
    obj.open_price = data[Object.keys(data)[1]];
    obj.high_price = data[Object.keys(data)[2]];
    obj.low_price = data[Object.keys(data)[3]];
    obj.current_price = data[Object.keys(data)[4]];
    obj.previous_close = data[Object.keys(data)[7]];
    obj.change = data[Object.keys(data)[8]];
    obj.change_percent = data[Object.keys(data)[9]];
    return obj;
}