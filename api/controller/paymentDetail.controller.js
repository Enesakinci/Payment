const db = require('../config/mssql-connection.js');
const dbContext = require('../config/db-context')
var TYPES = require('tedious').TYPES;


module.exports = {
    //Get Methodu
    async GetAll(req, res) {
        var params = [];

        dbContext.getQuery("SELECT * FROM [Exam].[dbo].[PaymentDetail];", params, false, function(error, data) {
            return res.send(data)
        });
    },
    //Get where id 
    async GetPayment(req, res) {
        var params = [];
        console.log(req.params.id);
        dbContext.getQuery("SELECT * FROM [Exam].[dbo].[PaymentDetail] where PMId=" + req.params.id, params, false, function(error, data) {
            return res.send(data)
        });
    },
    //Ekleme işlemi
    async AddingData(req, res) {
        var parameters = [];

        parameters.push({ name: 'CardOwnerName', type: TYPES.VarChar, val: req.body.CardOwnerName });
        parameters.push({ name: 'CardNumber', type: TYPES.VarChar, val: req.body.CardNumber });
        parameters.push({ name: 'ExpirationDate', type: TYPES.VarChar, val: req.body.ExpirationDate });
        parameters.push({ name: 'CVV', type: TYPES.VarChar, val: req.body.CVV });
        dbContext.getQuery("Insert Into [Exam].[dbo].[PaymentDetail] (CardOwnerName,CardNumber,ExpirationDate,CVV) VALUES(@CardOwnerName,@CardNumber,@ExpirationDate,@CVV)", parameters, false, function(error, data) {
            // console.log(error);
            return res.json(data);
        });
    },
    //Güncelleme işlemi
    async UpdateData(req, res) {
        var parameters = [];
        parameters.push({ name: 'PMId', type: TYPES.Int, val: req.body.PMId });
        parameters.push({ name: 'CardOwnerName', type: TYPES.VarChar, val: req.body.CardOwnerName });
        parameters.push({ name: 'CardNumber', type: TYPES.VarChar, val: req.body.CardNumber });
        parameters.push({ name: 'ExpirationDate', type: TYPES.VarChar, val: req.body.ExpirationDate });
        parameters.push({ name: 'CVV', type: TYPES.VarChar, val: req.body.CVV });
        dbContext.getQuery("Update [Exam].[dbo].[PaymentDetail] Set CardOwnerName=@CardOwnerName,CardNumber=@CardNumber,ExpirationDate=@ExpirationDate,CVV=@CVV where PMId=@PMId", parameters, false, function(error, data) {
            // console.log(error);
            return res.json(data);
        });
    },
    //Silme işlemi
    async DeletePayment(req, res) {
        var params = [];
        console.log(req.params.id);
        dbContext.getQuery("Delete FROM [Exam].[dbo].[PaymentDetail] where PMId=" + req.params.id, params, false, function(error, data) {
            return res.send(data)
        });
    }
}