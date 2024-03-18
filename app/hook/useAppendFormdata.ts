import { useEffect } from "react"

export function useAppendFormdata(
  formRef: React.MutableRefObject<HTMLFormElement | null>,
  appendObj: { [key: string]: string | Blob }
) {
  useEffect(() => {
    const form = formRef.current!

    const formDataHandler = (e: FormDataEvent) => {
      // append formData before being send to server side
      // note that event.preventDefault() will prevent sending data from client side

      const formData = e.formData

      Object.entries(appendObj).forEach((pair) => {
        formData.append(pair[0], pair[1])
      })
    }

    form.addEventListener("formdata", formDataHandler)

    return () => {
      form.removeEventListener("formdata", formDataHandler)
    }
  })

  return
}
