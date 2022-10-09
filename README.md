### Purpose

This Project is done as a final project for AKBANK & Patika.Dev P218 React Native Bootcamp

### Features
- Authentication through Firebase.
- Chat with another user in realtime, by sending text messages.
- Send Location to another user, where they can see a mapview in chat.
- Share stories(similiar to instagram story but only photos.), that can be seen through the Story Tab up to 24 hours.
- Upload profile picture; update e-mail adress and password.
- Light/Dark theme.

## Technologies Used:

> Global State Management: [Redux - A predictable state container for JavaScript apps. | Redux](https://redux.js.org/))

> Navigation: [React Navigation | React Navigation](https://reactnavigation.org/)

> Some components: [React Native Paper](https://reactnativepaper.com/)

> Database, Storage and Authentication [Firebase (google.com)](https://firebase.google.com/)

> Alternative Flatlist: [GitHub - Shopify/flash-list: A better list for React Native](https://github.com/Shopify/flash-list)

> Map View [GitHub - react-native-maps/react-native-maps: React Native Mapview component for iOS + Android](https://github.com/react-native-maps/react-native-maps)

> Image Selection Through Camera or Gallery: [ImagePicker - Expo Documentation](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

> Getting Location: [Location - Expo Documentation](https://docs.expo.dev/versions/latest/sdk/location/)

> For Scrolling Stories: [react-native-reanimated-carousel](https://github.com/dohooo/react-native-reanimated-carousel#readme) 

[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)

[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

> **Project is written on:** [Expo](https://expo.dev/)



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
  + Change username on firestore and redux. By clicking on their username.
+ Go to theme screen to change theme.

\* : *Tab name for settings is Profile for better user experience.*

### Chat Screen
+ User can send text messages and receive them on realtime with the help of firestore. 
+ First the document between two users is set on firestore with their combined id, 
+ then their messages are pushed to the database and listener(onSnapShot method) updates the state for flatlist data.
+ User can sen their location, by clicking on attachment button on the right of TextInput, get their location and send it.
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

### Example Firestore docs:
<img src="https://user-images.githubusercontent.com/48841840/194777308-6e9cf0cf-b2ee-44b4-93d5-6003a89069e2.png" alt="fs" width="600"/>

<img src="https://user-images.githubusercontent.com/48841840/194777311-73b4b5e3-ecd3-4d79-a17a-d7fbeec6231f.png" alt="fsa" width="600"/>

<img src="https://user-images.githubusercontent.com/48841840/194777313-79ab0ab9-9863-4ba0-8edd-28784e301503.png" alt="fsb" width="600"/>

### Here is a gif:
[59 sec gif on imgur](https://imgur.com/GWOaW3y)

#### Dark Theme ex:
<img src="https://user-images.githubusercontent.com/48841840/194778629-91163e5b-14a6-408c-84e9-6538926875eb.jpg" alt="fsb" height="400" /> <img src="https://user-images.githubusercontent.com/48841840/194778895-642ccd6c-ac13-46c8-96e3-8ee9b2412eba.jpg" alt="fsb" height="400" /> <img src="https://user-images.githubusercontent.com/48841840/194778902-5cecb5ef-ea90-4f02-8652-4951956cfc2e.jpg" alt="fsb" height="400" /> 

#### Light Theme ex:
<img src="https://user-images.githubusercontent.com/48841840/194779083-39673773-fc7a-4656-b85b-3fe4803ca56a.jpg" alt="fsa" height="400"/>  <img src="https://user-images.githubusercontent.com/48841840/194779078-fbf82ec9-5ca8-4427-95e4-60542d514fb9.jpg" alt="fsa" height="400"/>







Thank you if you have come this far, I'll be glad to hear feedbacks.
