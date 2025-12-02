const { v4: uuidv4 } = require('uuid');

/**
 * Generate a unique ID
 * Uses UUID v4 for globally unique identifiers
 * 
 * @returns {string} Unique identifier
 */
const generateId = () => {
  return uuidv4();
};

module.exports = { generateId };
