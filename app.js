const express = require('express');
const googleWalletUtils = require('./routes/googleWalletUtils');
/* Initialize App */
const app = express();
app.use(express.json({limit: '10mb'}));
/* Main Code */
app.use("/api/google-wallet-utils", googleWalletUtils);
app.listen(3000, () => console.log("Server running on port 3000"));