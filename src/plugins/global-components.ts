import type { App, Plugin } from 'vue'

function toPascalCase(name: string) {
  return name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

const modules = import.meta.glob('@/components/**/*.vue', { eager: true })

const GlobalComponentsPlugin: Plugin = {
  install(app: App) {
    Object.entries(modules).forEach(([path, mod]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const component = (mod as any)?.default
      if (!component) return
      const file = path.split('/').pop() as string
      const base = file.replace(/\.\w+$/, '')
      const name = component.name ?? toPascalCase(base)
      app.component(name, component)
    })
  },
}

export default GlobalComponentsPlugin
