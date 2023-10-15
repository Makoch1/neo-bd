import { toUTCYMD, getEpochMS } from "../utils/timezone";

test("toUTCYMD returns correct date", () => {
    expect(toUTCYMD('2023-10-15', '08:00')).toBe('2023-10-15')
})

test("toUTCYMD returns date formatted with leading zero", () => {
    expect(toUTCYMD('2023-06-21', '08:00')).toBe('2023-06-21')
})

test("getEpochMS returns correct milliseconds", () => {
    expect(getEpochMS('2023-10-15', '08:00')).toBe(1697328000000)
})