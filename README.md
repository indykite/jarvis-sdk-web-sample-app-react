# Sample React app with Indykite UI-SDK

IndyKite is a cloud identity platform built to secure and manage human and non-person (IoT) identities and their data. This repository contains the JavaScript Library packages for the [IndyKite Platform](https://indykite.com/platform) Client SDK.

This library contains multiple client libraries for each service of the platform:

- Token introspection
- CRUD operations on digital twins
- Change password
- Limited configuration management

You must obtain an API key before you can access the platform.

## Terminology

| Definition               | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| Digital Twin             | The digital identity of a physical entity on/in a software/identity system.    |
| Application Space ID     | ID of the application the digital twin belongs to.                                          |
| Application Agent ID     | ID of the agent which makes the application available for the different calls.                    |
| Tenant ID                | ID of the tenant the digital twin belongs to. The tenant belongs to an application space. |
| Private Key and Settings | The secret required to reach the system. Indykite provides the necessary secrets.           |
| Property                 | The digital twin's property (for example, email, name).                                                  |
| JWT                      | JSON web tokens.                                                                                  |
| Introspect               | A process used to validate the token and retrieve properties assigned to the token.            |
| Patch property           | Add, change, or delete a property of a digital twin.                                               |

## Documentation

Visit the IndyKite One Developer Community site for official [IndyKite documentation](https://indykite.one/blog?category=5e3e9297-3451-4b52-91ee-8027dcd1789c) and to learn to use the entire platform for your project.

## Getting Started

### Trial

For a trial, please contact [IndyKite](https://indykite.com/trial) to set up and configure the platform.

This project uses a Yarn workspace, which means multiple projects are hosted in the `/packages/` folder.  The hosted projects are:

- web - Sample JS React app
- web-ts - Sample TypeScript React app
- web-simple - Sample simple HTML Javascript app

### To run this project locally

1. Copy the file `/packages/web/.env-example` as `/packages/web/.env` or `/packages/web-ts/.env`. Fill in the variables where the sample app should be connected:

```javascript
REACT_APP_BASE_URI = "";
REACT_APP_TENANT_ID = "";
REACT_APP_APPLICATION_ID = "";
```

2. Run `yarn`.
3. Run `yarn web start`.

##### To run the Typescript version:

Run `yarn web-ts start`.

##### To run a simple version:

Run `yarn web-simple start`.

The simple version has env variables hard-coded in index.html.

### To use a local version of `@indykiteone/jarvis-sdk-web`

1. Clone the repository from https://github.com/indykite/jarvis-sdk-web.
2. In the terminal, go to the root of the repository.
3. Run `yarn link` or `npm link`.
4. In the terminal, go to the folder `/node_modules/` of the specific app package. Choose either
   `/packages/web/node_modules/` or `/packages/web-ts/node_modules`.
5. Run `yarn link @indykiteone/jarvis-sdk-web` or `npm link @indykiteone/jarvis-sdk-web`.

### If you need to run the app on different port than 3000

1. Go to package.json in the sample package web repo.
2. Modify start script under scripts to `"start": "react-scripts start"`.

## Roadmap

Check out our roadmap on our [issues page](https://github.com/indykite/jarvis-sdk-web-sample-app-react/issues).

## Contributing

[Contribution guidelines for this project](contributing.md).

## Support, feedback, and connect with other developers

Connect with us and other community developers in our community at [IndyKite.one](https://indykite.one).

File a bug, submit an issue, or give us feedback on our [issues page](https://github.com/indykite/jarvis-sdk-web-sample-app-react/issues).

## Vulnerability reporting

[Responsible Disclosure](responsible_disclosure.md)

## Changelog

Coming soon!

## Contributors / acknowledgements

Coming soon!

## What is IndyKite?

IndyKite is a cloud identity platform built to secure and manage human and non-person (IoT) identities and their data. Based on open source standards, the cloud platform lets developers secure data and embed identity controls into their Web 3.0 applications, thereby empowering the world’s 23 million developers without the need to involve security and identity specialists.

## License

[This project is licensed under the terms of the Apache 2.0 license.](LICENSE)
