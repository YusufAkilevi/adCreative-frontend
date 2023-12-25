# Rick and Morty Multi-Select Autocomplete Component

This project is a React.js implementation of a multi-select autocomplete component for the Adcreative.ai frontend developer position. The component is designed to search and select characters from the "Rick and Morty" API.

## Table of Contents

- [Requirements](#requirements)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Requirements

- React with Typescript
- Multi-select autocomplete component
- API query based on the input
- Displaying character information in the popup content (image, name, episodes played)
- Highlighting the query in the search results
- Adding and removing selected characters in the input field
- Keyboard navigation support
- Loading state display
- Exception handling and error states in the UI
- Clean and readable code architecture

## Technologies

- React.js
- Typescript
- Vite.js
- Tailwind CSS

### Links

- Solution URL: [https://github.com/YusufAkilevi/adCreative-frontend.git](https://github.com/YusufAkilevi/adCreative-frontend.git)
- Live Site URL: [https://multi-page-form-yakilevs.netlify.app/](https://multi-page-form-yakilevs.netlify.app/)

## Installation

### Clone the repository

```bash
git clone https://github.com/YusufAkilevi/adCreative-frontend.git
cd adCreative-frontend
```

### Install dependencies

```
npm install
```

### Run the development server

```
npm run dev
```

Visit http://localhost:5173 in your browser.

# Project Features

This project incorporates the following key features:

1. **Multi-select Autocomplete Component with API Integration**

   - The application utilizes a multi-select autocomplete component that integrates with the "Rick and Morty" API.

2. **Character Information Display (Image, Name, Episodes Played)**

   - The component displays detailed information for each character, including their image, name, and the number of episodes they have played in.

3. **Query Highlighting in Search Results**

   - Search results dynamically highlight the query, making it easy for users to identify matches in the displayed characters.

4. **Add and Remove Selected Characters**

   - Users can easily add characters to the selection by clicking on them, and remove selected characters by interacting with the UI.

5. **Keyboard Navigation Support**

   - The application supports keyboard navigation, allowing users to navigate through the input field, selected items, and search results using arrow keys and the tab key.

6. **Loading State Display**

   - During API requests, a loading state is displayed to inform users that the application is fetching data. This ensures a smooth user experience during asynchronous operations.

7. **Exception Handling and Error States in the UI**
   - The application implements robust exception handling to gracefully manage potential errors in API requests. Error states are displayed in the UI, providing users with feedback on failed operations.
