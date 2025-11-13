/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // 忽略 @property 等未知 at-rule 的警告
      ignoreUnknownAtRules: true
    }
  }
}

export default config
