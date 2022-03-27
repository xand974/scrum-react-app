export const capitalize = (value: string) => {
  let res = "";
  const firstLetterUpperCase = value[0].toUpperCase();
  const size = value.length;
  if (value.length === 1) return firstLetterUpperCase;
  res += firstLetterUpperCase;
  for (let i = 1; i < size; i++) {
    res += value[i];
  }
  return res;
};
