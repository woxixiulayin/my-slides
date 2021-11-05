// 一个上传文件功能
async function uploadFile() {
  const files = await selectFiles()
  await doUpload(files)
  console("done! nice Job!")
}
