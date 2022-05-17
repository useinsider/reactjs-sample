# Insider React Native Sample App <img src="https://github.com/github/explore/raw/main/topics/react-native/react-native.png" alt="react-native" width="35" height="35"/>
For more information about react native integration please check the [link](https://academy.useinsider.com/docs/react-native-integration)

Check the changelogs 👉 [here](https://academy.useinsider.com/docs/react-native-sdk-changelog)

Before getting the build:

Common:
1. Change the partner name with yours in the App.js file(line 38)

Android:

1. Add your partner name to manifestPlaceholders in the module-level build.gradle file
2. Replace the applicationId with the one in your google-service.json file
3. Change the google-service.json file with yours

iOS:

1. Choose your team from the Xcode's Signing & Capabilities tab, under the Signing section
2. Repeat the first step for all targets(InsiderDemo, InsiderNotificationContent, NotificationService)
3. Change bundle identifier with yours and select desired App Group
4. Repeat the previous step for all targets(InsiderDemo, InsiderNotificationContent, NotificationService)
5. Change the App Groups for NotificationService.m and NotificationViewController.m files
6. Change the App Group in the App.js file(line 39)
7. Change the partner name for the URL Types, URL Schemes section(InsiderDemo) 
