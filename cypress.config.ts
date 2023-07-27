import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { defineConfig } from 'cypress';

const setupNodeEvents = async (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> => {
  await addCucumberPreprocessorPlugin(on, config);
  require('./cypress/plugins/index.ts').default(on, config);
  return config;
};

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  requestTimeout: 20000,
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    specPattern: 'cypress/features/**/*.feature',
    setupNodeEvents,
  },
});
