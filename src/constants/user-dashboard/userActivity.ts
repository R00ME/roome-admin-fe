import { Gender } from "../../types/user-dashboard";

export const normalizeGender = (g: unknown): Gender => {
  const v = String(g ?? '').toUpperCase();
  if (v === 'FEMALE') return 'FEMALE';
  if (v === 'MALE') return 'MALE';
  return 'UNKNOWN';
};


export const toIsoString = (value: unknown): string => {
  try {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'number') return new Date(value).toISOString();
    if (typeof value === 'string') return new Date(value).toISOString();
  } catch (e) {
    console.error(e)
  }
  return '';
};
