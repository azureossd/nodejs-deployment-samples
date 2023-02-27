# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

This Repo is slightly modified for deployment to a Azure Linux App Service as a Proof of Concep Project.
Below are some of the changes.

* Make sure deployment is using the app service build system (oryx) as with this framework you may face slow deployment times using any other method of deployment. You can make sure the oryx build is running by adding the following app settings: SCM_DO_BUILD_DURING_DEPLOYMENT=true
    - https://github.com/microsoft/Oryx/blob/main/doc/runtimes/nodejs.md
    - https://github.com/microsoft/Oryx/blob/main/doc/hosts/appservice.md


* Added .yarnrc file as deployment for some of the common packages may timeout.
  More information here: https://azureossd.github.io/2022/09/10/fix-yarn-ESOCKETTIMEDOUT-with-.yarnrc-configuration-file/index.html

* For the purpose of the project we have pointed to a database file stored under temporary storage /tmp/data.db. This is because SQLite 3 is not supported to be stored under the /home storage on app service due to locking issues. **You will lose your datafile file whenever the app service restarts for this project.**

* The Please configure your Strapi application to rely on a external database such as Azure MySQL or Azure PostGres when developing your application.
    - https://azure.microsoft.com/en-us/products/mysql
    - https://azure.microsoft.com/en-us/products/postgresql/

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
