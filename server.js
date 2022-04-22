const express = require('express');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(helmet({ contentSecurityPolicy: false }));
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//       'default-src': [
//         "'self'",
//         'https://www.google-analytics.com',
//         'https://www.googletagmanager.com',
//         'https://res.cloudinary.com',
//         'https://cms.4-hmilitarypartnerships.org',
//         "'unsafe-inline'",
//         "'unsafe-eval'",
//       ],
//       'script-src': [
//         "'self'",
//         'https://www.google-analytics.com',
//         'https://www.googletagmanager.com',
//         'https://res.cloudinary.com',
//         'https://cms.4-hmilitarypartnerships.org',
//         "'unsafe-inline'",
//         "'unsafe-eval'",
//       ],
//       'img-src': ["'self'", 'data:', 'www.googletagmanager.com', 'https://res.cloudinary.com'],
//     },
//   })
// )

app.get('/docker/docker-check', (_, res) => res.send('app is ready'));

app.use(express.static(path.resolve(__dirname, './build'), { maxAge: '30d' }));
// app.get('/service-worker.js', (_, res) => {
//   res.sendFile(path.resolve(__dirname, './src/serviceWorker.js'))
// })
// app.get('/service-worker.js', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'service-worker.js'))
// })
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(process.env.PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
