export const toXSV = (data: {}, del: string, quote?: string) =>
  Object.keys(data)
    .sort()
    .reduce(
      (acc, cur) =>
        acc + (!quote ? data[cur] : quote + data[cur] + quote) + del,
      ''
    ) + '\n'
