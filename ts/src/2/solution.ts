import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map((line) => line.split(/\s+/).map(Number));
};

const isSafe = (report: number[]) => {
  const ascending = report.at(0) < report.at(-1);
  const windows = report.windows<number>(2);
  for (const window of windows) {
    if (window[0] === window[1]) {
      return false;
    }

    if (ascending && window[0] > window[1]) {
      return false;
    }

    if (!ascending && window[0] < window[1]) {
      return false;
    }

    if (Math.abs(window[0] - window[1]) > 3) {
      return false;
    }
  }
  return true;
};

export const task1 = (input: ReturnType<typeof parseInputForDay>) => {
  return input.filter(isSafe).length;
};

export const task2 = (input: ReturnType<typeof parseInputForDay>) => {
  const checkReportWithDampener = (report: number[]) => {
    if (isSafe(report)) {
      return true;
    }

    const dampenedReports = [];
    
    for (let i = 0; i < report.length; i++) {
      dampenedReports.push(report.slice(0, i).concat(report.slice(i + 1)));
    }

    return dampenedReports.map(isSafe).some(Boolean);
  };

  return input.filter(checkReportWithDampener).length;
};
