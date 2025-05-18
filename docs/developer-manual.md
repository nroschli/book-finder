# Developer Manual

## Introduction

This document is intended for future developers who will work on the Book Finder project. It outlines the necessary steps to install, run, test, and continue development of the application.

---

## Project Structure

book-finder/
│
├── index.html
├── search.html
├── about.html
├── style.css
├── script.js
├── README.md
└── docs/
└── developer-manual.md

## Installation Instructions

Download all files from the GitHub

### Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A code editor like Visual Studio Code (recommended)
- Git (for version control)
- Node.js (optional, if you want to run a local development server)

### Steps

1. Clone the repository from here: https://github.com/nroschli/book-finder.git

2. You can run the site by opening index.html in any browser.

## Running Tests

You can manually test the application by:

- Searching books on the search page
- Expanding book details to view descriptions and subjects
- Bookmarking favorite books using the bookmark icon
- Viewing and removing favorites on the home page
- Checking the Chart.js bar graph at the top of the search results page. This shows top authors for each search.

## API Reference

Book Finder uses the [Open Library REST API](https://openlibrary.org/developers/api).

### Search Books

- **Endpoint:** `https://openlibrary.org/search.json?q={query}`
- **Method:** GET  
- **Description:** Searches books by title or author. Returns an array of book records containing metadata such as title, author, and work key.

### Get Book Details

- **Endpoint:** `https://openlibrary.org/works/{workKey}.json`
- **Method:** GET  
- **Description:** Returns detailed information about a specific work, including description, subjects, and other metadata.

## Known Bugs

- Some books do not have detailed descriptions or subject information due to incomplete data in the Open Library database.
- No user input validation for blank searches or excessively long queries.

## Roadmap for Future Development

- Add login so users can save their books to an account.- Allow users to log in and sync favorites across devices.
- Add search filtering by genre, subject, or publish year.
- Make mobile version so it can be viewed on a phone in a clean manner.