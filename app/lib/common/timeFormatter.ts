const timeDivider = [
  { name: "second", value: 60 },
  { name: "minute", value: 60 },
  { name: "hour", value: 24 },
  { name: "day", value: 7 },
  { name: "week", value: 4.3452 },
  // Averagely, 1 month has 365 / 12 = 30.4167 days,
  // so 1 month has 365 / 12 / 7 = 4.3452 weeks
  { name: "month", value: 12 },
  { name: "year", value: Number.POSITIVE_INFINITY },
]

export function timeFormatter(date: Date) {
  const currTimeStamp = new Date().getTime()
  const postTimeStamp = date.getTime()
  let timeDiff = Math.trunc((currTimeStamp - postTimeStamp) / 1000)
  //turn unit of timeDiff into second, not milisecond

  if (timeDiff < 0) throw Error(`Get negative timeDiff(from future): ${timeDiff}`)
  if (timeDiff < 1) return "Just now"

  for (let i = 0, n = timeDivider.length; i < n; i++) {
    let name = timeDivider[i].name
    const value = timeDivider[i].value
    if (timeDiff < value) {
      if (timeDiff >= 2) name = name + "s"
      return `${Math.floor(timeDiff)} ${name} ago`
    }
    timeDiff /= value
  }
  throw Error(`error occured when formatting date: ${timeDiff}`)
}
