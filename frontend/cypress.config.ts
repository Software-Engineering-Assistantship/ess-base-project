import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import addCucumberPreprocessorPlugin from '@badeball/cypress-cucumber-preprocessor'
export default defineConfig({
  e2e: {
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin.addCucumberPreprocessorPlugin(
        on,
        config,
      )

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      )

      return config
    },
    baseUrl: 'http://localhost:5173/',
    specPattern: 'cypress/e2e/**/*.feature',
  },
})
