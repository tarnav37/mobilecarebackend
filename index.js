const express = require('express');
const app = express();
const db = require('./config/database');
const port = 3333;
const cors = require('cors');
app.use(cors())
app.use(express.json());
const mongoose = require('mongoose');
const PurchaseForm = new mongoose.Schema({
    date: String,
    Devicepur: String,
    Deviceamt: String,
    name: String,
    phoneNo: String,
    email: String,
    Address: String,
    Dl: String,
    signature: String,
});

const RepairForm = {
    date: {
        type: String
    },
    deviceModel: {
        type: String
    },
    customerName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    partOrder: {
        type: String
    },
    technicianName: {
        type: String
    },
    status: {
        type: String
    },
    deposit: {
        type: String
    },
    totalAmount: {
        type: String
    },
    balance: {
        type: String
    }
};


const SellingForm = new mongoose.Schema({
    date: String,
    name: String,
    phoneNo: String,
    email: String,
    licenseNumber: String,
    Address: String,
    samemail: String,
    iemail: String,
    pc: String,
    devmo: String,
    Imei: String,
    purprice: String,
    sremail: String
});
const PurchasingData = mongoose.model('Purchase Data', PurchaseForm);
const SellingData = mongoose.model('Selling Data', SellingForm);
const RepairData = mongoose.model('Repair Data', RepairForm);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/purchaseform', async (req, res) => {
    try {
        const formData = req.body;
        console.log(req.body)

        const savedFormData = await PurchasingData.create(formData);

        res.status(200).json({ message: 'Form data submitted successfully', formData: savedFormData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/sellingform', async (req, res) => {
    try {
        const formData = req.body;
        console.log(req.body)

        const savedFormData = await SellingData.create(formData);

        res.status(200).json({ message: 'Form data submitted successfully', formData: savedFormData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/repairform', async (req, res) => {
    try {
        const formData = req.body;
        console.log(req.body)

        const savedFormData = await RepairData.create(formData);

        res.status(200).json({ message: 'Form data submitted successfully', formData: savedFormData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/repairdata', async (req, res) => {
    try {
        const repairData = await RepairData.find();
        res.status(200).json({ repairData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
