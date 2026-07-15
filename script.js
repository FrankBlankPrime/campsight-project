// Import data and API functions
import { data } from './campsites.js';
import { getUniqueRegions, getAmenities, getCampsiteBySlug, getReviewsByCampsiteId } from './api.js';

/* ========================================================================
   USER STORY 1: Set up filter dropdowns and checkboxes on page load
   ======================================================================== */

/**
 * Convert an amenity name to a valid HTML ID
 * @param {string} amenity - Amenity name (e.g., "Hot Showers")
 * @returns {string} - Valid ID string (e.g., "hot-showers")
 */
function amenityToId(amenity) {
  // TODO: Convert to lowercase and replace spaces with hyphens
  
}

/**
 * Fill the location dropdown with all unique regions
 */
function populateLocationFilter() {
  // TODO: Get the location select element (#location)
  // Call getUniqueRegions() from api.js
  // Loop through regions and create <option> elements
  // Append each option to the select
  
}

/**
 * Create checkbox inputs for the most popular amenities
 */
function populateAmenitiesFilter() {
  // TODO: Get the amenities fieldset element (.amenities-checkboxes)
  // Call getAmenities(true, 7) to get top 7 amenities sorted by popularity
  // For each amenity:
  //   - Create a div with class "checkbox-group"
  //   - Create an <input type="checkbox"> with proper id, name, and value
  //   - Create a <label> that matches the checkbox id
  //   - Append to the fieldset
  
}

/* ========================================================================
   USER STORY 2: Update price display in real-time as user drags slider
   ======================================================================== */

/**
 * Update the price display text when the price slider changes
 */
function updatePriceDisplay() {
  // TODO: Get the price input and price display elements
  // Update the display text to show the current slider value
  
}

// Event listener: Update display as slider moves
// TODO: In init(), attach this to the price input's 'input' event
// Example: priceInput.addEventListener('input', updatePriceDisplay);

/* ========================================================================
   USER STORY 3: Show how many campsites match the current filters
   ======================================================================== */

/**
 * Update the results count display
 * @param {number} count - Number of campsites currently displayed
 */
function updateResultsCount(count) {
  // TODO: Get the results count element (#results-count)
  // Update text based on whether showing all or filtered results
  
}

/* ========================================================================
   USER STORY 4: Display campsite cards in a grid
   ======================================================================== */

/**
 * Create a single campsite card element with all its data
 * @param {Object} campsite - A campsite object from the data
 * @returns {HTMLElement} - The complete card element
 */
function createCampsiteCard(campsite) {
  // TODO: Create an <a> element with:
  //   - href: #${campsite.slug}
  //   - className: "campsite-card-link"
  //   - dataset.slug: campsite.slug
  // Add click event listener to show detail page
  // Set innerHTML with card structure:
  //   - Card image with thumbnail
  //   - Pet friendly tag (conditional)
  //   - Save button
  //   - Name, rating, location, price
  // Return the card element
  
}

/**
 * Render an array of campsites to the grid on the page
 * @param {Array} campsites - Array of campsite objects to display
 */
function renderCampsiteCards(campsites) {
  // TODO: Get the grid container element (.cards-grid)
  // Clear existing content
  // Loop through campsites array
  // For each campsite, create a card and append to grid
  
}

/* ========================================================================
   USER STORY 5: Filter and sort campsites based on user selections
   ======================================================================== */

/**
 * Get the currently selected sort option
 * @returns {string} - Sort value like "featured", "price-low", etc.
 */
function getSortValue() {
  // TODO: Get the sort select element (#sort)
  // Return its value, or default to "featured"
  
}

/**
 * Sort an array of campsites based on the selected sort option
 * @param {Array} campsites - Array of campsite objects
 * @param {string} sortBy - Sort option: "featured", "price-low", "price-high", or "rating"
 * @returns {Array} - New sorted array
 */
function sortCampsites(campsites, sortBy) {
  // TODO: Create a copy of the array
  // Use a switch statement to handle each sort type
  // Return the sorted copy
  
}

/**
 * Extract all current filter values from the form inputs
 * @returns {Object} - Object with filter criteria (region, maxPrice, minRating, minOccupancy, amenities)
 */
function getFilterValues() {
  // TODO: Get all form elements
  // Extract values from:
  //   - Location select
  //   - Price input
  //   - Rating radio buttons (parse the value)
  //   - Occupancy select
  //   - Amenity checkboxes (collect all checked values)
  // Return an object with all filter values
  
}

/**
 * Filter and sort the campsite data based on current form values
 * @returns {Array} - Filtered and sorted array of campsites
 */
function applyFilters() {
  // TODO: Get current filter values
  // Start with all campsites
  // Apply each filter using .filter():
  //   - Region (if selected)
  //   - Max price
  //   - Min rating (if > 0)
  //   - Min occupancy (if > 0)
  //   - Amenities (must have ALL selected amenities)
  // Apply sorting
  // Return the filtered and sorted array
  
}

/**
 * Orchestrate what happens when any filter changes
 */
function handleFilterChange() {
  // TODO: Call applyFilters() to get filtered results
  // Update the results count display
  // Re-render the campsite cards with new results
  
}

/**
 * Set up all event listeners for filter inputs
 */
function setupFilters() {
  // TODO: Get form element and all filter inputs
  // Add event listeners:
  //   - Form-level 'change' event (catches all inputs)
  //   - Price slider: 'input' for display update, 'change' for filtering
  //   - Sort dropdown: 'change' event
  //   - Reset button: 'click' event (use setTimeout for form reset)
  
}

/* ========================================================================
   USER STORY 6: Navigate between list view and campsite detail view
   ======================================================================== */

/**
 * Show the campsite list view and hide the detail view
 */
function showCampsiteList() {
  // TODO: Remove "hidden" class from campsites-view-page
  // Add "hidden" class to campsite-detail-page
  // Scroll to top of page
  
}

/**
 * Show the detail page for a specific campsite
 * @param {string} slug - The campsite slug identifier
 */
function showCampsiteDetail(slug) {
  // TODO: Get the campsite data using getCampsiteBySlug()
  // If not found, log error and return
  // Call populateCampsiteDetail() to fill in the content
  // Hide list view, show detail view
  // Scroll to top
  // Update URL hash
  
}

/**
 * Populate the entire detail page with campsite data
 * @param {Object} campsite - The campsite to display
 */
function populateCampsiteDetail(campsite) {
  // TODO: Get the detail page element
  // Get reviews using getReviewsByCampsiteId()
  
  // Populate title section with name, rating, review count, location
  
  // Populate image carousel:
  //   - Set up carousel HTML with prev/next buttons
  //   - Track currentImageIndex
  //   - Add click listeners to navigation buttons
  
  // Populate article content:
  //   - About section
  //   - Campsite types
  //   - Amenities (use .map() and .join())
  //   - Activities
  //   - Season & terrain info
  //   - Reviews section (map through reviews or show "no reviews" message)
  
  // Populate booking form with price, guest input, date inputs, reserve button
  
}

/* ========================================================================
   USER STORY 7: Initialize the app and handle browser navigation
   ======================================================================== */

/**
 * Initialize the entire application when the page loads
 */
function init() {
  // TODO: Call all setup functions:
  //   - populateLocationFilter()
  //   - populateAmenitiesFilter()
  //   - updatePriceDisplay()
  //   - setupFilters()
  //   - updateResultsCount()
  //   - renderCampsiteCards() with all campsites
  
  // Set up back button click listener
  
  // Handle deep linking (check if URL has a hash on load)
  
  // Listen for hash changes (browser back/forward navigation)
  
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
