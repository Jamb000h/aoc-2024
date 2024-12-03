import "../utils";

export const parseInputForDay = (file: string) => {
  return file;
};

export const task1 = (input: ReturnType<typeof parseInputForDay>) => {
  return [...input.matchAll(/mul\((\d+)\,(\d+)\)/g)]
    .map((result) => Number(result[1]) * Number(result[2]))
    .sum();
};

export const task2 = (input: ReturnType<typeof parseInputForDay>) => {
  const instructions = [
    ...input.matchAll(/(mul\((\d+)\,(\d+)\))|(do\(\))|(don\'t\(\))/g),
  ].map((ins) => ins[0]);

  let res = 0;
  let can_multiply = true;

  for (const ins of instructions) {
    if (ins.indexOf("'") > -1) {
      can_multiply = false;
      continue;
    }

    if (ins.indexOf("d") > -1) {
      can_multiply = true;
    }

    if (can_multiply) {
      const multiplyResult = [...ins.matchAll(/mul\((\d+)\,(\d+)\)/g)]
        .map((result) => Number(result[1]) * Number(result[2]))
        .sum();
      res += multiplyResult;
    }
  }

  return res;
};
