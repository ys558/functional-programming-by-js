interface Monoid<T> {
  empty: (length?: number) => T;
  concat: (x: T, y: T) => T;
}

type StaffMember = {
  name: string;
  age: number;
  dept: string;
  scores: number[];
};

// 定义一个新的平均分数计算 Monoid
const scoreArrayMonoid: Monoid<number[]> = {
  empty: (length: number = 0) => Array(length).fill(0),
  concat: (x, y) => {
    return x.map((val, index) => val + (y[index] ?? 0));
  },
};

const calculateAverageScores = (
  monoid: Monoid<number[]>,
  scoresArray: number[][]
): number[] => {
  const initialScores = monoid.empty(scoresArray[0].length);
  const totalScores = scoresArray.reduce(
    (acc, scores) => monoid.concat(acc, scores),
    initialScores
  );

  return totalScores.map((total) => total / scoresArray.length);
};

// 分组函数
const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((acc, item) => {
    const group = item[key] as unknown as string;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

// 平均分数插入函数
const addAverageScore = (
  groupedData: Record<string, StaffMember[]>,
  monoid: Monoid<number[]>
): Record<string, (StaffMember | { dept: string; scores: number[] })[]> => {
  const result: Record<
    string,
    (StaffMember | { dept: string; scores: number[] })[]
  > = {};

  for (const dept in groupedData) {
    const members = groupedData[dept];
    const allScores = members.map((member) => member.scores);
    const avgScores = calculateAverageScores(monoid, allScores);

    result[dept] = [...members, { dept, scores: avgScores }];
  }

  return result;
};

// 示例数据
const staff: StaffMember[] = [
  { name: "Max", age: 20, dept: "IT", scores: [29, 23, 28] },
  { name: "Jane", age: 20, dept: "IT", scores: [33, 23, 28] },
  { name: "Alex", age: 55, dept: "sales", scores: [26, 23, 28] },
  { name: "May", age: 45, dept: "IT", scores: [31, 23, 28] },
  { name: "Kelly", age: 34, dept: "sales", scores: [30, 27, 22] },
];

// 分组并计算平均分
const groupedByDept = groupBy(staff, "dept");
const result = addAverageScore(groupedByDept, scoreArrayMonoid);

console.log(result);
