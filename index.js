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

    app.post('/downloadpurchase', async (req, res) => {
        try {
            const formData = req.body;
            const doc = new PDFDocument();
            
            doc.fontSize(12);

            //---------------Start of pdf template------------------------
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
            
            **Mobile Care abides by all local laws and city ordinances within the state and city limits of location. Mobile Care does not tolerate dishonesty and stolen devices, and forgery of any customer.**`,).moveDown();

            //---------------Start of pdf template------------------------
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

    app.post('/downloadselling', async (req, res) => {
        try {
            const formData = req.body;
            const doc = new PDFDocument();
            
            doc.fontSize(12);

            //---------------Start of pdf template------------------------
            doc.text(`Phone Buying Contract
            
            ➛ You the customer authorize Mobile Care to purchase your personal device, with the understanding that once agreed amount has been given for the device, there will be no returns.
            ➛ You the customer understand that Mobile Care will run the device for non-payments, stolen, lost, and valid purchase date.
            ➛ Mobile Care also hold the right to ask for a receipt for proof of purchase.<
            ➛ In the event that your device is stolen, lost, not paid off, and does not have a valid purchase, Mobile Care has the right to refuse purchase, in certain cases will contact Law Enforcement.
            ➛ If you the customer report the phone lost or stolen, Mobile Care will first contact you, failure to comply will result in Mobile Care reporting to local Law Enforcement.
            ➛ Mobile Care will validate your ID upon receiving the device.
            ➛ If you are under the age of 18, Mobile Care will not purchase any products from you. Parents and Guardians must be present.
            
           NOTE: Mobile Care abides by all local laws and city ordinances within the state and city limits of location. Mobile Care does not tolerate dishonesty and stolen devices, and forgery of any such customer.`,).moveDown();

            //---------------Start of pdf template------------------------
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


    app.post('/downloadrepair', async (req, res) => {
        try {
            const formData = req.body;
            const doc = new PDFDocument();
            
            doc.fontSize(12);

            //---------------Start of pdf template------------------------
            doc.text(`Repair Terms & Conditions
            
           
    
    All specifications on the contract are subject to the following terms and conditions. You agree to be bound to these terms when you sign below. These are the Terms and Conditions which you, the customer, agree to and are applicable to the repair of your device by Mobile Care:
    
    ➛ You the customer have agreed upon price as indicated prior to inspection and repair. If Mobile Care finds any underlying damage, Mobile Care is not responsible. New Price, Terms and Conditions will be agreed upon, if you the customer chooses to fix any such underlying damage.
   
    ➛ You the customer will be subjected to a minimum $25 diagnostic fee for any of the following reasons:
    
    ➛ Cleaning service of any major parts.
   
    ➛ Diagnostic services

    ➛ If you choose to decline a repair after the service has been done, Mobile Care will charge you a $45 fee.
   
    ➛ All screens come with a 30/Day Warranty, Mobile Care has the right to void warranty for any of the following reasons:
  
    ➛ Customer phone is water damaged.
   
    ➛ Customer has dropped phone, with indication of LCD and/or digitizer crack, blemishes, or scratches on screen.
  
    ➛ Any underlying damage that has caused the screen to crack. (Ex: Bulging battery)

    ➛ All parts come with a 30 day Warranty, Mobile Care has the right to void warranty for any of such reason: (Ex: Charging Port, Battery, Camera, etc)
   
    ➛ Customer phone is water damaged.
  
    ➛ Customer has damaged the part, or allowed another repair location that is not affiliated with Mobile Care to repair damage.
   
    ➛ If Mobile Care, replaces your Proximity Sensor or Front Facing camera, Mobile Care is not responsible for Face Recognition (Face ID) being disabled. Replacing such part will disable such function.

    ➛ All warranties repairs returning to any Mobile Care locations by customer, will be asked for proof of purchase. Mobile Care has the right to deny any service if proof of purchase is not shown.
  
    ➛ Repairs done by Mobile Care will void manufacture warranty, but any repairs done by us will be backed by our Warranty Policy! (We are only affiliated with Akko
    
    Insurance)
   
    ➛ Any and all parts parts replaced on Apple Device are not genuine Apple Parts, but all parts are premium apple parts and will not affect the functionality of device,
    
    UNLESS part is related to functioning of Face ID.

    ➛ All Android screens are genuine Android Displays, but all small parts are not genuine android parts, but all parts are premium android parts and will not affect the
    
    functionality of device.

    
    ➛ Any such damage that we Mobile Care are responsible for, will be taken care of by Mobile Care, and will be back by our Warranty Policy.

    ➛ Any and all devices will lose water resistance rating after damage and/ or repair. Mobile Care is not responsible for Water Damage!
    
    ➛ Mobile Care is not responsible for any device that is Disabled and/or Unavailable after repair.

    ➛ Mobile Care is not responsible for any software or network related issues of Customer device.
    
    ➛ Mobile Care will dispose of any device, if you the customer leave the device for more than 45 days.
   
   NOTE: 
    Mobile Care abides by all local laws and city ordinances within the state and city limits of location. Mobile Care does not tolerate dishonesty and stolen devices, and forgery of any such customer.`,).moveDown();

            //---------------Start of pdf template------------------------
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