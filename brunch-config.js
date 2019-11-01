module.exports = {
  files: {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'}
  },
  paths: {
    public: './docs'
  },
  plugins: {
    pug: {
      staticPretty: true,
      pugRuntime: false
    },
    stylus: {
      plugins: ['autoprefixer-stylus', 'axis', 'rupture', 'jeet']
    }
  }
}