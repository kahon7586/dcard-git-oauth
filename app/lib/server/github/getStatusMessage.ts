const DEFAULT_MESSAGE: { [key: string]: string } = {
  "200": "Success",
  "301": "301: This issue was moved permanently.",
  "403": "403: You don't have permission to edit this issue, check your authorization and try again.",
  "404": "404: Not Found",
  "410": "410: Gone",
  "422": "422: Validation failed, or the endpoint has been spammed.",
  "503": "503: Github service unavailable, try again later.",
}

export function getStatusMessage(
  code: string | number,
  fnName: string,
  customizedMessage?: { [key: string]: string | null }
) {
  if (typeof code === "number") {
    code = code.toString()
  }

  const mergedMessage = { ...DEFAULT_MESSAGE, ...customizedMessage }

  if (code === "200") return mergedMessage[code]!

  const prefix = `Error when running "${fnName}", code: `
  const message = mergedMessage[code.toString()]

  if (message) throw Error(prefix + message)

  throw Error(`Obtain unrecognized code when running "${fnName}": ${code}`)
}
