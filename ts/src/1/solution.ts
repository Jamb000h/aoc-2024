import { sumOf } from "../utils";

export const parseInputForDay = (file: string) => {
    return file
};

export const task1 = (input: ReturnType<typeof parseInputForDay>) => {
    const nums = input.split(/\s+/).map(Number)
    const line1 = []
    const line2 = []
    nums.forEach((n, i) => i % 2 ? line2.push(n) : line1.push(n))
    line1.sort()
    line2.sort()
    const distances = line1.map((n, i) => Math.abs(n - line2[i]))
    return sumOf(distances)
};

export const task2 = (input: ReturnType<typeof parseInputForDay>) => {
    const nums = input.split(/\s+/).map(Number)
    const line1 = []
    const line2 = []
    nums.forEach((n, i) => i % 2 ? line2.push(n) : line1.push(n))
    const similarityScores = line1.map(n => n * line2.filter(v => v === n).length)
    return sumOf(similarityScores)
};