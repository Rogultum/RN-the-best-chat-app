### Purpose

This Project is done as a final project for AKBANK & Patika.Dev P218 React Native Bootcamp

### Features
- Authentication through Firebase.
- Chat with another user in realtime, by sending text messages.
- Send Location to another user, where they can see a mapview in chat.
- Share stories(similiar to instagram story but only photos.), that can be seen through the Story Tab up to 24 hours.
- Upload profile picture; update e-mail adress and password.
- Light/Dark theme.


# the-best-chat-app



<img src="https://user-images.githubusercontent.com/48841840/194774189-201d2c0f-a1d9-4fcc-8498-bf1da73ffc66.jpg" alt="logo" width="500"/>

**Table of Contents**

- [Detailed Overview](#detailed-overview)
  - [redux](#redux)
  - [Authentication](#authentication)
  - [Main Navigation](#main-navigation)
    - [Contacts List](#contacts-list)
    - [Story Screen](#story-screen)
    - [Settings Stack](#settings-stack)
    - [Chat Screen](#chat-screen)
- [TODO](#todo)
- [End](#end)

# Detailed Overview

## redux
There are 4 slices in redux store:
- Contacts Slice: where all the users from firestore is held.
- Location Slice: Holds User's location when they want to share it.
- Theme Slice: Whether or not the theme is light or dark.
- User Slice: Holds user info, such as: e-mail, password, username, etc.

## Authentication
User is greeted with **Sign In** screen,    

-> they don't have an account: they can navigate to Sign Up screen;
-> user e-mail and password is authenticated from firebase: 1) dispatch user to redux, 2) they'll navigate to *Contack Stack*

**Sign Up** screen, user enters:

- username
- e-mail
- password and password check
and authenticates to firebase authentication.
-> no error: create user document in firestore.

## Main Navigation
After Signing In user gets to **Contact Stack**. Contack Stack has:
- Bottom Navigation => tab 1: **Contact List** screen; tab 2: **Story screen**; tab 3: **Settings Stack**
- **Chat** screen.

*Note:* *The reason for Bottom navigation to be inside the Contack Stack is to eliminate the tab to be seen from every screen.*

### Contact List
From user collection in firebase every user document gets fetched and data is dispatched to redux state.
Through Flashlist contacts are shown on the screen.
Also +1 user under the name of "Note to Self" where the user can take notes.

### Story Screen
+ User can pick an image either with camera or from gallery and upload it to firestore and firebase story document, which is created on this screen.
+ Listener (onSnapShot method) updates the stories for the user, everytime there is a change on the document.
+ There is a container with random quotes changing everytime you press the container.
+ User can see other users' stories and their profile picture and username at the time they posted their stories.
+ Stories last on the app for 24 hours but not deleted from firestore documents.
### Settings Stack
+ First screen is Settings\*,
  + Users can see their profile picture, username,
  + Update their e-mails and passwords. Through firebase authentication.
+ Go to theme screen to change theme.

\* : *Tab name for settings is Profile for better user experience.*

### Chat Screen
+ User can send text messages and receive them on realtime with the help of firestore. 
+ First the document between two users is set on firestore with their combined id, 
+ then their messages are pushed to the database and listener(onSnapShot method) updates the state for flatlist data.
+ User can sen their location,
  + a map view renders on the screen focuses on the marker of user's location.

## TODO
- [ ] Dispatch update user needs to be fixed.
- [ ] Message status (sent, read) should be adapted.
- [ ] Contacts List: 
 - [ ] last message,
  - [ ] message date,
- [ ] Chat screen:
 - [ ] header contact image,
  - [ ] message date,
- [ ] Story Screen:
 - [ ] better image container and aspect relationship,
 ## 

### End
This bootcamp was a great oppurtunity and I feel lucky to be in it. I would like to thank everyone for their exertion; instructor, assistants, students and to people in Patika.Dev & AKBANK who made this bootcamp happen.
## 

Thank you if you have come this far, I'll be glad to hear feedbacks.
