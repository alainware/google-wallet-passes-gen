/* Libraries */
const express = require('express');
const {GoogleAuth} = require("google-auth-library");
const router = express.Router();
/* Google Settings */
// Issuer ID
const issuerId = `${process.env.GOOGLE_WALLET_ISSUER_ID}`;
// Class ID
const classId = `${issuerId}.${process.env.GOOGLE_WALLET_PASS_CLASS_DEV}`;
// Base URL
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';
// Google Application Credentials
const credentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// HTTP Client
const httpClient = new GoogleAuth({
    credentials: credentials,
    scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

/* Methods */
async function createPassClass(req, res) {
    // Create Generic Pass Class
    let genericClass = {
        "id": `${classId}`,
        "classTemplateInfo": {
            "cardTemplateOverride": {
                "cardRowTemplateInfos": [
                    {
                        "twoItems": {
                            "startItem": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['no_credencial']"
                                        }
                                    ]
                                }
                            },
                            "endItem": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['periodo']"
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    {
                        "oneItem": {
                            "item": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['validez']"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        }
    };

    let response;
    try {
        // Check if the class exists already
        response = await httpClient.request({
            url: `${baseUrl}/genericClass/${classId}`,
            method: 'GET'
        });
        res.status(400).send({error: 400, message: 'Class already exists.'});
    } catch (err) {
        if (err.response && err.response.status === 404) {
            // Class does not exist, create it
            response = await httpClient.request({
                url: `${baseUrl}/genericClass`,
                method: 'POST',
                data: genericClass
            });
            res.status(400).send({success: 200, message: 'Class was created successfully.', content: response});
        } else {
            res.status(500).send({error: 500, message: 'An error occurred while creating the class.', content: err});
        }
    }
}

/* Routes */
router.post('/create-pass-class', async (req, res) => {
    try {
        await createPassClass(req, res);
    } catch (error) {
        res.status(500).send("Could not create pass class!");
    }
});

module.exports = router;