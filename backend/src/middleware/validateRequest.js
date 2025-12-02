const { ZodError } = require('zod');

/**
 * Validation Middleware Factory
 * Creates a middleware that validates request body against a Zod schema
 * 
 * @param {ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      // Parse and validate the request body
      const validatedData = schema.parse(req.body);
      
      // Replace body with validated/transformed data
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod validation errors
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        console.log('❌ Validation failed:', errors);

        return res.status(400).json({
          message: 'Validation failed',
          errors,
        });
      }
      
      // Pass other errors to error handler
      next(error);
    }
  };
};

module.exports = validateRequest;
