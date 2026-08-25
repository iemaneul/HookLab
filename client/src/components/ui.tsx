import type{ButtonHTMLAttributes,ReactNode}from'react';import{LoaderCircle,Inbox}from'lucide-react';
export function Button({className='',...p}:ButtonHTMLAttributes<HTMLButtonElement>){return <button className={`button ${className}`} {...p}/>}
export function Badge({children,tone='neutral'}:{children:ReactNode;tone?:string}){return <span className={`badge ${tone}`}>{children}</span>}
export function Skeleton({rows=3}:{rows?:number}){return <div className="skeleton-stack">{Array.from({length:rows},(_,i)=><div className="skeleton" key={i}/>)}</div>}
export function Empty({title='Nothing here yet',text='New activity will appear here.'}:{title?:string;text?:string}){return <div className="empty"><Inbox/><strong>{title}</strong><span>{text}</span></div>}
export function PageLoader(){return <div className="page-loader"><LoaderCircle className="spin"/></div>}
