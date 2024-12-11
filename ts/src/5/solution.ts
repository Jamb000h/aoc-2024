import "../utils";

export const parseInputForDay = (file: string) => {
  const [rawOrderingRules, rawUpdates] = file.split("\r\n\r\n");
  const orderingRules = rawOrderingRules.split("\r\n").reduce((acc, cur) => {
    const [key, value] = cur.split("|").map(Number);
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(value);

    return acc;
  }, {});

  const updates = rawUpdates
    .split("\r\n")
    .map((update) => update.split(",").map(Number));

  return {
    orderingRules,
    updates,
  };
};

export const task1 = (input: ReturnType<typeof parseInputForDay>) => {
  const validUpdates = input.updates.filter((update) => {
    return update.every((page, i) => {
      const afterPages = update.slice(i + 1);
      const notTooLate = afterPages.every((afterPage) => {
        return (
          !input.orderingRules[afterPage] ||
          !input.orderingRules[afterPage].includes(page)
        );
      });

      return notTooLate;
    });
  });

  return validUpdates
    .flatMap((update) => update.slice(update.length / 2, update.length / 2 + 1))
    .sum();
};

export const task2 = (input: ReturnType<typeof parseInputForDay>) => {
  const inValidUpdates = input.updates.filter((update) => {
    return update.some((page, i) => {
      const afterPages = update.slice(i + 1);
      const tooLate = afterPages.some((afterPage) => {
        return (
          input.orderingRules[afterPage] &&
          input.orderingRules[afterPage].includes(page)
        );
      });

      return tooLate;
    });
  });

  const fixInvalidUpdate = (update: number[]) => {
    const orderingRuleSorter = (a: number, b: number) => {
      if (input.orderingRules[a] && input.orderingRules[a].includes(b)) {
        return -1;
      }

      return 1;
    };

    return update.sort(orderingRuleSorter);
  };

  const fixedInvalidUpdates = inValidUpdates.map(fixInvalidUpdate);

  return fixedInvalidUpdates
    .flatMap((update) => update.slice(update.length / 2, update.length / 2 + 1))
    .sum();
};
