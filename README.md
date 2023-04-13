<p align="center">
    <img alt="App Icon Badge" src="./assets/screenshot.png" width="200" />
</p>
<h1 align="center">
App Icon Badge
</h1>
A small library that generates environment and version specific app icon badges

The library also can be used as an Expo Plugin.

## 🚀 Motivation

During the development of an application, we typically generate different applications based on the environment (staging, development, production).

However, it starts getting confusing when we install all of them on our device, especially if they have the same icon and name. In addition to that, it is difficult to trace bugs not knowing which version of the application we are using. 

Therefore, we need a way to differentiate the applications based on the environment and version. This library generates a badge with the environment and version information and adds it to the app icon.

## Installation

Install the package using yarn or npm

### yarn  
```bash
yarn add app-icon-badge
```
### npm

```bash
npm install app-icon-badge
```

## Usage

### As a library

```javascript
import { addIconBadge } from 'app-icon-badge';

addIconBadge({
  iconPath: 'PATH_TO_ICON',
  version: '3.0.0',
  environment: 'development',
});

```

### As an Expo Plugin

Adding the library as a plugin will guarantee that the icon is generated every time you run prebuild.

```javascript 
// app.config.js
{
  name: "my-app",
  plugins: [["app-icon-badge/dist/index", {
        iconPath: 'PATH_TO_ICON',
        environment: 'ENVIRONMENT_NAME',
        enabled: true,
      }]]
}
```

## 🔥 How to contribute ?

We appreciate your desire to support our effort. We highly value your participation and look forward to receiving your contributions. Please read the following guidelines carefully before contributing.


## 📝 License

MIT