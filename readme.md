# Campsite Project

Welcome to the Campsite project! This project will show that you can use vanilla Javascript and HTML to create a Single Page App with dynamic and interactive elements.

## Getting Started

1. **Design Reference**: View the design file at [Figma](https://www.figma.com/design/MaL8xrQMYJSkO9wd1yatDE/Frank?node-id=24-2&p=f&t=jixCk9SkBo0pHbFg-0)
2. **Local Development**: Open `index.html` with a local server (e.g., Live Server extension in VS Code)
3. **File Structure**: Review how the JavaScript files are linked together in `index.html`

## Project Structure

- **index.html** - Main HTML structure
- **styles.css** - All styling
- **script.js** - Main application logic
- **campsites.js** - Data file containing campsite information (exported as `data`)
- **reviews.js** - Data file containing review information (exported as `reviews`)
- **api.js** - API functions you'll create to access and filter data

---

## Your Tasks

### Part 1: API.js - Data Access Functions

Create reusable functions that retrieve and format data from the campsite and review files. These functions should be pure and focused on data manipulation only (no Document manipulation).

#### Function 1: `getCampsiteBySlug(slug)`
**Purpose**: Find and return a single campsite by its slug identifier.

**Parameters**:
- `slug` (string) - The unique slug identifier (e.g., "jenny-lake-campground")

**Returns**: 
- The campsite object if found
- `undefined` if not found

**How it works**:
1. Uses the `data` object from campsites.js
2. Searches through `data.campsites` array
4. Returns the matching campsite object

**Example usage**:
```javascript
const campsite = getCampsiteBySlug("jenny-lake-campground");
console.log(campsite.name); // "Jenny Lake Campground"
```

---

#### Function 2: `getUniqueRegions()`
**Purpose**: Extract all unique regions from the campsites to populate filter dropdowns.

**Parameters**: None

**Returns**: 
- Array of unique region strings, sorted alphabetically

**How it works**:
1. Map through all campsites to extract the `park` property
2. Use Javascript `Set` to remove duplicates 
     * [Watch this Youtube video](https://www.youtube.com/watch?v=OUtFqs_l-fk)
3. Convert the Set back into an Array and sort alphabetically
4. Return the sorted array

**Example usage**:
```javascript
const regions = getUniqueRegions();
// ["Grand Teton National Park", "Yosemite National Park", "Zion National Park"]
```

---

#### Function 3: `getAmenities(sortByPopularity = false, limit = null)`
**Purpose**: Get all unique amenities, optionally sorted by how frequently they appear across campsites.

**Parameters**:
- `sortByPopularity` (boolean, optional) - If `true`, sort by frequency (most common first); if `false`, sort alphabetically
- `limit` (number, optional) - If provided, return only this many amenities (useful for showing top N most popular)

**Returns**: 
- Array of amenity strings

**How it works**:
1. Loop through all campsites and their amenities arrays
2. Count the frequency of each amenity using an object or Map
3. If `sortByPopularity` is false:
   - Return unique amenities sorted alphabetically
4. If `sortByPopularity` is true:
   - Sort by count (descending), then alphabetically for ties
   - Return the sorted amenity names
5. If `limit` is provided, slice the array to return only that many items

**Example usage**:
```javascript
const amenitiesAlpha = getAmenities();
// ["Drinking Water", "Electric Hookup", "Picnic Table", ...]

const amenitiesPopular = getAmenities(true);
// ["Restrooms", "Drinking Water", ...] (most common first)

const topSeven = getAmenities(true, 7);
// ["Restrooms", "Drinking Water", ...] (only first 7)
```

---

#### Function 4: `getReviewsByCampsiteId(campsiteId)`
**Purpose**: Retrieve all reviews for a specific campsite.

**Parameters**:
- `campsiteId` (string) - The campsite ID (e.g., "cs-001")

**Returns**: 
- Array of review objects for that campsite
- Empty array if no reviews found

**How it works**:
1. Import the `reviews` array from reviews.js
2. Use `.filter()` to find all reviews where `campsiteId` matches the parameter
3. Return the filtered array

**Example usage**:
```javascript
const reviews = getReviewsByCampsiteId("cs-001");
console.log(reviews.length); // number of reviews for that campsite
```

---

### Part 2: Script.js - Interactive UI Functions

This file contains the functions that manipulate the DOM and create interactive elements. The functions are organized by **user stories** - groups of related functions that accomplish a specific feature.

### Understanding the Single Page Application (SPA) Architecture

This app is a **Single Page Application** (SPA) - the page never reloads, but content changes dynamically:

- **Two Views**: The app has two main views - a list of campsite cards and a detail page for a single campsite
- **Hash-based Navigation**: Uses URL hash (#jenny-lake-campground) to track which view to show
- **Show/Hide Pattern**: Instead of loading new pages, we hide one view and show another using CSS classes

**How the SPA flow works**:
1. User clicks a campsite card → URL hash changes → detail page shows, list hides
2. User clicks back button → hash clears → list shows, detail hides
3. User can share a URL with a hash → page loads and shows the correct campsite detail directly

---

### How Everything Connects: The init() and Event Listener Flow

Understanding how your functions are called is crucial. Here's the big picture:

**When the page first loads:**
1. The browser loads `index.html` which includes `<script type="module" src="script.js">`
2. At the bottom of `script.js`, there's code that waits for the DOM  to be ready, then calls `init()`
 * DOM - *Document Object Model*:  the actual JS Object that represents the HTML page, ex: `console.log(Document)`
3. **`init()`** - Calls all the functions that set up the page's dynamic data and interactivity:
   - `populateLocationFilter()` → fills the location dropdown
   - `populateAmenitiesFilter()` → creates amenity checkboxes
   - `updatePriceDisplay()` → sets initial price display
   - `setupFilters()` → **attaches all event listeners** (this is key!)
   - `updateResultsCount()` → shows initial count
   - `renderCampsiteCards()` → displays all campsites

**After the page loads, everything happens through event listeners:**
- **Filter changes** → Changing a filter should change the view in realtime
- **Price slider drag** → Dragging the price filter will filter data in realtime and update the display
- **Campsite card click** → When a campsite is clicked, it opens the campsite listing page
- **Back button click** → Shows the Campsites list
- **URL hash change** → Changes which page is in view

**Think of it like a chain reaction:**
```
User interaction → Event fires → Listener calls function → Function updates document
```

**Key insight**: You write the functions, but you don't call them directly everywhere. Instead:
- Some are called once in `init()` to set up the page
- Most are called by event listeners that respond to user actions
- Some functions call other functions (e.g., `handleFilterChange()` calls three other functions)

---

## User Story 1: Set up filter dropdowns and checkboxes on page load

**What the user sees**: When the page loads, the location dropdown and amenity checkboxes are populated with options from the data.

### Function: `amenityToId(amenity)`
**Purpose**: Convert an amenity name into a valid HTML ID attribute to use for checkboxes.

**Parameters**:
- `amenity` (string) - Amenity name like "Hot Showers"

**Returns**: Valid ID string (e.g., "hot-showers")

**How it works**:
1. Convert to lowercase
2. Replace spaces with hyphens using regex `.replace(/\s+/g, '-')`

**Example**:
```javascript
amenityToId("Hot Showers"); // "hot-showers"
```

---

### Function: `populateLocationFilter()`
**Purpose**: Fill the location dropdown with all unique regions.

**How it works**:
1. Get the location select element (`#location`)
2. Call `getUniqueRegions()` from api.js
3. Loop through regions
4. For each region:
   - Create an `<option>` element
   - Set the `value` and `textContent` to the region name
   - Append to the select element

---

### Function: `populateAmenitiesFilter()`
**Purpose**: Create checkbox inputs for the most popular amenities.

**How it works**:
1. Get the amenities fieldset element (`.amenities-checkboxes`)
2. Call `getAmenities(true, 7)` to get top 7 amenities sorted by popularity
3. For each amenity:
   - Create a div with class "checkbox-group"
   - Create an `<input type="checkbox">` with:
     - `id`: Use `amenityToId()` helper
     - `name`: "amenities"
     - `value`: The amenity name
   - Create a `<label>` that matches the checkbox id
   - Append checkbox and label to div, then div to fieldset

**HTML structure you're creating**:
```html
<div class="checkbox-group">
  <input type="checkbox" id="showers" name="amenities" value="Showers">
  <label for="showers">Showers</label>
</div>
```

---

## User Story 2: Update price display in real-time as user drags slider

**What the user sees**: As they drag the price slider, the display text updates to show the current price value.

### Function: `updatePriceDisplay()`
**Purpose**: Update the price display text when the price slider changes.

**Parameters**: None

**How it works**:
1. Get the price input element (`#price`)
2. Get the price display element (`#price-per-night`)
3. Update the display's text to show `$` + the slider value

**Event listener needed**:
```javascript
// In setupFilters(), attach this to the slider's 'input' event:
priceInput.addEventListener('input', updatePriceDisplay);
```

**Where it's called**: 
- In `init()` to set the initial price display
- By the price slider's `'input'` event as the user drags

---

## User Story 3: Show how many campsites match the current filters

**What the user sees**: Text that says "Showing X of Y campsites" updates as they change filters.

### Function: `updateResultsCount(count)`
**Purpose**: Update the text showing how many campsites are displayed.

**Parameters**:
- `count` (number) - Number of campsites currently displayed

**How it works**:
1. Get the results count element (`#results-count`)
2. If count equals total campsites: "Showing all X campsites"
3. If count is less: "Showing X of Y campsites"

**Where it's called**: 
- In `init()` to show initial count
- In `handleFilterChange()` after filtering

---

## User Story 4: Display campsite cards in a grid

**What the user sees**: A grid of campsite cards, each showing an image, name, rating, location, and price.

### Function: `createCampsiteCard(campsite)`
**Purpose**: Create a single campsite card element with all its data.

**Parameters**:
- `campsite` (object) - A campsite object from the data

**Returns**: An `<a>` element (the complete card)

**How it works**:
1. Create an `<a>` element with:
   - `href`: `#${campsite.slug}` (for hash navigation)
   - `className`: "campsite-card-link"
   - `dataset.slug`: Store the slug for easy access
2. Add a click event listener:
   - Call `e.preventDefault()` to prevent default link behavior
   - Call `showCampsiteDetail(campsite.slug)`
3. Set `.innerHTML` to build the card structure (see placeholder HTML in index.html):
   - Card image with thumbnail as background
   - Pet friendly tag (conditional: only if `campsite.petFriendly === true`)
   - Save button with heart icon
   - Name, rating, location, price
4. Return the complete card element

**Key concepts**:
- Template literals with `${}` for dynamic data
- Conditional rendering: `${condition ? 'html' : ''}`
- Dataset attributes for storing data on elements
- **Event listener is added INSIDE this function** (attached to each card as it's created)
  - This is different from `setupFilters()` which attaches listeners to existing elements
  - Here, we create the element AND attach its listener in the same function
  - Each card gets its own click listener that knows which campsite to show

---

### Function: `renderCampsiteCards(campsites)`
**Purpose**: Render an array of campsites to the grid on the page.

**Parameters**:
- `campsites` (array) - Array of campsite objects to display

**How it works**:
1. Get the grid container element (`.cards-grid`)
2. Clear existing content: `grid.innerHTML = ''`
3. Loop through campsites array with `.forEach()`
4. For each campsite:
   - Call `createCampsiteCard(campsite)` to create the card element
   - Append the card to the grid
5. Error handling: If grid element not found, log an error

**Where it's called**: 
- In `init()` to render all campsites initially
- In `handleFilterChange()` to re-render filtered results

---

## User Story 5: Filter and sort campsites based on user selections

**What the user sees**: When they change any filter (location, price, rating, occupancy, amenities) or sort option, the campsite grid updates to show only matching results in the desired order.

### Function: `getSortValue()`
**Purpose**: Get the currently selected sort option from the dropdown.

**Parameters**: None

**Returns**: String value like "featured", "price-low", "price-high", or "rating"

**How it works**:
1. Get the sort select element (`#sort`)
2. Return its current value, or default to "featured" if not found

---

### Function: `sortCampsites(campsites, sortBy)`
**Purpose**: Sort an array of campsites based on the selected sort option.

**Parameters**:
- `campsites` (array) - Array of campsite objects
- `sortBy` (string) - Sort option: "featured", "price-low", "price-high", or "rating"

**Returns**: New sorted array (doesn't modify original)

**How it works**:
1. Create a copy of the array with spread operator `[...campsites]`
2. Use a switch statement to handle each sort type:
   - `"price-low"`: Sort by pricePerNight ascending
   - `"price-high"`: Sort by pricePerNight descending  
   - `"rating"`: Sort by rating descending
   - `"featured"` or default: Return as-is
3. Return the sorted copy

**Tip**: Use `.sort()` with compare functions: `(a, b) => a.price - b.price` for ascending

---

### Function: `getFilterValues()`
**Purpose**: Extract all current filter values from the form inputs.

**Parameters**: None

**Returns**: Object with filter criteria:
```javascript
{
  region: "Grand Teton National Park",
  maxPrice: 150,
  minRating: 4,
  minOccupancy: 4,
  amenities: ["Showers", "Electric Hookup"]
}
```

**How it works**:
1. Get all form elements (location select, price input, rating radios, occupancy select, amenity checkboxes)
2. Extract values:
   - For radio buttons: Loop through, check which is `checked`, parse the value
   - For checkboxes: Loop through all amenity checkboxes, collect values of checked ones
3. Return an object with all filter values

---

### Function: `applyFilters()`
**Purpose**: Filter and sort the campsite data based on current form values.

**Parameters**: None

**Returns**: Filtered and sorted array of campsites

**How it works**:
1. Call `getFilterValues()` to get current filters
2. Start with all campsites: `let filtered = [...data.campsites]`
3. Apply each filter using `.filter()`:
   - **Region**: Keep only campsites where `park` matches selected region (if one is selected)
   - **Price**: Keep only campsites where `pricePerNight <= maxPrice`
   - **Rating**: Keep only campsites where `rating >= minRating`
   - **Occupancy**: Keep only campsites where `maxOccupancyPerSite >= minOccupancy`
   - **Amenities**: Keep only campsites that have ALL selected amenities
     - Use `.every()`: `filters.amenities.every(amenity => campsite.amenities.includes(amenity))`
4. Get sort option and call `sortCampsites(filtered, sortBy)`
5. Return the filtered and sorted array

**Key concept**: Chain filters together - each `.filter()` returns a new array that feeds into the next filter.

---

### Function: `handleFilterChange()`
**Purpose**: Orchestrate what happens when any filter changes. **This function is called BY event listeners (set up in `setupFilters()`) whenever the user changes a filter.**

**How it works**:
1. Call `applyFilters()` to get filtered results
2. Call `updateResultsCount(filtered.length)` to update count display
3. Call `renderCampsiteCards(filtered)` to re-render cards with new results

**This is the central coordinator** for filtering and re-rendering! Think of it as the "update the page" function that gets triggered by user actions.

**When it's called**:
- User changes location dropdown → listener fires → calls this
- User checks/unchecks amenity → listener fires → calls this  
- User changes rating radio → listener fires → calls this
- User changes occupancy → listener fires → calls this
- User changes sort dropdown → listener fires → calls this

---

### Function: `setupFilters()`
**Purpose**: Set up all event listeners for filter inputs. **This is your event listener hub - called once by `init()`, it makes all the filters interactive!**

**How it works**:
1. Get form element and all filter inputs
2. Add event listeners:
   - **Form-level**: `form.addEventListener('change', handleFilterChange)` - catches any input change
   - **Price slider**: Two listeners:
     - `'input'`: Calls `updatePriceDisplay` in real-time as user drags
     - `'change'`: Calls `handleFilterChange` when user releases slider
   - **Sort dropdown**: `'change'` event calls `handleFilterChange`
   - **Reset button**: `'click'` event - use `setTimeout()` to wait for form reset, then update display and filters

**Important concepts**:
- **Event delegation**: One listener on the form catches all inputs inside it
- **Input vs Change events**: 
  - `'input'` fires continuously as user types/drags
  - `'change'` fires when user finishes (blur or release)
- **setTimeout with 0**: Lets the browser finish resetting the form before your code runs

**This is where all filter listeners are attached in one place!** After this function runs (during `init()`), all your filters are live and waiting for user interaction.

---

## User Story 6: Navigate between list view and campsite detail view

**What the user sees**: Click a campsite card to see full details. Click back button to return to the list.

### Function: `showCampsiteList()`
**Purpose**: Show the campsite list view and hide the detail view.

**How it works**:
1. Get `#campsites-view-page` and remove "hidden" class
2. Get `#campsite-detail-page` and add "hidden" class
3. Scroll to top of page with `window.scrollTo(0, 0)`

**Event listener needed**:
```javascript
// In init(), attach this to the back button:
backButton.addEventListener('click', () => {
  showCampsiteList();
  window.location.hash = ''; // Clear the URL hash
});
```

---

### Function: `showCampsiteDetail(slug)`
**Purpose**: Show the detail page for a specific campsite.

**Parameters**:
- `slug` (string) - The campsite slug identifier

**How it works**:
1. Use `getCampsiteBySlug(slug)` to get the campsite data
2. If not found, log an error and return
3. Call `populateCampsiteDetail(campsite)` to fill in the content
4. Hide list view, show detail view
5. Scroll to top
6. Update URL hash with `window.location.hash = slug`

**Event listener**: This is called by the click listener in `createCampsiteCard()`

---

### Function: `populateCampsiteDetail(campsite)`
**Purpose**: Populate the entire detail page with campsite data.

**Parameters**:
- `campsite` (object) - The campsite to display

**How it works** (this is complex - break it into sections):

1. **Get reviews**: Call `getReviewsByCampsiteId(campsite.id)` from api.js

2. **Populate title section**: Set `.innerHTML` with:
   - Campsite name as `<h1>`
   - Rating, review count, location

3. **Populate image carousel**:
   - Get images array (or use thumbnail if no images)
   - Set up carousel HTML with prev/next buttons and slide counter
   - Track `currentImageIndex` variable
   - Add click listeners to prev/next buttons (inside this function):
     - Update index (wrap around with modulo operator)
     - Update the background image
     - Update the counter display

4. **Populate article content**: Build sections for:
   - About/description
   - Campsite types
   - Amenities (map to list)
   - Activities
   - Season & terrain info
   - **Reviews section**: 
     - If reviews exist: Map through them to create review HTML
     - If no reviews: Show "No reviews yet" message
     - Star rating: Use `'★'.repeat(rating)` for filled stars

5. **Populate booking form**: Create form with:
   - Price display
   - Guest count input (max from campsite data)
   - Check-in/check-out date inputs
   - Reserve button

**Key concepts**:
- Array `.map()` to convert data to HTML: `amenities.map(a => `<div>${a}</div>`).join('')`
- String `.repeat()` for stars: `'★'.repeat(5)` makes "★★★★★"
- Modulo operator `%` for wrapping: `(index + 1) % length` loops back to 0
- Closures: Event listeners inside functions can access outer variables like `currentImageIndex`

---

## User Story 7: Initialize the app and handle browser navigation

**What the user sees**: The page loads with all campsites displayed and filters ready. Browser back/forward buttons work correctly.

### Function: `init()`
**Purpose**: Initialize the entire application when the page loads. **This is the starting point that kicks everything off!**

**How it works**:
1. **Call all setup functions** (these run once on page load):
   - `populateLocationFilter()` - fill location dropdown
   - `populateAmenitiesFilter()` - create amenity checkboxes  
   - `updatePriceDisplay()` - set initial price display
   - `setupFilters()` - **attach all event listeners** (crucial - this enables all user interactions!)
   - `updateResultsCount()` - show initial count
   - `renderCampsiteCards(data.campsites)` - render all campsites

2. **Set up back button** (attach a listener): 
   - Get back button element
   - Add click listener to call `showCampsiteList()` and clear hash

3. **Handle deep linking** (initial page load):
   - Check if URL has a hash: `window.location.hash`
   - If yes, extract slug and call `showCampsiteDetail(slug)`
   - This lets users share direct links to campsite details!

4. **Listen for hash changes** (browser navigation):
   - Add `'hashchange'` event listener to window
   - When hash changes (back/forward buttons):
     - If hash has a slug: show detail for that campsite
     - If hash is empty: show list

**The flow after init() completes:**
```
init() runs once ──┬──> Page is now set up and displayed
                   │
                   └──> Event listeners are waiting
                        │
                        └──> User interacts → Listeners fire → Functions run → DOM updates
```

**This function is called when the DOM is ready**:
```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

---

## Key Concepts Summary

### Event Listeners

**Where to attach listeners**:
- Form-level for efficiency: One listener catches all inputs inside
- Individual elements when you need specific behavior (like the price slider)

**Common events**:
- `'change'` - User finishes changing an input (select, checkbox, radio, after slider drag)
- `'input'` - Fires continuously (as user types or drags slider)
- `'click'` - User clicks a button or link
- `'hashchange'` - URL hash changes (for SPA navigation)

**Preventing default behavior**:
```javascript
link.addEventListener('click', (e) => {
  e.preventDefault(); // Stops the browser from following the link
  // Your custom code here
});
```

### Hash-based SPA Navigation

- **URL hash**: The part after `#` in the URL (e.g., `index.html#jenny-lake-campground`)
- **Reading hash**: `window.location.hash` returns `"#jenny-lake-campground"`
- **Setting hash**: `window.location.hash = "jenny-lake-campground"` updates URL
- **Remove hash**: `window.location.hash = ''`
- **Listen for changes**: `window.addEventListener('hashchange', callback)`

**Why use hashes?**
- Changes hash without reloading page
- Creates browser history (back/forward buttons work)
- Lets users share/bookmark specific views

### DOM Manipulation Patterns

**Creating elements**:
```javascript
const div = document.createElement('div');
div.className = 'my-class';
div.textContent = 'Hello';
parent.appendChild(div);
```

**Setting innerHTML** (for multiple elements):
```javascript
container.innerHTML = `
  <h1>${title}</h1>
  <p>${description}</p>
`;
```

**Clearing content**:
```javascript
container.innerHTML = ''; // Removes all children
```

