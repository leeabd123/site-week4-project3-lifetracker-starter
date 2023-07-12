# Project #3: LifeTracker Application

## Application Features

### Core Features

- [x] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about. *Note:* This is the only page that unauthenticated users should be able to view.
- [x] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [x] **Login Page:** A form that allows users to login with email and password.
- [x] When a user first authenticates, they should be redirected to an authenticated view (i.e., the detailed activity page). When they sign out, all frontend data should be reset.
- [x] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [x] If the user is logged in, it should display a **Sign Out** button.
  - [x] If no user is logged in, it should display **Login** and **Register** buttons.
  - [x] Display a logo on the far left side, and contain links to the individual detailed activity pages.
- [x] Users should have the ability to track at least **one** type of activity (i.e., nutrition, exercise, sleep, etc.). Each activity should be tracked on separate pages.
- [x] **Detailed Activity Page:** Display and enter activities.
  - [x] Display a feed of all previously tracked activities.
  - [x] A form to enter relevant information (i.e., if tracking nutrition, the user can enter calories, timestamp, image, category, etc.).
  - [x] Each activity tracked is given a unique ID for easy lookup.
- [x] Deploy your website with Render. Check out our [Render Deployment Guide](https://courses.codepath.org/snippets/site/render_deployment_guide) for detailed instructions.

### Stretch Features

Implement any of the following features to improve the application:

- [ ] Users have access to an overview Activity page that shows one summary statistic about each of the three types of activity tracked (i.e., total number of minutes exercised, average calories consumed, max hours of sleep in one night, etc.). These summary statistics should be created using the `AVG`, `SUM`, `COUNT`, `MIN`, `MAX`, functions in SQL queries and served from a dedicated API endpoint. *Note: Summary statistics should not be calculated on the frontend.*
- [x] Each model (i.e `nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource.
  - You should also create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item. Example: filter exercise or nutrition by category, or filter sleep by the week/month it was recorded.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the LifeTracker application and allow users to follow each other. You'll want to create a new table to store this data.
- [x] Implement `security` middleware on the API that allows only authenticated users to access resources and allows users to only access resources about themselves.

### Demo Video

(There is 2 parts to my demo video)

- Part 1
<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/d06624f4fb284607bf10d9f497bf787a?sid=2cd1fbcb-07e5-40e1-9cda-966929a712bb" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- Part 2
<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/d78245d145564869a57036bf774b3157?sid=056a5931-d622-4398-b1c0-5185acff8813" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Deployed Webiste 

https://lifetracker-frontend-f9rb.onrender.com/

