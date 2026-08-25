import dns from 'node:dns/promises';
import net from 'node:net';

const sensitive = new Set(['authorization', 'cookie', 'set-cookie', 'x-api-key']);
export function sanitizeHeaders(input: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(input).map(([k, v]) => [k, sensitive.has(k.toLowerCase()) ? '••••••••' : v]));
}
export function isPrivateIp(ip: string) {
  if (net.isIPv4(ip)) {
    const [a = 0, b = 0] = ip.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  return ip === '::1' || ip.startsWith('fc') || ip.startsWith('fd') || ip.startsWith('fe80');
}
export async function assertSafeUrl(value: string) {
  let url: URL;
  try { url = new URL(value); } catch { throw new Error('Invalid destination URL'); }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only HTTP and HTTPS URLs are allowed');
  const host = url.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.local') || isPrivateIp(host)) throw new Error('Local and private destinations are blocked');
  const addresses = await dns.lookup(host, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) throw new Error('Destination resolves to a private address');
  return url.toString();
}
