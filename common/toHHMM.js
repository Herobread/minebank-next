const { default: twoDigits } = require("./twoDigits")

export default function toHHMM(time) {
    const date = new Date(time)

    return `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`
}