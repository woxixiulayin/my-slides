module.exports = {
  onInstall(context, event) {
    console.log("install pluginA ")
    event.on("onAdd", () => this.onAdd(context.files))
  },

  onAdd(files) {
    console.log("files is ", files)
  },

  onUninstall() {
    console.log("uninstall pluginA ")
  },
}
