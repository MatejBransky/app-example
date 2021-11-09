# React + Keycloak

[Secure Frontend (React.js) and Backend (Node.js/Express Rest API) with Keycloak](https://medium.com/devops-dudes/secure-front-end-react-js-and-back-end-node-js-express-rest-api-with-keycloak-daf159f0a94e)

## TODOs

- [x] init React app
  - [ ] runtime config
  - [ ] mock API
  - [ ] mock auth
  - [ ] support authorization in React app
  - [ ] use i18n
- [x] setup Dockerfile for the React app
  - [ ] set security headers in nginx conf
- [x] prepare docker-compose
- [ ] setup Dockerfile for the Cypress tests
- [x] setup Keycloak
  - [x] realm
  - [x] react-web-app client
  - [x] BE client
  - [x] roles (admin, user)
  - [x] test user for each role
  - [x] describe export command
  - [x] autoimport realm
- [ ] init Cypress
- [ ] allow localhost in dev Keycloak
- [ ] allow only prod client URL in prod Keycloak
- [ ] set HTTPS only in prod
- [ ] set Github Actions
- [ ] use Yarn v2 so you can skip Cypress install in CI/CD
