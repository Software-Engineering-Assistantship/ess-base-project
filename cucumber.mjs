/* eslint-disable import/no-anonymous-default-export */

export default {
  format: ['html:tests/reports/cucumber-report.html'],
  parallel: 2,
  paths: ['tests/features/**/*.feature'],
  require: ['tests/step-definition/**/*.ts','tests/support/**/*.ts'],
  requireModule: ['ts-node/register'],
}