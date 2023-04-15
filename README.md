<p align="center">
    <img alt="App Icon Badge" src="./assets/screenshot.png" width="200" />
</p>
<h1 align="center">
App Icon Badge
</h1>
Generates icons with environment and version specific badges.


## 🚀 Overview


The library uses Jimp, an image processing library for Node with zero native dependencies, to generate icon with environment or version badges.

It also provide the possibility to be used as an Expo plugin.
## 🚀 Motivation

During the development of a mobile application, we typically generate different applications based on the environment (staging, development, production).

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

The image size is should  1024x1024. The library will generate a new icon with the badge in the same directory as the original icon.
### As a library

```javascript
import { addIconBadge } from 'app-icon-badge';

addIconBadge({
  iconPath: 'PATH_TO_ICON',
  version: '3.0.0',
  environment: 'development',
});

```
If you would like to only generate an icon with the version badge, you can skip passing the `environment` argument. Same applies for the `version` argument.

### As an Expo Plugin

Adding our plugin will guarantee that the icon is generated every time you run prebuild.

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
You can enable/disable the plugin by setting the `enabled` property to `true` or `false`. You would usually want to disable it for production builds.

## 🔥 How to contribute ?

We appreciate your desire to support our effort. We highly value your participation and look forward to receiving your contributions. 

Feel free to open an issue if you have a suggestions, question or a feedback, Or you can open a pull request if you would like to contribute to the project.

If our project has helped you in any way, please consider giving it a star ⭐️.


## 📝 License

MIT