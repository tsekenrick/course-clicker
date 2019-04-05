# Course Clicker

## Overview

Course Clicker will be a game of the incremental/clicker genre that is meant to be a satirical simulation of a student attempting to get through a college class with good grades. The main learning objectives of this project are to familiarize myself with React, and learn how to create interactive web applications.

The game will be broken down into two "levels", represented by two different web pages/routes on the site. The first level is from the start of the course to the midterm, and the second from then until the final exam. The 3 main resources the game will ask you to balance are *Happiness*, *Productivity*, and *Knowledge*. There will be different ways to generate each of these resources, but gaining a certain resource generally coming at the cost of one (or both) of the others. The core gameplay loop demands that you keep a balance between these resources, and invest your resources into accelerating the rate of your resource gains. 

Course Clicker is set apart from most other incremental games in that it has a concrete win condition - to gain enough Knowledge stat to obtain a passing grade on the midterm/final. In each level, you are racing against the clock to gain enough Knowledge before it's time to take the test. As with most incremental games, Course Clicker will feature a prestige mechanic, where you reset your progress in the current level in order to gain some permanent benefits. This will be necessary in order to get to a point where you can gain knowledge fast enough to pass your final evaluations.

## Data Model

(___TODO__: a description of your application's data and their relationships to each other_) 

The data model for this project is quite simple - a main "save file" document stores pertinent variables related to your progress in the game. Obviously I haven't ironed out all the details of the game's design, so the document below just names a portion of the stats that will eventually be in the game.

Depending on whether I end up implementing user auth (see below for my research topics), there will also be a user document, each of which can have one save file document (one to one relation).

(___TODO__: sample documents_)

An Example User:

```javascript
{
  username: "shannonshopper",
  hash: // a password hash,
  saveFile: // an array of references to List documents
}
```

An Example Save File:

```javascript
{
  user: // a reference to a user document
  name: "Breakfast foods",
  items: [
    { name: "pancakes", quantity: "9876", checked: false},
    { name: "ramen", quantity: "2", checked: true},
  ],
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/game - page for first level of the game (midterm)

![game level 1](documentation/game.png)

/game2 - page for second level of the game (final)

![game level 2](documentation/game2.png)

Note that the routes for each level of the game are deliberately undescriptive to avoid spoiling the fact that a second level exists.

## Site map
 ________________
|                |
|       /        |
|                |  
|________________|
        |
        v
 ________________         ________________
|                |       |                |
|     /game      |  -->  |     /game2     |
|                |       |                |
|________________|       |________________| 

The `/` route will only exist if I end up integrating user auth in time. Otherwise, the site will start on the first level (`/game`), and once you meet the necessary conditions, a link will open up on `/game` to give you access to the second level (`/game2`).

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

* (6 points) React
    * Using React to construct the UI of my game.
    * Since it is quite a robust library with quite a bit to learn, I allocated 6 points for it.
* (2 points) Using CSS preprocessor Myth
    * Expanding the features available to me in my stylesheets seems useful for this type of project
    * Myth felt to me like a good balance between being featureful and straightforward to use
* (0-5 points) Passport.js for authentication
    * Since I'm uncertain how much time I will need to spend on learning React, I may or may not end up doing user log-in

8 points total out of 8 required points (13 out of 8 if I end up using passport)


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [React website - learning resources + documentation](https://reactjs.org)
2. [65 minigames built in React](https://react.rocks/tag/Game)
3. [Myth CSS preprocessor GitHub/API](https://github.com/segmentio/myth)
