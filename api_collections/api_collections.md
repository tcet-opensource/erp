## **ERP Backend API Collections**

This workspace is dedicated to the ERP backend API, organized into collections that represent individual endpoints. Each collection contains requests for various HTTP methods, including GET, POST, PUT, and DELETE, corresponding to specific functionalities within the ERP system.

**Note:** For endpoints that include the `/list` route, you have the flexibility to customize the data retrieval using query parameters. Specifically, you can pass `page` and `filter` as query parameters to tailor the results. If these parameters are omitted, the API will return all available data.

**Example:**

- List all accreditations:

```
localhost://3000/accreditation/list
```

- Customized listing with pagination and filtering:

```
localhost://3000/accreditation/list?page=2&limit=3
```

---
Import this into an API Client of your choice (Postman, Thunder Client, etc.)
