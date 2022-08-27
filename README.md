# Frontend Assessment

[See it live!](https://user-datum.netlify.app). Also, there's some [code documentation here](./DETAILS.md)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b6e4d7e358ec4fca8d37ef58dbc99db7)](https://www.codacy.com/gh/Young-Einstein10/datum/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Young-Einstein10/datum&amp;utm_campaign=Badge_Grade) [![Netlify Status](https://api.netlify.com/api/v1/badges/36b2fbd4-2bd3-4c10-b21c-d22b338b236d/deploy-status)](https://app.netlify.com/sites/user-datum/deploys)

---

Build and deploy a very simple frontend app for paginated data, that does the following

1.  Fetches (randomised) data from `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84` which can be paged by appending `&page=N` where N is the page you want to fetch. E.g appending `&page=1` retrieves the first page, while `&page=4` retrieves the 4th page.

2.  Displays the fetched data in a HTML table with 5 rows (the API only returns 5 records), and allows the user to page next/previous with buttons in the UI

See full details and instructions (including an interesting paging caveat) in this [Google Doc](https://docs.google.com/document/d/1hGXXPykXqO6b9Z2pm55-2T83AIA39cQ3FQxtbGkoR5Y)

#### Note

1.  This comes as a purely HTML/CSS/JS project with [Parcel](https://parceljs.org/docs/) handling build and transpilation. 
2.  We strongly recommend you complete the challenge with this setup, and only use a framework (like Vue/react/Angular) only if absolutely necessary and for which you will be required to provide reasonable justification as part of your evaluation

