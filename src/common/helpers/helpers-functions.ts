export function generateCustomErrors(arr: any) {
  const fails = {};
  arr.forEach((el: any) => {
    const { property, constraints } = el;

    if (!fails[property]) {
      fails[property] = [];
    }

    Object.values(constraints).forEach((constraintMessage) => {
      fails[property].push(constraintMessage);
    });
  });
  return fails;
}

export function customDate(date: Date) {
  const data = new Date(date);
  return Math.floor(data.getTime() / 1000);
}
