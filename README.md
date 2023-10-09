# Project Name

AMAZON PRIME VIDEO CLONE

## Table of Contents

- [Project Overview](#project-overview)
- [Project Flow](#project-flow)
- [Folder Structure](#folder-structure)
- [Installation](#installation)

## Project Overview

This is a clone of the official website of the popular OTT platform Amazon Prime Video.
There are 6 pages in total in this website.

- When the website loads, a landing page appears with a navigation bar.
  The navigation bar has navigation links to explore other pages and a search bar.
- If the user is not registered, the register page can be accessed by clicking the account
  icon on the navigation bar and choosing "Register" from the dropdown menu.
- If the user is registered, some details are required to be entered on the sign in page.
- On entering correct details, that match the ones entered at the time of registration
  by the user, a new page loads displaying various movies and shows available.
- When hovered on any movie or some details show up with an option to add
  the movie or show to watchlist and another option to watch it's trailer.
- Clicking on More Details button in the movie carousel,the user is directed to Content Details page.
- A signed in user can access the Watchlist page, My Account page or Sign out by
  clicking on the user icon on the navigation bar and choosing from the drop down menu.

## Project Flow

Landing Page:

The landing page is a static page displaying basic information regarding the OTT platform Amazon Prime Video.
All the buttons on landing page, directs the user to the Sign In page.

Navigation Bar:

The HOME option when clicked directs to the landing page and also shows a static dropdown menu.
The STORE option when clicked directs to the Sign In page is the user is not signed in else it
directs a signed in user to the Movies page and it also shows a static dropdown menu.
The LiveTV option is non-functional.
The Categories option when clicked, displays a static menu.
The search bar is functional and directs the user to a search results page once the search icon is clicked.
The Account icon on the navigation bar has a drop down menu consisting three options,

1. Sign in - directing the user to Sign in page
2. Register - directing the user to Register page
3. Watch anywhere - closes the dropdown menu and remains on the same page

Sign In and Register:

A bunch of details are required to enter in these pages.
If a registered user enters details that do not match the ones entered at the time of register,
an error shows up in the Sign In page.
On a successful sign in, the user details are stored in local storage with the email as the key.
The email is stored in a context named "loggedMail" to retrieve the user's details in other pages.

Movies page:

On a successful sign in, the movies page loads which displays a carousel of trending movies.
Below the carousel many rows of movie posters belonging to a certain category appear.
On hover, each movie poster displays some information about the movie.
The Add to watchlist button can be toggled in order to remove the movie from watchlist.

Content Details Page:

Clicking on More Details button of any movie in the movie carousel pf the movies page,
directs the user to Content details page which is mostly a static page.

Useprofile page

The user here can change the details like name, address, password, payment details etc.

Watchlist Page

Movies added to watchlist show up here.
On hover, each movie displays an autoplay trailer and some details regarding the movie.

Sign Out:

The account icons change on Sign In and Sign out.
Sign out directs the user to the landing page.

### Folder Structure

In the src folder there are two folders:

- components,containing the javascript files
- styles, containing the css files of the javascript files

components folder:

LandingPage.js uses following files:

HomeCarousel.js
HomeimageGrid.js

Navbar.js uses the following files:

AccountMenu.js(contains Login.js and Register.js)
UserAccountMenu.js (contains Userprofile.js and Watchlist.js)
MenuCat.js (file for Categories option)
MenuHome.js (file for HOME and Store option)
SearchResults.js (when search icon is clicked)

Movies.js uses following files:

Carousel.js
MovieSlider.js
Content Details.js (when More Details button on Carousel is clicked )

### Installation

Provide step-by-step instructions on how to install and set up your project.

```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Change directory to the project folder
cd your-project

# Install dependencies
npm install
```
