module.exports = {
  onInstall(context, event) {
    console.log("install pluginB ")
    event.on("preUpload", () => this.onPreUpload(context.files))
  },

  onPreUpload(files) {
    console.log("onPreUpload: files is ", files)
  },

  onUninstall() {
    console.log("uninstall pluginA ")
  },
}
