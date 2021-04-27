# room-to-grow

Link to Scratch Project Brief:

https://docs.google.com/document/d/1bcYN6Nw23hWE9C5BEDBlv-S4Eg5u-A1xWYV5mblA2-w/edit?usp=sharing

What was the original vision for the project?

Room to Grow is a web app that allows American users to quickly and easily identify native plants in their state. The user can then save their favorite plants with notes for reference and get more details about that plant from a web API, trefle.io

If the project has strayed from the original vision, why?

Our project has not strayed form our original vision.

How far has the project progressed?

We are successfully fetching the data we want from the trefle API and sending it back to the user.

The psql database is set up and ready to receive user input, but the connection is not complete.

We have begun work on bcrypt and can successfully hash a user's password but have not linked it to a session or implemented cookies.

There are three table schemas, one for plant data, one for users, and one for user favorites.

What are some current issues/roadblocks?

There is a bug in the fetch request in App.js (400 bad request) regarding the user signup.

Somehow during our merge the png logo has stopped rendering

What are some suggestions for iterating on this project?

Complete full authentication, and post user's faves to the psql database

Make UI more responsive to browser window size

Return more plants upon clicking a "more plants" button or something to that effect

Make the app faster

Full CRUD for users and faves

Add error handlers to our middlewares :)

The current build is broken, it broke very close to the presentation so we did not have time to fix it. However, the webpack dev server still works.

EXTRA NOTES:

There are unhandles errors with the trefle API, and not all of the entries are complete

California is broken

Some states have misspelled names in App.js from importing data from the map building tool

We wish we had more comments in this thing but Monday was a real sprint. Hit us up with questions.

Vicki, Jason - Frontend

Aki, Allison - Backend

Vinit - Tournant
