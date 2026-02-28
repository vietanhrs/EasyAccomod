const { body } = require('express-validator');

exports.createRules = [
    body('postName')
        .trim()
        .notEmpty()
        .withMessage('Post title (postName) is required')
        .isLength({ max: 500 })
        .withMessage('Post title must be at most 500 characters'),
    body('postWeek')
        .optional()
        .isInt({ min: 1, max: 52 })
        .withMessage('postWeek must be between 1 and 52'),
];

exports.updateRules = [
    body('postName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Post title cannot be empty')
        .isLength({ max: 500 })
        .withMessage('Post title must be at most 500 characters'),
];
