module.exports = {
  env: { node: true },
  extends: [
    'eslint:recommended', // this maybe causes errors in defineEmits<{}>() ???
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  /* globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
  }, */
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  // plugins: ['@typescript-eslint'], // might not be needed
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'auth',
          'login',
          'signup',
          'header',
          'footer',
          'list',
          'index',
          'detail',
          'default',
          '404',
          'checkout',
          'confirmation',
          'receipt',
          'dashboard',
          'home'
        ]
      }
    ]
  }
}
