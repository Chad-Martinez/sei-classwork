export const addNums = (numArr: Array<number>): number =>
  numArr.reduce((acc: number, curr: number): number => acc + curr, 0);

export const getAvgs = (
  numArr: Array<number>,
  denomArr: Array<number>
): number => addNums(numArr) / addNums(denomArr);

export const isGradeable = (dueDate: string): boolean =>
  Date.parse(dueDate) <= Date.now();

export const isPastDue = (dateSubmitted: string, dateDue: string): boolean =>
  Date.parse(dateSubmitted) > Date.parse(dateDue);
