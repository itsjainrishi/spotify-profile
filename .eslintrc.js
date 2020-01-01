module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "no-extra-boolean-cast": 0,
    'camelcase': ['error',
      { 
        allow: ['is_playing', 'external_urls', 'progress_ms', 'is_connected'] 
      }
    ],
  }
}
