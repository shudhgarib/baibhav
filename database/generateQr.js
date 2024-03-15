// generateQRCode.js

const qr = require('qrcode');
const fs = require('fs');

// Function to generate a random string (for QR code data)
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate QR code and save it to a file
async function generateQRCode() {
  try {
    const qrData = generateRandomString(10); // Generate random data for QR code
    const qrImage = await qr.toBuffer(qrData, { errorCorrectionLevel: 'H' });
    fs.writeFileSync('qrcode.png', qrImage); // Save QR code image to file
    console.log('QR code generated successfully');
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

// Generate QR code initially
generateQRCode();

// Refresh QR code every minute
setInterval(generateQRCode, 60000); // 60000 milliseconds = 1 minute
