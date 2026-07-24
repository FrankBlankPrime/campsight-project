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
  let campsites = [...data.campsites]
  let site = campsites.find((campsite) => campsite.slug === slug)
  return site
}

console.log(getCampsiteBySlug("jenny-lake-campground"))

/**
 * Get all unique regions from the campsites
 * @returns {Array<string>} - Array of unique region names, sorted alphabetically
 */
function getUniqueRegions() {
  // TODO: Extract unique regions (park names) from all campsites
  // Hint: Use .map(), Set, and .sort()
  let regions = new Set([])
  let campsites = [...data.campsites]
  campsites.map((campsite) => regions.add(campsite.park))
  let regionsArray = [...regions]
  regionsArray.sort()
  return regionsArray
}

console.log(getUniqueRegions())
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
  let campsites = [...data.campsites]
  let amenitiesArray = []
  let amenitiesSet = new Set([])
  campsites.map((campsite) =>
    campsite.amenities.map((amenity) =>
      amenitiesArray.push(amenity)))
  if (sortByPopularity === false && limit === null) {
    amenitiesArray.map((amenity) => amenitiesSet.add(amenity))
    /* Alphabetical sorting */
    let sortedAmenities = [...amenitiesSet]
    sortedAmenities.sort()
    return sortedAmenities
  }
  if (sortByPopularity === false && limit !== null) {
    amenitiesArray.map((amenity) => amenitiesSet.add(amenity))
    let sortedAmenities = [...amenitiesSet]
    sortedAmenities.sort()
    return sortedAmenities.slice(0, (limit))
  }
  if (sortByPopularity === true && limit === null) {
    let amenitiesFrequency = {}
    amenitiesArray.forEach(amenity => {
      amenitiesFrequency[amenity] = (amenitiesFrequency[amenity] || 0) + 1
    })
    amenitiesArray.sort((a, b) => {
      amenitiesFrequency[b] - amenitiesFrequency[a]
    })
    amenitiesArray.map(amenity => {
      amenitiesSet.add(amenity)
    })
    let sortedAmenities = [...amenitiesSet]
    return sortedAmenities
  }
  if (sortByPopularity === true && limit !== null) {
    let amenitiesFrequency = {}
    amenitiesArray.forEach(amenity => {
      amenitiesFrequency[amenity] = (amenitiesFrequency[amenity] || 0) + 1
    })
    amenitiesArray.sort((a, b) => {
      amenitiesFrequency[b] - amenitiesFrequency[a]
    })
    amenitiesArray.map(amenity => {
      amenitiesSet.add(amenity)
    })
    let sortedAmenities = [...amenitiesSet]
    return sortedAmenities.slice(0, limit)
  }
}

console.log(getAmenities(true, 6))

/**
 * Get all reviews for a specific campsite
 * @param {string} campsiteId - The campsite ID (e.g., "cs-001")
 * @returns {Array<Object>} - Array of review objects for that campsite
 */
function getReviewsByCampsiteId(campsiteId) {
  // TODO: Filter and return all reviews for the given campsite ID
  let campsites = [...data.campsites]
  let reviewsArray = [...reviews]
  let siteReviews = reviewsArray.filter((review) => review.campsiteId === campsiteId)
  return siteReviews
}

console.log(getReviewsByCampsiteId("cs-002"))

// Export all functions
export {
  getCampsiteBySlug,
  getUniqueRegions,
  getAmenities,
  getReviewsByCampsiteId
};