# Find open music groups and play with them

This is a website I am creating as a full portfolio piece.
This is being created using MERN stack, RESTful CRUD API principles.

## The idea

The idea is very simple - music groups (such as orchestras) regularly need seats and gaps filled for concerts. I want to connect groups to musicians who are willing to give up their time because they are passionate about playing music.

Groups will be able to advertise openings for pieces/instruments and players will be able to search/filter for specific pieces/instruments. The groups have an option of providing some payment (e.g. travel costs) for the players.

## The technology

As mentioned, this is a MERN full stack application that I will be working on continuously and regularly. Most days I am able to contribute a little something to it.

Update: The site is being tested using Cypress to mimic user interaction as closely as possible.

As of early Feb, the 'group' side of things is almost fully working in terms of being able to create groups, add concerts, update concerts, delete concerts, and players should be able to see all concerts posted. I am close to beginning the process of adding authentication so that groups can signup/login and access only their concerts.

## Reflections

Added a new section here to go through how I would do this differently if I started from scratch.

I think CSS took a lot of time, particularly modularizing and getting all styles consistent. A library/framework or other tool would have been hugely helpful here to standardise what users see so that everything looks consistent. I am looking into Mantine as a first trial.

I would definitely focus on getting the backend done before the frontend next time, as I found too many distractions focussing on what 'looked good' as opposed to just getting the functionality in place first, probably slowing down the production of the app. I would also more carefully plan out how my data would be structured as the Group Model went through a few versions before arriving at the current one. I will need to change further as currently I am accessing all concerts of a group as a virtual property, and not simply searching the Concerts for the group. This requires two API calls for one page so not sure how that affects performance.

I opted to go for JWT for authentication. This was mainly because I am used to it, however I think next time I would like to trial session and cookies as I've heard there are many useful features about these.

### Change Log

#### 19-Feb

Added some extra validation on signup routes for groups. Fixed the mongoose error to set as String and not object. Added signup static method to group model. All fields on group form working but not displaying on Group profile page - need to put description on there too.

Next steps:

- Set up JWT on signup method
- Start AuthContext in React for frontend and reducer functions
- Create updateGroupDetails page and patch requests for that.
- Create general login form (question here: how to handle different types of authorization? e.g., player v group and what is seen on the front end. Players shouldn't be able to make concerts).

#### 22-Feb

All login, logout and signup functionality basically working for groups now, and the state persists on start up thanks to local storage and JWT. this was completed using authentication Context in react and Reducer function to update global user state. I am using bcrypt on the backend for password hashing and checking because it feels simple but effective. The errors are appearing on screen well!

Very much taking time with authentication as I want to understand all the principles of what is going on whilst I am building it and making sure I am following best principles of implementing such a system.

Next steps:

- Start protecting routes on the frontend.
- Fixing display and hiding certain options depending on logged in status.
- Overhaul the css - BIG job here, but the style sheet is very large and I'd like to use DRY so that one general set of styles for forms can style for all forms used in the application.
- Adding validation checks on the backend to use current signed in user's id.
- Create updateGroupDetails page and patch requests for that. This ties in with the above as validation required.
- Login form made but goes to /api/groups end point - will I need a separate one for players later or can I solve it all with one form now? Still researching this.

#### 27-Feb

Frontend is protected with route redirection and navbar conditional rendering. CSS has started to be broken up into smaller modules. Backend validation checks are in place and fully tested. Still have not created updateGroupForm so that will be coming soon. Auth v1 is done for now.

Next steps:

- Continue breaking CSS down to smaller and more manageable files.
- Create updateGroup info form.
- Display concert details on concert page - CSS here!
- Delete group button.

#### 26-Mar

V1 may be complete. All routes handled and authenticated. CSS has been broken down. UpdateGroupForm is made and working. The concert pages will need further styling but display the bare minimum. I am keeping the delete group button inactive for now to make sure I don't remove any dummy data.

Next steps for the app will be final security stuff, getting ready for deployment and completing end-to-end testing using Cypress. I wanted to use Cypress as it does the whole show and mimics user interaction - and it is a new tech that I haven't tried before, so that's a win!

On the side, i'm looking at Mantine as a potential framework to further clean styles up. This will be a complete overhaul and a long term goal so not on the cards yet. I don't think it looks terrible at the minute - I first wanted to get a working prototype into production.
