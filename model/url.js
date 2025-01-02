const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String, // Added type
            required: true,
            unique: true,
        },
        redirectUrl: {
            type: String,
            required: true,
        },
        visitHistory: [
            {
                timestamp: { type: Number }, // Corrected the structure of `timestamps`
            },
        ],
    },
    {
        timestamps: true, // Enables `createdAt` and `updatedAt` for the document
    }
);

module.exports = mongoose.model('Url', urlSchema);
