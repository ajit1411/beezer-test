# Coding Challenge
This is a simple test which aims to demonstrate an ability to set up a Firebase project and present the data in a React app. Familiarity with React.js is assumed, however, no prior knowledge of Firebase is required. Besides completing the task according to the set of instructions below, we are looking for well written code and a demonstration of understanding the best practices around React and Redux.

Use of any further dependencies besides React, Redux, Firebase and create-react-app is totally optional and up to the developer.

## Instructions

1. Clone this repo and create your own git repository.
2. Push your git repo to either github, bitbucket or gitlab
3. Create a free Firebase project at https://firebase.google.com/
4. In the project's database page, import the provided JSON from the data.json file.
5. Bootstrap a new React app with create-react-app (https://github.com/facebookincubator/create-react-app)
6. Follow the Firebase Web SDK setup guide to initialize Firebase in your react app (https://firebase.google.com/docs/web/setup).
7. The provided data structure contains a list of users and accounts. Each user has an account and each account can contain one or more apps. In your react app, get the users from Firebase and for each user get the appropriate account.
8. Render a list of users, displaying the account id and app titles belonging to each user.
9. When done, send us a link to your git repo!

## Bonus
Complete this section for extra credit

1. Add a rating system to the apps that allows you to rate it out of 5 (should save to db)
