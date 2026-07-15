// Import data from other files
import { data } from './campsites.js';
import { reviews } from './reviews.js';

/**
 * Get a single campsite by its slug identifier
 * @param {string} slug - The campsite slug (e.g., "jenny-lake-campground")
 * @returns {Object|undefined} - The campsite object if found, undefined otherwise
 */
function getCampsiteBySlug(slug) {
  // TODO: Find and return the campsite with the matching slug
  
}

/**
 * Get all unique regions from the campsites
 * @returns {Array<string>} - Array of unique region names, sorted alphabetically
 */
function getUniqueRegions() {
  // TODO: Extract unique regions (park names) from all campsites
  // Hint: Use .map(), Set, and .sort()
  
}

/**
 * Get all unique amenities, optionally sorted by popularity
 * @param {boolean} sortByPopularity - If true, sort by frequency; if false, sort alphabetically
 * @param {number} limit - Optional limit on number of amenities to return
 * @returns {Array<string>} - Array of amenity names
 */
function getAmenities(sortByPopularity = false, limit = null) {
  // TODO: Get all unique amenities from all campsites
  // If sortByPopularity is true, sort by how often they appear
  // If false, sort alphabetically
  // If limit is provided, return only that many amenities
  
}

/**
 * Get all reviews for a specific campsite
 * @param {string} campsiteId - The campsite ID (e.g., "cs-001")
 * @returns {Array<Object>} - Array of review objects for that campsite
 */
function getReviewsByCampsiteId(campsiteId) {
  // TODO: Filter and return all reviews for the given campsite ID
  
}

// Export all functions
export {
  getCampsiteBySlug,
  getUniqueRegions,
  getAmenities,
  getReviewsByCampsiteId
};