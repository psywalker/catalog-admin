export const toNumber = (value: unknown): number => Number(String(value ?? '').replace(',', '.'));

export const toTrimmed = (value: unknown): string => String(value ?? '').trim();
