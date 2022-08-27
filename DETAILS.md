# How this works

- Fetches the data from the Random API server on first page load
- Extracts the data gotten from API server and stores it in an object in order to model it like a hash map. The keys in the object represents the different pages of the app.
- Changes the current page when the pagination buttons are clicked and also updates the button state depending on the current page.
