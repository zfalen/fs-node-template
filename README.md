# PartnersCreative Full Stack JS Starter Template

###### A clean-and-simple starting point for full stack applications.

*This template is intended to let ParC developers get started on the fun parts of dev right away, without having to do the boilerplate Node / HTTP setup.*

---

## SHIPS WITH CORE TECHNOLOGIES:
  - **WEB HOST:** Heroku *(usually)*
  - **NoSQL DB:** MongoDB / Mongoose
  - **SERVER & API:** Node.js / Express
  - **COMPILER:** Webpack
  - **CMS:** *TAKE YOUR PICK! Just use an API instead of Mongo, or wire it into the DB and host a local copy of data.*
  - **VIEW TEMPLATING:** EJS
  - **UI:** React.js
  - **STATE MANAGEMENT:** MobX
  - **STYLES:** SASS
  - **ANIMATION:** GreenSock Animation Platform (GSAP)

---

## CONTENTS
* Template Basics
    * NPM / startup scripts
    * Folder structure
    * Development & Production modes
* Server & API
    * Core Server files / startup
    * MongoDB & Models
    * API Routes
    * Webpack Compiler
* Client, Views & UI
    * Public assets
    * Views / EJS
    * React Components
    * MobX
* Code Linting
* Hosting on Heroku

---

## TEMPLATE BASICS

### *Startup & Custom Scripts:*
There are a number of custom scripts pre-installed for convenience. The complete list is available within `package.json`, but the key scripts are listed below.

**Set up the development environment:** `npm run setup`  
Will ensure latest version, install global and local dependencies, then launch in dev mode.

**Compile Static Production Assets (w/o launching)**: `npm run build-production`  
Compile assets to `/public/static`. Runs on Heroku before launching app to production mode.

**Launch In Dev Mode**: `npm run start`  
**Launch In Staging Mode**: `npm run start-staging`  
**Launch In Production Mode**: `npm run start-production`  

... ... ...

### *Folder Structure:*  
This template splits client-facing and server-related files into two root-level folders: `/CLIENTSIDE` & `/SERVERSIDE`.

The `/CLIENTSIDE` folder contains all React components, state-related logic controllers, stylesheets, view templates and other script plugins.

The `/SERVERSIDE` folder contains all database models & storage calls, Express API routes, calls to the external CMS, Webpack compiler configuration and Node / HTTP server setup.

Both sections of the template are examined in depth below. However, developers are free to move away from this opinionated folder structure and set things up however they care to.

... ... ...

### *Development, Staging & Production Modes:*  

The template ships with two distinct operational modes, with options to run local environments in either. Both modes are triggered by the `NODE_ENV` and `HOST_MODE` variables within the `.env` file.   

*NOTE: Heroku automatically sets the `NODE_ENV` environment variable to `production` - on both staging and production hosts. A deeper examination can be found in the **Hosting On Heroku** section below.*

Ideally, developers will build special features into `development` modes that enhance the dev experience and make debugging easier. This template includes numerous examples on both the `CLIENTSIDE` and `SERVERSIDE`. For instance, in both `staging` and `development` modes, developers can trigger s special React component to assist in debugging the sample Sharkicorn application by passing the query string `/?mode=dev` to the base URL at `/`.  *( ex. http://localhost:3333/?mode=dev)*

`development` is the default operation mode on all machines that do not explicitly declare otherwise. In `development` mode, Webpack will hot-reload all React / JavaScript components, as well as all SASS stylesheets. `Console.log()` statements will be preserved and function normally in client-facing JavaScript files.

`staging` mode, which is triggered by setting `HOST_MODE` to staging, simulates the Heroku staging environment. It behaves almost exactly the same as `production` mode, but features an authorization gate to prevent unwanted visitors from accessing the application during build phases. The auth gate is controlled by `Passport.js`, accepts credentials defined by the `ADMIN_USERNAME` and `ADMIN_PASSWORD` fields in the `.env` file and uses cookies to preserve sessions.

`production` mode is the default operational mode for Heroku, and uses pre-compiled and minified assets on the client-side - which Webpack compiles during the build process and prior to application launch. These assets are served via Express to a static directory that can be accessed via HTTP at `baseAppURL/static`. The directory is a hidden folder within the app folder structure, and can be found at `/CLIENTSIDE/static`.

For more on the Webpack build configuration, see the **Webpack Compiler** section below.  

---
## SERVER & API

### *Core Server Files & Startup:*  
**.env**:  
The `.env` file at the root of the application is an environment file that declares global variables we can access throughout the server-side by calling `process.env.SOME_VAR`. This file is *tracked by git* and pushed to our private repo on BitBucket to prevent us from setting it up manually every time a new development environment is cloned.

This file is ***not tracked by Heroku***, which recreates its own version and controls the variables inside at the Dashboard level. For more, see the **Hosting On Heroku** section below.

**startup.js**:  
The `/SERVERSIDE/startup.js` file is the entry point for the Node application, and is what gets called by all startup scripts. Its role is to require dependencies, call data down from our Wordpress CMS, and then compile assets and serve the application via HTTP. It is mostly a structural skeleton that pulls logic in from other application files.

**expressServer.js**:  
The `/SERVERSIDE/expressServer.js` file handles most application-specific Express-related logic. It mounts the MongoDB instance *(see below)*, configures EJS templating, requires our auth settings, mounts Express routes and middleware, and serves static assets. It is mostly a structural skeleton that pulls logic in from other application files.

**errorHandlers.js**:  
The `/SERVERSIDE/errorHandlers.js` file declares the app's primary Express error handling logic. Generally speaking, all errors are passed using `next(err)` and will bubble through to the handlers in this file.

Standard procedure for basic problems is to render an error page to the client, and log the error to console. These logs are connected to a Heroku extension, Logentries, that will catch the errors and send an alert via Email and Slack channel.

Critical errors will be intercepted by the `uncaughtException` hook, and gracefully shut the application down. Heroku will immediately restart the affected dyno to ensure an uncorrupted instance, and forward traffic to a new dyno in the meantime.

... ... ...

### *MongoDB & Models:*  
All database configuration files can be found at `/SERVERSIDE/models`. The `db.js` file contains all setup options for Mongoose - the application ODM.

*NOTE: Mongoose references a `MONGODB_URI` variable from the `.env` file, which is automatically created by our Heroku database host: mLab MongoDB. In local environments, it defaults to a local MongoDB instance and calls it `swanky-dev-app`.*

The sample application uses a single DB schema, called `user.js`. An additional, sample schema is included at `someModel.js`.

... ... ...

### *API Routes:*    
This template ships with sample API routes for `production` and `development` modes. All routes can be found in `/SERVERSIDE/routes`, with the exception of Express `static` routes *(which can be found at the bottom of `/SERVERSIDE/expressServer.js`).*.

**Production Routes**:   
`/` is where the sample application resides, and renders an EJS template that houses our React application. This route also includes our auth-gate, and will prevent users from accessing the sample application without logging in when the app is in `staging` mode.

`/api` includes logic for our sample application and accepts both `GET` and `POST` requests.

`/oops` accepts generic GET requests via URL, and is used to manually render error pages from the client.

**Development Routes**:   
Developers can use the gated area at the bottom of `/SERVERSIDE/routes` to set up routes that will only work in `development` and `staging` modes.


**Routes vs. Function Files**:   
The `production` mode routes are designed to promote readability, and utilize ES6 promise chains to describe what they do with declarative function names. Each route has a corresponding `functions` file, which can be found in the `/SERVERSIDE/routes/functions` folder. These functions are manually imported *(using `require()`)* at the route level.

A functional example for the `/api` route exists in this folder, as well as a starting point for additional routes called `someRouteFunctions.js`. An additional folder *(`/dev`)* is placed for convenience, and should be used for function files that are specific to an application's `development` mode routes.


**Passport Authentication**:  
Routes can be protect by an authentication gate in `staging` mode, which is an easy way to prevent unwanted visitors from viewing changes before they are pushed to `production`. *(This setup is merely intended as an example, and more complicated user authentication setups can certainly be used!)*

The auth gate is controlled by `Passport.js`, accepts credentials defined by the `ADMIN_USERNAME` and `ADMIN_PASSWORD` fields in the `.env` file and uses cookies to preserve sessions.

The gate uses Express middleware to redirect unauthorized requests to `/login`, which serves an EJS login form. In all `development` and `production` modes, the middleware simply returns `next()` to move **all** requests down the chain regardless of authentication.

All `Passport.js` configuration can be found in the `/SERVERSIDE/auth.js` file. The `checkAuthentication()` middleware can be found in `/SERVERSIDE/routes/routes.js`.

... ... ...

### *Webpack Compilation:*  

This template uses Webpack to compile and minify all production assets into files compatible with all modern browsers. All Webpack configuration can be found in the `/SERVERSIDE/webpack` folder.

`compiler.js` contains all logic for Webpack in `development` mode, where code and SASS styles are hot-reloaded.

In `production` mode, all assets are pre-compiled prior to application launch and served to a static folder at `/static`.   
*NOTE: In order to launch the app in `production` mode locally, these assets **must** be built prior to launch using the `npm run build-production` command. On Heroku, this step is accomplished using the `heroku-postbuild` command - which runs `build-production` after installing `node` and all `npm` dependencies, but prior to actually spinning up the app. For more, see the **HOSTING ON HEROKU** section below.*

---
## CLIENT, VIEWS & UI

### *Public Assets:*  
All assets that need to be accessible via HTML tag are served from a publicly accessible folder via Express static using the base `/` URL. All of these assets are contained within the application folder structure at `/CLIENTSIDE/public`.

**Images & Other Assets**:  
All imagery that does not need to be controlled by a CMS are pre-minified and served from the `/CLIENTSIDE/public/images` folder, at the `/images` route *(e.g. `/images/FILE_NAME.jpg`)*.   

Useful JS libraries and other assets that should be loaded on the client, but that are not otherwise imported into our compiled JS assets, could also be served from the `/public` folder if necessary.

**Stylesheets & SASS**:  
The template uses SASS / SCSS precompiling for all stylesheets. All stylesheets are intended to promote modularity and can be found in the `/CLIENTSIDE/public/stylesheets` folder.  

The template compiles `.scss` files using ***JavaScript files***, which Webpack is able to monitor for changes and hot-reload in `development` mode.

They can be declared in the Webpack config and served at `/static` along with other compiled assets via Express static. Then, they can be imported into EJS templates as a script file, like so:   
`<script src="/static/destinationPortalStyles.js"></script>`

On the other hand, `.scss` files can also be imported with all other React logic directly in the `/CLIENTSIDE/JS/components/index.jsx` file. This will compile and insert the styles as part of the Webpack build process for `index.jsx`.

**Touch Device Styles**:  
Because touch devices struggle with key interactivity states, like `:hover`, the template attempts to identify these devices using the `navigator.userAgent` string available on all devices. If a touch device is identified, the `<html>` tags in all EJS documents will be tagged with a `.touch-device` class, from which touch-specific styles can be derived.

The logic for this sniffer can be found in `/CLIENTSIDE/JS/utils/touchDeviceIdentifier.js`.

... ... ...

### *Views / EJS:*  
This template uses EJS for server-rendered HTML skeletons. All views are built with modularity in mind, and can be found in the `/CLIENTSIDE/views` folder.

There are also folders for simplified, custom views for `development` and `staging` modes *(such as logins)*, which can be found at the `/dev_views` folder.

 An error page lives in the `/misc_views` folder, which is passed in a few EJS variables directly from our Express error handlers. *(Ex. `message` and `errorType`)*

... ... ...

### *React Components:*
This template uses React as a framework for generating interactive, responsive UI. All React / JSX components can be found in the `/CLIENTSIDE/JS/components` folder.

The sample application is controlled by the `index.jsx` file, which relies on numerous components from the `/main_components` and `/transitions` folders. The file renders a React root-level component to a `<div id="app"></div>` element in EJS, at the `/` route.


**Animated Component Transitions**:  
Some React components sample application leverage the `react-transition-group` library to control their animation in and out on `componentDidMount()` and `componentWillUnmount()`. All animations leverage the `GSAP` *(GreenSock Animation Platform)* library.

We control whether or not a given component should be in a transitional state, as well as how long its transitions should last, based on the `@observable showingComponent` and `transDuration` values in the MobX `APP_STORE`.

Transitions are created using a declarative, higher-order component structure and reside in the `/CLIENTSIDE/JS/components/transitions` folder. Survey / question components can be assigned a transition by simply importing the relevant file and tagging the component using ES6 decorators. Ex:  

    @inject('store') @fadesUpAndDown @observer
    class Sharkicard extends Component { ... }
*NOTE: All components still need to be passed the `APP_STORE` via Mobx `@inject` and be tagged with the `mobx-react` `@observer` tag. See example above.*

Components tagged with transitions need to be passed a **Boolean** `animationTrigger` prop, which controls whether or not they will animate in / out and mount / unmount from the DOM.

New transitions can be created by emulating the structure in `/CLIENTSIDE/JS/components/transitions/fadesUpAndDown.js`.

... ... ...

### *MobX / State Management:*
The template's sample application is pre-set to use the MobX framework for simple, reactive state management *(Including relevant Webpack settings for decorators!)*. A few key concepts are touched here; see the official MobX docs for extensive explanation of all MobX functionality.  

**React Component State**:  
Our React component tree uses the Mobx `Provider / Injector` context system for passing the primary `APP_STORE` around without having to pass it explicitly through the whole tree. Components tagged with the `@inject(store)` decorator *(should)* explicitly reference `this.props.store` at some point in their structure. *NOTE: The `@inject` decorator **always** needs to be the first decorator attached to any component.*

The `@observer` tag is a feature of the `mobx-react` library, which allows our React components to listen for changes to MobX `@observable` and `@computed` values, and update themselves as needed. The tag also allows us to use `@observable` and `@computed` values as an alternative to React's native `setState()` calls.

**The MobX `APP_STORE`**:  
All key application logic and state is contained within a single MobX store, which we declare in `index.jsx` as the variable `APP_STORE` and pass to our React component tree. The file itself lives at `/CLIENTSIDE/JS/stores/app_store.jsx`.

Within the file, there are numerous `@observable` and `@computed` values, as well as `@action` functions that update the observables. The file should be considered the equivalent of a big `controllers` file from MVC frameworks.

***All React components*** derive the majority of their state and methods from this file.

---
## CODE LINTING

This template uses a custom `.eslintrc` config file based upon the `AirBnB` standard. Files can be linted using the following command:  
`npm run lint -- PATH/TO/THE/JAVASCRIPT/FILE`

---
## HOSTING ON HEROKU

### *Key Settings:*
The settings declared in the application `.env` file **DO NOT** transfer directly to Heroku. Environment variables that the application relies upon, such as `WP_API_LINK` or `HOST_MODE`, need to be explicitly declared via the Heroku Dashboard by navigating to Settings -> Config Variables -> Reveal Config Vars. Here you can add and remove environment variables, which Heroku wilµl insert into its own `.env` file.

Heroku ships applications with a number of default environment variable settings. For instance, the `NODE_ENV` is set to `production` automatically; other Heroku
add-ons will automatically insert their own environment variables, such as the `MONGODB_URI` from `Mongolab` or the `ADEPT_SCALE_LICENSE_KEY`.

The `heroku-postbuild` script in our `package.json` is a critical step for `production` mode. After Heroku installs `node`, and all other frameworks and application dependencies, it will fire the `heroku-postbuild` hook - which, in our case, compiles all production assets to a static folder. This runs *before* the `Procfile` starts up our application.

The `Procfile` contained at the root level of the application folder structure is a file that tells Heroku what NPM script(s) to run when the application spins up across various process types. In our case, our app will boot up in `web` mode, and run the `npm run start` script after all dependencies are installed, etc.

... ... ...

### *Deploy Pipeline:*
Applications built on this template should use a Heroku pipeline to manage deploys from `staging` to `production`. All `git push` commands should be sent to a staging application, from which developers can manually push vetted code to a production application via the Heroku dashboard.
