export type Environment='development'|'staging'|'production';
export interface Endpoint{id:string;name:string;slug:string;environment:Environment;status:'active'|'paused';createdAt:string;_count?:{requests:number}}
export interface HookRequest{id:string;endpointId:string;method:string;status:number;event:string;headers:Record<string,unknown>;query:Record<string,unknown>;body:unknown;responseBody:unknown;responseTime:number;ip?:string;userAgent?:string;receivedAt:string;endpoint?:{name:string;slug:string}}
export interface User{id:string;name:string;email:string;workspaces?:{id:string;name:string}[]}
