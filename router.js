const express = require('express');
const router = express.Router();

router.post('/ping', async (req, res) => {
    try {
        return res.status(200).send({ success: true, message: 'pong' });
    } catch (error) {
        ErrorHandler(req, res, error);
    }
});

module.exports = router;
