export const formatPricePartsRu = (value: number) => {
  const safeValue = Number.isFinite(value) ? value : 0;

  const [intPart, fractionPart = '00'] = safeValue
    .toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .split(',');

  return { intPart, fractionPart };
};
