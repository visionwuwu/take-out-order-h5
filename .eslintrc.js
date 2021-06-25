module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue3/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'import/order': 'off'
  },
  settings: {
    /** 解决路径引用ts文件报错的问题 */
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      /** 解决tsconfig下的path别名导致eslint插件无法解决的bug */
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}
