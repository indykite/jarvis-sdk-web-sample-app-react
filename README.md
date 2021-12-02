# Sample React App with Indykite UI-SDK

IndyKite is a cloud identity platform built to secure and manage human & non-person (IoT) identities and their data. This repository containts the JavaScript Library packages for [IndyKite Platform](https://indykite.com) Client SDK.

This library contains multiple client libraries for each service of the platform.

- Token Introspection
- CRUD Operations on Digital Twins
- Change Password
- Limited Configuration Management

In order to access to the platform you must obtain an API key first.

## Terminology

| Definition               | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| Digital Twin             | A digital twin is the digital identity of a physical entity on/in a software/identity system     |
| Application Space ID     | ID of the application where the digital twin belongs to                                          |
| Application Agent ID     | ID of the agent which makes the application available for the different calls                    |
| Tenant ID                | ID of the tenant where the digital twin belongs to. The tenant is belong to an application space |
| Private Key and Settings | The secret which required to reach the system. Indykite provides the necessary secrets           |
| Property                 | The digital twin's property (eg.: email, name)                                                   |
| JWT                      | JSON Web Tokens                                                                                  |
| Introspect               | A process used to validate the token and to retrieve properties assigned to the token            |
| Patch property           | Add, change or delete a property of a digital twin                                               |

## Documentation

Visit the IndyKite One Developer Community site for official [IndyKite documentation](https://indykite.one/blog?category=5e3e9297-3451-4b52-91ee-8027dcd1789c) and to find out how to use the entire platform for your project.

## Getting Started

### Trial

For a trial please contact [IndyKite](https://www.indykite.com/contact-us) to setup and
configure the platform.

This project is using yarn workspace. Which means multiple projects are hosted in the `/packages/` folder.  
The hosted projects are:

- web - Sample JS React App
- web-ts - Sample TypeScript React App
- web-simple - Sample simple html javascript app

### To run this project locally

1. Copy file `/packages/web/.env-example` as `/packages/web/.env` or `/packages/web-ts/.env`

Fill in the variables where the sample app should be connected.

```javascript
REACT_APP_BASE_URI = "";
REACT_APP_TENANT_ID = "";
REACT_APP_APPLICATION_ID = "";
```

2. Run `yarn`
3. Run `yarn web start`

##### If you want to run typescript version:

Run `yarn web-ts start`

##### If you want to run simple version:

Run `yarn web-simple start`

The simple version has env variables hard coded in index.html

### If you want to use local version of `@indykiteone/jarvis-sdk-web`

1. Clone the repository from https://github.com/indykite/jarvis-sdk-web
2. In terminal go to the root of the repository
3. Run `yarn link` or `npm link`
4. In terminal go to folder `/node_modules/` of the specific app package - either
   `/packages/web/node_modules/` or `/packages/web-ts/node_modules`
5. Run `yarn link @indykiteone/jarvis-sdk-web` or `npm link @indykiteone/jarvis-sdk-web`

### If you need to run the app on different port than 3000

1. Go to package.json in the sample package web repo
2. Modify start script under scripts to `"start": "react-scripts start"`

## Roadmap

Checkout our roadmap on our [issues page](https://github.com/indykite/jarvis-sdk-web-sample-app-react/issues)

## Contributing

[Contribution guidelines for this project](contributing.md)

## Support, Feedback, Connect with other developers

We'd love to have you connect with us or other community developers over at [IndyKite.one](https://indykite.one)

Feel free to file a bug, submit an issue or give us feedback on our [issues page](https://github.com/indykite/jarvis-sdk-web-sample-app-react/issues)

## Vulnerability Reporting

[Responsible Disclosure](responsible_disclosure.md)

## Changelog

Coming Soon!

## Contributers / Acknowledgements

Coming Soon!

## What is IndyKite

IndyKite is a cloud identity platform built to secure and manage human & non-person (IoT) identities and their data. Based on open source standards, the cloud platform gives developers the ability to secure data and embed identity controls into their Web 3.0 applications. Empowering the world’s 23 million developers without the need to involve security and identity specialists.

## License

[This project is licensed under the terms of the Apache 2.0 license.](LICENSE)
