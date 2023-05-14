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

If you are starting a new project, you can use [Obytes Starter](https://starter.obytes.com/), our own template for React Native projects. the  starter kit is based on the best practices and tools that we have found to be most effective in our own projects and it comes with this library pre-installed and configured.
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

We first built the package to be used in Expo projects, and generate icons that will be provided to the `icon` property in `app.json`. You can learn more about that in the [Expo documentation](https://docs.expo.dev/develop/user-interface/app-icons).

We found out that the best possible way to generate these icons during `prebuild` is to use an [Expo plugin](https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial/#4-creating-a-new-config-plugin).

However, we also wanted to make it possible to use the library in any React Native project, so we added the ability to use it as a library.

The image size is should  1024x1024. The library will generate a new icon with the badge in the same directory as the original icon.
### As a library

```javascript
import { addIconBadge } from 'app-icon-badge';
import path from 'path';

const iconPath = path.resolve(__dirname, 'PATH_TO_ICON' );

addIconBadge({
  iconPath,
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

##  Roadmap

The library is still in its early stages. Here is a list of features that we are planning to add in the future.

-  Add support for Android Adaptive Icons
-  Add Tests
-  Add support for custom badge colors
-  Add ability to run as a CLI tool

## 🔥 How to contribute ?

We appreciate your desire to support our effort. We highly value your participation and look forward to receiving your contributions. 

If you decided that you would like to contribute  , you can follow these steps:

1. Fork the repository.
2. Create your feature branch (git checkout -b my-new-feature).
3. Install dependencies, we use pnpm, please make sure to [install](https://pnpm.io/installation) it, if you don't have it already.
```bash
pnpm add app-icon-badge
```
4. Run the example provided in the `example` directory. You should see a new icon with the badge generated in the same directory as the original icon under the name `icon.development.png`.
```bash
pnpm start
```
5. Make your changes and make sure the example is running without any issues.
6. Commit your changes (git commit -am 'Add some feature').
4. Push the branch (git push origin my-new-feature).
5. Create a new Pull Request.


Feel free to open an issue if you have a suggestions, question or a feedback.

If our project has helped you in any way, please consider giving it a star ⭐️.


## 📝 License

MIT