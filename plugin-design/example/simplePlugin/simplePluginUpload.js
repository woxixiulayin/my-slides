const events = require("events")

class PluginManager {
  // 通过事件触发插件功能运行
  event = new events.EventEmitter()
  // 统一管理插件
  _pluginMap = new Map()
  constructor(context, configPath) {
    this.context = context
    // 初始化插件
    this._initPlugins(configPath)
  }

  _initPlugins(configPath) {
    const { plugins = [] } = require(configPath)
    plugins.forEach(pluginPath => {
      const plugin = require(pluginPath)
      this.installPlugin(pluginPath, plugin)
    })
    console.log("init done, plugins is", [...this._pluginMap.keys()])
  }

  uninstallAllPlugin() {
    for (let plugin of this._pluginMap.values()) {
      plugin.onUninstall()
    }
  }

  installPlugin(name, plugin) {
    if (typeof plugin.onInstall !== "function") {
      throw `can not install plugin ${name} without onInstall method`
    }
    this._pluginMap.set(name, plugin)
    plugin.onInstall(this.context, this.event)
  }

  uninstallPlugin(name) {
    if (this._pluginMap.has(name)) {
      this._pluginMap.get(name).uninstall()
    }
  }
}

// plugin interface { install(event); uninstall()}
const context = {
  files: [],
}
const pluginManager = new PluginManager(context, "./simplePlugin.config.js")

const uploader = {
  start: files => {
    pluginManager.event.emit("onAdd")
    pluginManager.event.emit("preUpload")
    pluginManager.event.emit("uploading")
    pluginManager.event.emit("postUpload")
    pluginManager.uninstallAllPlugin()
  },
}

uploader.start()
