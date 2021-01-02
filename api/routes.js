let express = require('express');
let app = express.Router();
let paymentController = require('./controller/paymentDetail.controller')

// yönlendirici sınıf gelen url'leri controller kısmına taşıdık.
app.get('/PaymentDetail', paymentController.GetAll);
app.get('/PaymentDetail/:id', paymentController.GetPayment);
app.post('/PaymentDetail/', paymentController.AddingData);
app.put('/PaymentDetail/:id', paymentController.UpdateData);
app.delete('/PaymentDetail/:id', paymentController.DeletePayment);

module.exports = app;