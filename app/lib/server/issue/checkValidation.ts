export function checkValidation(title: string | null, body: string | null) {
  if (!title || title.length === 0 || title.trim() === "")
    return { validation: false, reason: "Please choose a title!" };
  // handle empty input value

  if (body!.length < 30)
    return { validation: false, reason: "Body must more than 30 words." };
  // handle body value

  return { validation: true, reason: "" };
}
