# Nest

### Usage
For a production deployment, the ideal way to run Nest would be to:
- Have either `npm run build` or `yarn build` be ran to generate the `/dist` folder during the deployment process. Such as with [Oryx](https://github.com/microsoft/Oryx/blob/main/doc/runtimes/nodejs.md), [Github Actions](https://docs.microsoft.com/en-us/azure/app-service/deploy-github-actions?tabs=applevel) or [DevOps](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/javascript?view=azure-devops&tabs=code), for example.
- Set the startup command for the Web App to be either `npm run start:prod` or directly run `node dist/main`. This can be done by going to the Azure Portal for the Web App -> General Settings -> 'Startup Command'
- These scripts can also be seen in `package.json`. 
