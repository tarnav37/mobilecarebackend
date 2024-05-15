const express = require('express');
    const app = express();
    const db = require('./config/database');
    const port = 3333;
    const cors = require('cors');
    app.use(cors())
    app.use(express.json());
    const mongoose = require('mongoose');
    const PDFDocument = require('pdfkit');
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
        beingrepair: {
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
        },
        notes: {
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

    app.post('/download', async (req, res) => {
        try {
            const formData = req.body;
            const doc = new PDFDocument();
            
            doc.fontSize(12);
            doc.text(`Customer Device Purchasing

            All specifications on the contract are subject to the following terms and conditions. You agree to be bound to these terms when you sign below. These are the Terms and Conditions which you, the customer, agree to and are applicable to the purchase of your device by Mobile Care!
            
            
            ➛ You the customer understand that Mobile Care is selling this device to you in "AS IS" conditions.
            
            ➛ Devices come certified pre-owned with original parts, unless specified by Mobile Care otherwise.
            
            ➛ All purchased devices come with a 30 Day warranty from Mobile Care.
            
            ➛ If you the customer damage the device, then Mobile Care is not responsible, but we can offer you a discount on repairs!
            
            ➛ All devices come carrier unlock!
            
            ➛ Device Unlock information is available upon request.
            
            ➛ Mobile Care is not responsible for carrier services that are not provided by us!
            
            ➛ Device purchasing by Debit/Credit Card will be subject to a ID verification and signature!
            
            ➛ Devices sold by cash will be checked for illegal tender!
            
            **Mobile Care abides by all local laws and city ordinances within the state and city limits of location. Mobile Care does not tolerate dishonesty and stolen devices, and forgery of any customer.**`, { align: 'center' }).moveDown();
            doc.text('Submitted Form Data', { align: 'center' }).moveDown();
            Object.entries(formData).forEach(([key, value]) => {
                doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
                doc.moveDown();
            });
            doc.end();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=form_data.pdf');

            doc.pipe(res);
        } catch (error) {  
            console.error('Error generating PDF:', error);
            res.status(500).json({ error: 'Error generating PDF' });
        }
    });


    app.put('/repairform/:id', async (req, res) => {
        try {
            const repairId = req.params.id;
            const formData = req.body;
            console.log(req.body);
    
            const updatedFormData = await RepairData.findByIdAndUpdate(repairId, formData, { new: true });
    
            if (!updatedFormData) {
                return res.status(404).json({ error: 'Repair data not found' });
            }
    
            res.status(200).json({ message: 'Form data updated successfully', formData: updatedFormData });
        } catch (error) {
            console.error('Error updating repair data:', error);
            res.status(500).json({ error: 'Error updating repair data' });
        }
    });
    

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });