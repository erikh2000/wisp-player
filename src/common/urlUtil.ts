export const HOME_URL = baseUrl('/');
export const PLAY_URL = baseUrl('/play');

export const MIC_ACCESS_URL = baseUrl('/micAccess');

export function baseUrl(path: string) {
  if (path.startsWith('/')) { path = path.slice(1); }
  const baseUrl = import.meta.env.VITE_BASE_URL || '/';
  return `${baseUrl}${path}`;
}