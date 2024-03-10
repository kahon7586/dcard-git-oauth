import xss from "xss"
import markdownit from "markdown-it"

export async function markdownParser(markdownStr: string) {
  const md = markdownit()
  let result = md.render(markdownStr)

  const unsanitizedInnerHTML: string = result

  const sanitizedInnerHTML = xssSanitizer(unsanitizedInnerHTML)

  return sanitizedInnerHTML
}

function xssSanitizer(unsanitizedString: string) {
  return xss(unsanitizedString)
}
