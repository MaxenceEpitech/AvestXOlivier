const user = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        const phoneNumber = req.headers['phone-number'];
        
        if (!phoneNumber) {
            return res.status(401).json({ success: false, message: 'Un numéro de téléphone requis pour l\'authentification' });
        }
        
       
        let user = await User.findOne({ phoneNumber });
        
        if (!user) {
            user = await User.create({ phoneNumber });
        }
        
        
        req.user = user;
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        res.status(500).json({ success: false, message: 'Erreur d\'authentification' });
    }
};

module.exports = authenticate;