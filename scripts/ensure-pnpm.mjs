const ua = process.env.npm_config_user_agent || ''
if (!/\bpnpm\/\d/.test(ua)) {
  console.error('请使用 pnpm 安装依赖：pnpm install')
  process.exit(1)
}
