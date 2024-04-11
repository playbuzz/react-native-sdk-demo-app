
# Running the React Native App

This guide will help you set up and run the React Native app on your development machine.

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system. You can download it from [Node.js website](https://nodejs.org/).
- **Watchman**: For macOS users, install Watchman via Homebrew: `brew install watchman`.
- **Xcode**: For iOS development, Xcode is required. Download it from the Mac App Store.
- **Android Studio**: For Android development, Android Studio is necessary. Download it from the [Android Developer website](https://developer.android.com/studio).
- **Android Environment**: Make sure you have a properly configured Android environment for development. 

## Step 1: Clone the Repository

Clone the repository to your local machine using the following command in your terminal:

```bash
git clone https://github.com/playbuzz/react-native-sdk-demo-app.git
```

## Step 2: Install Dependencies

Navigate to the cloned repository's directory:

```bash
cd PATH_TO_THE_PROJECT_DIRECTORY
```

Replace `PATH_TO_THE_PROJECT_DIRECTORY` with the actual path to the project directory.

Install the project dependencies by running:

```bash
npm install
```

or if you prefer using Yarn:

```bash
yarn install
```

## Step 3: Running the App

### For iOS:

Before running the app on iOS for the first time, make sure to install the CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

To run the app in the iOS simulator, execute:

```bash
npx react-native run-ios
```

### For Android:

Ensure you have an Android emulator running or an Android device connected to your computer. Then, run:

```bash
npx react-native run-android
```

## Troubleshooting

If you encounter issues with running the app, here are a few things you can try:

- Ensure all prerequisites are properly installed.
- Run `npm install` or `yarn install` again to make sure all dependencies are installed.
- For iOS, delete the `Podfile.lock` and Pods folder in the `ios` directory and run `pod install` again.
- For Android, make sure your emulator is running or your device is properly connected and recognized by your development machine.

---

If you have any questions or run into issues, don't hesitate to open an issue in the repository.
