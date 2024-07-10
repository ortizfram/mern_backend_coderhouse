
// errors.js
const ErrorTypes = {
 INVALID_PARAM: 'INVALID_PARAM',
 PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
 CART_ERROR: 'CART_ERROR',
 // otros tipos de error...
};

const ErrorMessages = {
 [ErrorTypes.INVALID_PARAM]: 'Invalid parameter provided.',
 [ErrorTypes.PRODUCT_NOT_FOUND]: 'Product not found.',
 [ErrorTypes.CART_ERROR]: 'Error adding product to cart.',
 // otros mensajes de error...
};

function createCustomError(type, message) {
 const error = new Error(message || ErrorMessages[type]);
 error.type = type;
 return error;
}

module.exports = {
 ErrorTypes,
 createCustomError,
};
