import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map(line => line.split(""))
};

export const task1 = (input: ReturnType<typeof parseInputForDay>) => {
  const searchTerm = "XMAS"
  let xmases = 0
  for (const [y, row] of input.entries()) {
    for (const [x, letter] of row.entries()) {
        if (letter !== "X") {
            continue
        }

        // Normal in row
        if (row.length > x + 3) {
            if (row.slice(x, x + 4).join("") === searchTerm) {
                xmases += 1
            }
        }
        // Backwards in row
        if (x >= 3) {
            if (row.slice(x - 3, x + 1).reverse().join("") === searchTerm) {
                xmases += 1
            }
        }
        // Normal in col
        if (input.length > y + 3) {
            if (input.slice(y, y + 4).map(row => row[x]).join("") === searchTerm) {
                xmases += 1
            }
        }
        // Backwards in col
        if (y >= 3) {
            if (input.slice(y - 3, y + 1).map(row => row[x]).reverse().join("") === searchTerm) {
                xmases += 1
            }
        }
        // NW to SE
        if (row.length > x + 3 && input.length > y + 3) {
            if (input[y + 1][x + 1] === "M" && input[y + 2][x + 2] === "A" && input[y + 3][x + 3] === "S") {
                xmases += 1
            }
        }
        // NE to SW
        if (x >= 3 && input.length > y + 3) {
            if (input[y + 1][x - 1] === "M" && input[y + 2][x - 2] === "A" && input[y + 3][x - 3] === "S") {
                xmases += 1
            }
        }
        // SE to NW
        if (x >= 3 && y >= 3) {
            if (input[y - 1][x - 1] === "M" && input[y - 2][x - 2] === "A" && input[y - 3][x - 3] === "S") {
                xmases += 1
            }
        }
        // SW to NE
        if (row.length > x + 3 && y >= 3) {
            if (input[y - 1][x + 1] === "M" && input[y - 2][x + 2] === "A" && input[y - 3][x + 3] === "S") {
                xmases += 1
            }
        }
    }
  }

  return xmases
};

export const task2 = (input: ReturnType<typeof parseInputForDay>) => {
    let x_mases = 0;
    for (let y = 1; y < input.length -1; y++) {
        for (let x = 1; x < input[y].length -1; x++) {
            if (input[y][x] !== "A") {
                continue
            }

            const diag1 = input[y - 1][x - 1] + input[y + 1][x + 1]
            const diag2 = input[y - 1][x + 1] + input[y + 1][x - 1]

            if ((diag1 === "SM" || diag1 === "MS") && (diag2 === "SM" || diag2 === "MS")) {
                x_mases += 1
            }
        }
    }

    return x_mases
};
