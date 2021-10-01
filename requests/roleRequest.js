const validation = require('../helpers/validate');

const validate = (req, res, next, validationRule) => {
    validation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const role = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "user_id": "required|string"
    }
    validate(req, res, next, validationRule)
}

module.exports = { 
    role
}