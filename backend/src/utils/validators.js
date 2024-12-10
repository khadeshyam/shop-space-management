const validator = require('validator');

const validateUserInput = (username, email, password) => {
    if (!username || !email || !password) {
        return 'Username, email, and password are required.';
    }

    if (!validator.isEmail(email)) {
        return 'Invalid email format.';
    }

    if (!validator.isLength(password, { min: 8 })) {
        return 'Password must be at least 8 characters long.';
    }

    if (!validator.isLength(username, { min: 3 })) {
        return 'Username must be at least 3 characters long.';
    }

    return null;
};

const validateSpaceInput = (name, type, capacity, price_per_unit) => {
    if (!name || !type || capacity === undefined || price_per_unit === undefined) {
        return 'Name, type, capacity, and price_per_unit are required.';
    }

    if (!validator.isLength(name, { min: 1 })) {
        return 'Name must be at least 1 character long.';
    }

    if (!['hanger', 'shelf'].includes(type)) {
        return 'Type must be either "hanger" or "shelf".';
    }

    if (!validator.isInt(capacity.toString(), { min: 1 })) {
        return 'Capacity must be a positive integer.';
    }

    if (!validator.isFloat(price_per_unit.toString(), { min: 0 })) {
        return 'Price per unit must be a positive number.';
    }

    return null;
};

module.exports = {
    validateUserInput,
    validateSpaceInput
};