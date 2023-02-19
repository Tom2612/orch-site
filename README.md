# Find open music groups and play with them

This is a website I am creating as a full portfolio piece.
This is being created using MERN stack, RESTful API principles, and full CRUD.

## The idea

The idea is very simple - music groups (such as orchestras) regularly need seats and gaps filled for concerts. I want to connect orchestras to players who are willing to give up their time because they are passionate about playing music.

Groups will be able to advertise openings for pieces/instruments and players will be able to search/filter for specific pieces/instruments. The groups have an option of providing some payment (e.g. travel costs) for the players.

## The technology

As mentioned, this is a MERN full stack application that I will be working on continuously and regularly. Most days I am able to contribute a little something to it.

As of early Feb, the 'group' side of things is almost fully working in terms of being able to create groups, add concerts, update concerts, delete concerts, and players should be able to see all concerts posted. I am close to beginning the process of adding authentication so that groups can signup/login and access only their concerts.

### Change Log

#### 19-Feb

Added some extra validation on signup routes for groups. Fixed the mongoose error to set as String and not object. Added signup static method to group model. All fields on group form working but not displaying on Group profile page - need to put description on there too.

Next steps:
-Set up JWT on signup method
-Start AuthContext in React for frontend and reducer functions
-Create updateGroupDetails page and patch requests for that.
-Create general login form (question here: how to handle different types of authorization? e.g., player v group and what is seen on the front end. Players shouldn't be able to make concerts).
