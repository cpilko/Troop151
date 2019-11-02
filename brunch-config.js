module.exports = {
  files: {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'}
  },
  paths: {
    public: './preview'
  },
  plugins: {
    pug: {
      staticPretty: true,
      pugRuntime: false
    },
    stylus: {
      plugins: ['autoprefixer-stylus', 'axis', 'rupture', 'jeet']
    }
  },
  overrides: {
    production: {
      optimize: true,
      sourceMaps: false,
      paths: {
        public: './public'
      }
    }
  }
}