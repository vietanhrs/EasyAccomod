const { body } = require('express-validator');

exports.createRules = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Comment content cannot be empty')
        .isLength({ max: 2000 })
        .withMessage('Comment content must be at most 2000 characters'),
    body('postID')
        .isInt({ min: 1 })
        .withMessage('postID must be a positive integer'),
];

exports.updateRules = [
    body('content')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Comment content cannot be empty')
        .isLength({ max: 2000 })
        .withMessage('Comment content must be at most 2000 characters'),
];
