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

const register = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "name": "required|string",
        "password": "required|string|min:6",
    }
    validate(req, res, next, validationRule)
}

const login = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string",
    }
    validate(req, res, next, validationRule)
}

module.exports = { 
  register,
  login
}