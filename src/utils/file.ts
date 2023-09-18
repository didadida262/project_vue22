// 生成file的url
export function obtainLocalUrlByFileData(fileData) {
  const localUrl = URL.createObjectURL(new Blob([fileData.raw]))
  return localUrl
}
