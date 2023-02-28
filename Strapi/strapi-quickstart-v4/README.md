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

## ⚙️ Deployment to Linux App Service

This Repo is slightly modified for deployment to a Azure Linux App Service as a Proof of Concep Project.
Below are some of the changes.

* Make sure deployment is using the app service build system (oryx). With this framework you may face slow deployment times using any other method of deployment. You can make sure the oryx build is running by adding the following app settings: 

    ~~~json
    SCM_DO_BUILD_DURING_DEPLOYMENT=true
    ~~~

    - [Oryx/node.js](https://github.com/microsoft/Oryx/blob/main/doc/runtimes/nodejs.md)
    - [Oryx/Hosts - App Service](https://github.com/microsoft/Oryx/blob/main/doc/hosts/appservice.md)


* Add the following app setting to resolve package installation errors when trying to write to a path under the Kudu site.

    Deployment Error Message:
    ~~~
    remote: sharp: Installation error: EACCES: permission denied, mkdir '/opt/Kudu/local/npm-cache'
    ~~~
    
    App Setting:
    ~~~json
    NPM_CONFIG_CACHE=/tmp
    ~~~

* Added *.yarnrc* file as deployment for some of the common packages may timeout when yarn tries to access them.
  
  More information here: [Fix Yarn ESOCKETTIMEDOUT with .yarnrc Configuration File](https://azureossd.github.io/2022/09/10/fix-yarn-ESOCKETTIMEDOUT-with-.yarnrc-configuration-file/index.html)

* Add the following environment variables necessary for strapi, you can find the sample values in your generated project's *.env* file.

    App Settings: 
    ~~~json
    ADMIN_JWT_SECRET= {}
    API_TOKEN_SALT= {}
    APP_KEYS= {}
    ~~~


* For the purpose of the project we have pointed to a database file stored under temporary storage */tmp/data.db*. This is because SQLite 3 is not supported to be stored under the /home storage on app service due to locking issues. 

    **You will lose your databasefile file whenever the app service restarts for this project. This project is entended for a proof of concept.**

* The Please configure your Strapi application to rely on a external database such as Azure MySQL or Azure PostGres when deploying your application to Azure. 

    - [Quickstart: Use the Azure portal to create an Azure Database for MySQL Flexible Server](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/quickstart-create-server-portal)
    - [Quickstart: Use the Azure portal to create an Azure Database for MySQL Flexible Server](https://learn.microsoft.com/en-us/azure/postgresql/single-server/quickstart-create-server-database-portal)

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
