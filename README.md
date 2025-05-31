# Electric Vehicle Charging Station Booking App ⚡🔋

## Overview
The Electric Vehicle Charging Station Booking App is designed to provide a seamless experience for EV owners by allowing them to locate and book charging stations in real time. The app integrates **Google Maps API** to display nearby charging stations based on the user’s location, ensuring efficient navigation. Users can check station availability, read reviews, and make secure payments directly within the app.

## Features
- 📍 **Real-Time Charging Station Locator** using Google Maps API
- 📊 **Sorting of Charging Stations** based on proximity to the user
- 📅 **Booking System** to reserve charging slots and check availability
- ⭐ **User Reviews & Ratings** for charging stations
- 💳 **Secure Payments** through Stripe API
- 🔄 **Real-Time Updates** on station availability

## Technologies Used
- **Frontend:** React Native
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs & Integrations:** Google Maps API, Stripe API

## Demo Video 🎥
[![EV Charging App Demo](https://img.youtube.com/vi/5VQ6mqACOKA/0.jpg)]((https://youtube.com/shorts/5VQ6mqACOKA))

# Getting Started

## Step 1: Set up
 First create .env file and add 
 MAPS_API_KEY=YOUR_MAPS_API_KEY

 and in AndroidManifest.xml
 add 
 ```xml
 <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_MAPS_API_KEY"/>
   ```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
