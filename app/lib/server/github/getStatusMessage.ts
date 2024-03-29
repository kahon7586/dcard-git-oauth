const SUCCESS_CODE = ["200", "201", "202"];
const DEFAULT_MESSAGE: { [key: string]: string } = {
  "301": "301: This issue was moved permanently.",
  "400": "400: Bad request.",
  "403":
    "403: You don't have permission for this operation, check your authorization and try again.",
  "404": "404: Not Found",
  "410": "410: Gone",
  "422": "422: Validation failed, or the endpoint has been spammed.",
  "503": "503: Github service unavailable, try again later.",
};

/**
 * @deprecated This function is deprecated due to octokit throw err as response
 */

export function getStatusMessage(
  code: string | number,
  fnName: string,
  customizedMessage?: { [key: string]: string | null },
) {
  if (typeof code === "number") code = code.toString();

  if (SUCCESS_CODE.includes(code)) return `${code}: Success.`;

  const mergedMessage = { ...DEFAULT_MESSAGE, ...customizedMessage };

  // <--- Failed --->
  const message = mergedMessage[code];
  if (message) return `Error when running "${fnName}": ${message}`;

  return `Obtain unrecognized code when running "${fnName}": ${code}`;
}
