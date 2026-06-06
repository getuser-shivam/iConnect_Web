export interface VpnNode {
  id: string;
  country: string;
  flag: string;
  name: string;
  latency: number;
  status: 'optimal' | 'standard' | 'maintenance';
  ip: string;
  load: number;
  location: { x: number; y: number }; // Percentage coords for virtual map
  isp: string;
}

export interface DiagnosticsState {
  status: 'idle' | 'running' | 'success' | 'warning';
  step: 'none' | 'ip' | 'webrtc' | 'dns' | 'speed';
  externalIp: string;
  isProtected: boolean;
  leakedIp: string;
  dnsResolver: string;
  webrtcStatus: 'vulnerable' | 'isolated';
}

export type CpuArch = 'arm64-v8a' | 'armeabi-v7a' | 'x86_64' | 'universal';
export type ProtocolMode = 'wireguard' | 'openvpn' | 'shadowsocks';

export interface BuildOptions {
  arch: CpuArch;
  protocol: ProtocolMode;
  adBlockFeed: boolean;
  malwareShield: boolean;
  customDnsPreset: string;
  compressedLogs: boolean;
}

