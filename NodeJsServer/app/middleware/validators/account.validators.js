const { body } = require('express-validator');

const ACCOUNT_TYPES = ['Renter', 'Landlord'];

exports.createRules = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be 3–20 characters')
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    body('accountType')
        .isIn(ACCOUNT_TYPES)
        .withMessage(`accountType must be one of: ${ACCOUNT_TYPES.join(', ')}`),
    body('idCard')
        .trim()
        .notEmpty()
        .withMessage('ID card number is required'),
    body('email')
        .isEmail()
        .withMessage('A valid email address is required')
        .normalizeEmail(),
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),
];

exports.loginRules = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];
