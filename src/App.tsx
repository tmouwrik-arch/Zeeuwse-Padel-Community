import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Svg = ({ size=20, color="currentColor", style, children }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{display:"inline-block",flexShrink:0,...style}}>{children}</svg>
);
const Home          = (p:any) => <Svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Svg>;
const Calendar      = (p:any) => <Svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Svg>;
const Plus          = (p:any) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
const MapPin        = (p:any) => <Svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Svg>;
const User          = (p:any) => <Svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;
const Bell          = (p:any) => <Svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Svg>;
const Sun           = (p:any) => <Svg {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Svg>;
const Moon          = (p:any) => <Svg {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Svg>;
const Cloud         = (p:any) => <Svg {...p}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></Svg>;
const CloudRain     = (p:any) => <Svg {...p}><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="17" x2="12" y2="23"/><line x1="16" y1="19" x2="16" y2="21"/></Svg>;
const CloudSnow     = (p:any) => <Svg {...p}><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="22" x2="12.01" y2="22"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></Svg>;
const CheckCircle   = (p:any) => <Svg {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const AlertTriangle = (p:any) => <Svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>;
const Users         = (p:any) => <Svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Svg>;
const MessageSquare = (p:any) => <Svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Svg>;
const Send          = (p:any) => <Svg {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></Svg>;
const ArrowLeft     = (p:any) => <Svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></Svg>;
const X             = (p:any) => <Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>;
const Edit2         = (p:any) => <Svg {...p}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></Svg>;
const Key           = (p:any) => <Svg {...p}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></Svg>;
const Camera        = (p:any) => <Svg {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></Svg>;
const LogOut        = (p:any) => <Svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Svg>;
const Trophy        = (p:any) => <Svg {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 19.75 7 21 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 19.75 17 21 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></Svg>;
const Mail          = (p:any) => <Svg {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Svg>;
const Lock          = (p:any) => <Svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Svg>;
const Eye           = (p:any) => <Svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>;
const EyeOff        = (p:any) => <Svg {...p}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></Svg>;
const Clock         = (p:any) => <Svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const Trash2        = (p:any) => <Svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></Svg>;
const ChevronRight  = (p:any) => <Svg {...p}><polyline points="9 18 15 12 9 6"/></Svg>;
const Check         = (p:any) => <Svg {...p}><polyline points="20 6 9 17 4 12"/></Svg>;
const Search        = (p:any) => <Svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>;
const Lightbulb     = (p:any) => <Svg {...p}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/></Svg>;
const UserPlus      = (p:any) => <Svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></Svg>;
const Hash          = (p:any) => <Svg {...p}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></Svg>;

// ─── Supabase ─────────────────────────────────────────────────────────────────
const SUPABASE_URL      = "https://yuaujlezfoyvbdgtoxon.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_o1Eb2xLvP-0-h3j-f8L6pg_IvCt1AiE";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Constants ────────────────────────────────────────────────────────────────
const LEVELS = ["Beginner","Gevorderd beginner","Gemiddeld","Gevorderd","Expert"];
const LEVEL_LABELS: Record<string,string> = {
  "Beginner":"🟢 Beginner","Gevorderd beginner":"🔵 Gevorderd beginner",
  "Gemiddeld":"🟡 Gemiddeld","Gevorderd":"🟠 Gevorderd","Expert":"🔴 Expert"
};
const LEVEL_COLOR: Record<string,string> = {
  Beginner:"#22c55e","Gevorderd beginner":"#3b82f6",Gemiddeld:"#f59e0b",Gevorderd:"#ef4444",Expert:"#8b5cf6"
};
const C = { sea:"#0ea5e9", seaDark:"#0369a1", dark:"#0f172a", bg:"#f0f9ff", sub:"#64748b", green:"#22c55e", red:"#ef4444" };
const LOCATIONS = ["Middelburg","Vlissingen","Veere","Goes","Domburg","Terneuzen","Hulst","Breskens","Axel"];
const KNLTB_RATINGS = Array.from({length:100},(_,i)=>((100-i)*0.1).toFixed(1));
const KNLTB_RANGES  = Array.from({length:9},(_,i)=>({ label:`${10-i} – ${8-i}`, min:(8-i)*1.0, max:(10-i)*1.0 }));
const RADIUS_OPTIONS = [5,10,20,50];
const CITY_COORDS: Record<string,[number,number]> = {
  Middelburg:[51.4988,3.6109], Vlissingen:[51.4428,3.5731], Veere:[51.5392,3.6689],
  Goes:[51.5036,3.8878], Domburg:[51.5631,3.4988], Terneuzen:[51.3350,3.8300],
  Hulst:[51.2797,4.0508], Breskens:[51.3994,3.5617], Axel:[51.2594,3.9183],
};
const ZEELAND_LAT = 51.46, ZEELAND_LON = 3.87;
const APP_MAX_W = 430;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today       = () => new Date().toISOString().split("T")[0];
const fmtDate     = (d:string) => { try { return new Date(d).toLocaleDateString("nl-NL",{weekday:"short",day:"numeric",month:"short"}); } catch { return d; }};
const uid         = () => Math.random().toString(36).slice(2,9);
const displayName = (p:any) => p?.full_name || p?.username || "Speler";
const initials    = (p:any) => displayName(p).split(" ").map((w:string)=>w[0]).join("").toUpperCase().slice(0,2);
const isNight     = () => { const h=new Date().getHours(); return h<6||h>=20; };
const haversineKm = (la1:number,lo1:number,la2:number,lo2:number) => {
  const R=6371,dL=(la2-la1)*Math.PI/180,dO=(lo2-lo1)*Math.PI/180;
  const a=Math.sin(dL/2)**2+Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dO/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
};
const levelText = (lvl:any): string => {
  if (typeof lvl==="number") return LEVELS[lvl-1]||`Niveau ${lvl}`;
  if (typeof lvl==="string"&&LEVELS.includes(lvl)) return lvl;
  return lvl||"Onbekend";
};
const isMatchPast = (m:any) => {
  if (!m?.date||!m?.start_time) return false;
  return new Date(`${m.date}T${m.start_time.slice(0,5)}:00`) < new Date();
};
const isMatchTimeValid = (date:string,time:string) => {
  if (!date||!time) return false;
  return new Date(`${date}T${time}:00`) >= new Date(Date.now()+2*60*60*1000);
};
const defaultFutureTime = () => {
  const d=new Date(Date.now()+3*60*60*1000); d.setMinutes(0,0,0);
  return `${String(d.getHours()).padStart(2,"0")}:00`;
};

// ─── Push notifications ───────────────────────────────────────────────────────
const requestNotifPermission = async () => {
  if ("Notification" in window && Notification.permission==="default") {
    await Notification.requestPermission();
  }
};
const sendBrowserNotif = (title:string, body:string, onClick?:()=>void) => {
  if (!("Notification" in window)||Notification.permission!=="granted") return;
  try {
    const n = new Notification(title, { body, icon:"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎾</text></svg>" });
    n.onclick = () => { window.focus(); n.close(); onClick?.(); };
  } catch {}
};

// ─── Weather ──────────────────────────────────────────────────────────────────
async function fetchWeather() {
  try {
    const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ZEELAND_LAT}&longitude=${ZEELAND_LON}&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m&wind_speed_unit=kmh&timezone=Europe%2FAmsterdam`);
    const json=await r.json(); const c=json.current; const wc=c.weathercode;
    const night=isNight();
    const desc=wc<=1?(night?"Heldere nacht 🌙":"Helder — top padelweer! ☀️"):wc<=3?"Wisselend bewolkt":wc<=48?"Mistig":wc<=67?"Regen":wc<=77?"Sneeuw":wc<=82?"Buien mogelijk":"Onweer";
    const dir=["N","NO","O","ZO","Z","ZW","W","NW"][Math.round(c.winddirection_10m/45)%8];
    return { wc, temp:`${Math.round(c.temperature_2m)}°C`, wind:`${dir} ${Math.round(c.windspeed_10m)} km/u`, desc, night };
  } catch { return { wc:null,temp:"–",wind:"–",desc:"Weersdata niet beschikbaar",night:false }; }
}
function WeatherIcon({wc,night,size=26}:any) {
  if (wc==null) return <Cloud size={size} color="#94a3b8"/>;
  if (wc<=1) return night?<Moon size={size} color="#94a3b8"/>:<Sun size={size} color="#f59e0b"/>;
  if (wc<=3) return night?<Moon size={size} color="#7c8ea0"/>:<Cloud size={size} color="#94a3b8"/>;
  if (wc<=48) return <Cloud size={size} color="#64748b"/>;
  if (wc<=67) return <CloudRain size={size} color="#0ea5e9"/>;
  if (wc<=77) return <CloudSnow size={size} color="#93c5fd"/>;
  return <CloudRain size={size} color="#6366f1"/>;
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [sbUser,       setSbUser]       = useState<any>(null);
  const [profile,      setProfile]      = useState<any>(null);
  const [authMode,     setAuthMode]     = useState("login");
  const [needsOnboard, setNeedsOnboard] = useState(false);
  const [courts,       setCourts]       = useState<any[]>([]);
  const [matches,      setMatches]      = useState<any[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [screen,       setScreen]       = useState("home");
  const [subScreen,    setSubScreen]    = useState<any>(null);
  const [toast,        setToast]        = useState<any>(null);
  const [notifs,       setNotifs]       = useState<any[]>([]);
  const [showNotifs,   setShowNotifs]   = useState(false);
  const [weather,      setWeather]      = useState<any>(null);
  const [suggestOpen,  setSuggestOpen]  = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [filterLevel,  setFilterLevel]  = useState("Alle");
  const [filterDate,   setFilterDate]   = useState("");
  const [filterType,   setFilterType]   = useState("Alle");
  const [filterKnltb,  setFilterKnltb]  = useState("");
  const [filterCity,   setFilterCity]   = useState("");
  const [filterRadius, setFilterRadius] = useState(0);
  const [filterClub,   setFilterClub]   = useState("");
  const sbUserRef = useRef<any>(null);
  sbUserRef.current = sbUser;

  const toast$ = useCallback((msg:string,type="success")=>{
    setToast({msg,type}); setTimeout(()=>setToast(null),3500);
  },[]);

  const navigate = useCallback((link:any) => {
    if (!link) return;
    setShowNotifs(false);
    if (link.type==="chat"&&link.matchId) setSubScreen({type:"chat",matchId:link.matchId});
    else if (link.type==="dm"&&link.friendId) setSubScreen({type:"dm",friendId:link.friendId});
    else if (link.matchId) setSubScreen({type:"detail",matchId:link.matchId});
    else if (link.screen) setScreen(link.screen);
  },[]);

  const addNotif = useCallback((text:string, icon="🎾", link?:any) => {
    setNotifs(p=>[{id:uid(),text,icon,time:"Nu",read:false,link},...p]);
    sendBrowserNotif("Zeeuwse Padel", text, link?()=>navigate(link):undefined);
  },[navigate]);

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}}:any)=>{
      if (session?.user){ setSbUser(session.user); loadProfile(session.user.id); requestNotifPermission(); }
    });
    const {data:{subscription}}=sb.auth.onAuthStateChange((_:any,session:any)=>{
      if (session?.user){ setSbUser(session.user); loadProfile(session.user.id); requestNotifPermission(); }
      else { setSbUser(null); setProfile(null); setNeedsOnboard(false); }
    });
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{ fetchWeather().then(setWeather); },[]);

  const loadProfile = async (id:string) => {
    const {data}=await sb.from("profiles").select("*").eq("id",id).single();
    if (data){ setProfile(data); if (!data.level) setNeedsOnboard(true); }
    else setNeedsOnboard(true);
  };

  const fetchAll = useCallback(async ()=>{
    setLoading(true);
    try {
      const {data:cData}=await sb.from("courts").select("*").order("name");
      if (cData) setCourts(cData);
      const {data:mData,error}=await sb.from("matches")
        .select(`*, courts(id,name,city,address,lat,lng,is_indoor,booking_url), host:profiles!matches_host_id_fkey(id,full_name,username,level,knltb_rating,avatar_url), participants(count)`)
        .eq("is_cancelled",false).gte("date",today())
        .order("date",{ascending:true}).order("start_time",{ascending:true});
      if (error) throw error;
      if (mData) setMatches(mData.filter((m:any)=>!isMatchPast(m)));
    } catch(e:any){ console.error(e.message); }
    finally { setLoading(false); }
  },[]);

  useEffect(()=>{ fetchAll(); },[fetchAll]);

  // Realtime — gebruik ref zodat sbUser altijd actueel is in de closure
  useEffect(()=>{
    const ch=sb.channel("padel-rt-v3")
      .on("postgres_changes",{event:"*",schema:"public",table:"matches"},()=>fetchAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"participants"},()=>fetchAll())
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages"},(payload:any)=>{
        const currentUser = sbUserRef.current;
        if (payload.new?.sender_id!==currentUser?.id){
          const matchId = payload.new?.match_id;
          addNotif("Nieuw bericht in een partijtje","💬",{type:"chat",matchId});
        }
      })
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"direct_messages"},(payload:any)=>{
        const currentUser = sbUserRef.current;
        if (payload.new?.receiver_id===currentUser?.id){
          addNotif("Nieuw bericht van een vriend","✉️",{type:"dm",friendId:payload.new?.sender_id});
        }
      })
      .subscribe();
    return ()=>sb.removeChannel(ch);
  },[fetchAll,addNotif]);

  // ─── Auth ────────────────────────────────────────────────────────────────────
  const handleLogin = async ({email,password}:any): Promise<string> => {
    const {error}=await sb.auth.signInWithPassword({email,password});
    if (error){
      const msg = error.message.toLowerCase();
      if (msg.includes("invalid")||msg.includes("credentials")) return "Ongeldig e-mailadres of wachtwoord.";
      if (msg.includes("not found")) return "Geen account gevonden met dit e-mailadres.";
      return error.message;
    }
    setScreen("home"); return "";
  };
  const handleForgot = async (email:string): Promise<string> => {
    const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin});
    if (error) return error.message;
    return "";
  };
  const handleRegister = async ({email,password,full_name,level,location,knltb_rating}:any): Promise<"ok"|"confirm"|string> => {
    try {
      const {data,error}=await sb.auth.signUp({ email, password,
        options:{ data:{ full_name, username: full_name.toLowerCase().replace(/\s+/g,"_") }}
      });
      if (error) return error.message;
      if (!data.user) return "Er ging iets mis. Probeer het opnieuw.";
      const profileData = {
        id:data.user.id, email, full_name,
        username: full_name.toLowerCase().replace(/\s+/g,"_"),
        location, level: LEVELS.indexOf(level)+1||3,
        knltb_rating: knltb_rating||null, rating:0
      };
      const {error:pErr}=await sb.from("profiles").upsert(profileData);
      if (pErr) console.error("Profile error:", pErr.message);
      if (data.session){ setProfile({...profileData}); return "ok"; }
      return "confirm";
    } catch(e:any){ return e.message||"Registratie mislukt"; }
  };
  const handleOnboard = async ({level,location,knltb_rating}:any) => {
    if (!sbUser) return;
    const meta=sbUser.user_metadata||{};
    const full_name=meta.full_name||meta.name||sbUser.email?.split("@")[0]||"Speler";
    const pd = { id:sbUser.id, email:sbUser.email, full_name, username:full_name.toLowerCase().replace(/\s+/g,"_"),
      location, level:LEVELS.indexOf(level)+1||3, knltb_rating:knltb_rating||null,
      avatar_url:meta.avatar_url||meta.picture||null, rating:0 };
    await sb.from("profiles").upsert(pd);
    setProfile(pd); setNeedsOnboard(false); toast$("Welkom bij Padel Zeeland! 🎾");
  };
  const handleLogout = async () => { await sb.auth.signOut(); setSbUser(null); setProfile(null); setAuthMode("login"); };

  // ─── Matches ─────────────────────────────────────────────────────────────────
  const getCount = (m:any) => Number(m?.participants?.[0]?.count??0);
  const joinMatch = async (matchId:string) => {
    if (!sbUser){ toast$("Log eerst in","error"); return; }
    const match=matches.find(m=>m.id===matchId); const cnt=getCount(match);
    if (cnt>=4){ toast$("Dit partijtje is vol","error"); return; }
    const {error}=await sb.from("participants").insert({match_id:matchId,user_id:sbUser.id});
    if (error){ toast$(error.code==="23505"?"Je doet al mee!":error.message,"error"); return; }
    toast$("Je doet mee! 🎾");
    addNotif(`Ingeschreven: ${match?.courts?.name} op ${fmtDate(match?.date)}`,"🎾",{matchId});
    if (cnt+1>=4) addNotif(`🎉 Partijtje compleet! ${match?.courts?.name}`,"🎉",{matchId});
    fetchAll();
  };
  const leaveMatch = async (matchId:string) => {
    const {error}=await sb.from("participants").delete().eq("match_id",matchId).eq("user_id",sbUser.id);
    if (error) toast$(error.message,"error"); else { toast$("Uitgeschreven"); fetchAll(); setSubScreen(null); }
  };
  const cancelMatch = async (matchId:string) => {
    const {error}=await sb.from("matches").update({is_cancelled:true}).eq("id",matchId);
    if (error) toast$(error.message,"error"); else { toast$("Partijtje geannuleerd"); fetchAll(); setSubScreen(null); }
  };
  const toggleCourtBooked = async (matchId:string,newVal:boolean) => {
    const {error}=await sb.from("matches").update({court_booked:newVal}).eq("id",matchId);
    if (error) toast$("Fout: "+error.message,"error");
    else { toast$(newVal?"✅ Baan geboekt!":"Boeking ongedaan"); fetchAll(); }
  };
  const setCourtNumber = async (matchId:string,num:number|null) => {
    const {error}=await sb.from("matches").update({court_number:num}).eq("id",matchId);
    if (error) toast$(error.message,"error"); else { toast$(num?`Baan #${num} ingesteld`:"Baannummer verwijderd"); fetchAll(); }
  };
  const createMatch = async ({courtId,date,time,level,note,court_booked,invitedFriends}:any) => {
    if (!sbUser){ toast$("Log eerst in","error"); return; }
    if (!isMatchTimeValid(date,time)){ toast$("Starttijd moet minstens 2 uur in de toekomst zijn","error"); return; }
    const {data:nm,error}=await sb.from("matches").insert({
      court_id:courtId,date,start_time:time,level,description:note||null,
      host_id:sbUser.id,is_cancelled:false,court_booked:!!court_booked
    }).select().single();
    if (error){ toast$(error.message,"error"); return; }
    // Host toevoegen
    await sb.from("participants").insert({match_id:nm.id,user_id:sbUser.id});
    // Uitgenodigde vrienden toevoegen als participant
    if (invitedFriends&&invitedFriends.length>0){
      for (const fid of invitedFriends){
        await sb.from("participants").insert({match_id:nm.id,user_id:fid}).then(()=>{});
      }
    }
    toast$("Partijtje aangemaakt! 🎾"); addNotif("Jouw partijtje staat online!","🎾",{matchId:nm.id});
    await fetchAll(); setScreen("matches");
  };
  const updateProfile = async (updates:any) => {
    if (!sbUser) return;
    const {error}=await sb.from("profiles").update(updates).eq("id",sbUser.id);
    if (error){ toast$(error.message,"error"); return; }
    await loadProfile(sbUser.id); toast$("Profiel bijgewerkt!");
  };
  const uploadAvatar = async (file:File) => {
    if (!sbUser||!file) return null;
    const ext=file.name.split(".").pop();
    const path=`avatars/${sbUser.id}.${ext}`;
    const {error:upErr}=await sb.storage.from("avatars").upload(path,file,{upsert:true});
    if (upErr){ toast$(upErr.message,"error"); return null; }
    const {data}=sb.storage.from("avatars").getPublicUrl(path);
    return (data as any)?.publicUrl||null;
  };
  const submitCourtSuggestion = async (data:any) => {
    try { await sb.from("court_suggestions").insert({...data,submitted_by:sbUser?.id}); } catch {}
    toast$("Suggestie verstuurd! 🙏"); setSuggestOpen(false);
  };
  const handleFeedback = async (message:string) => {
    try { await sb.from("feedback").insert({user_id:sbUser?.id||null,message:message.trim()}); toast$("Bedankt voor je idee! 💡"); setFeedbackOpen(false); }
    catch { toast$("Versturen mislukt","error"); }
  };

  // Filter matches
  const openMatches = matches.filter(m=>{
    if (getCount(m)>=4) return false;
    if (filterLevel!=="Alle"&&m.level!==filterLevel) return false;
    if (filterDate&&m.date!==filterDate) return false;
    if (filterType==="Binnen"&&!m.courts?.is_indoor) return false;
    if (filterType==="Buiten"&&m.courts?.is_indoor) return false;
    if (filterKnltb){ const range=KNLTB_RANGES.find(r=>r.label===filterKnltb); if (range){ const r=parseFloat(m.host?.knltb_rating); if (isNaN(r)||r<range.min||r>range.max) return false; } }
    if (filterCity&&filterRadius>0){
      const cc=CITY_COORDS[filterCity]; const mc=CITY_COORDS[m.courts?.city]||(m.courts?.lat&&m.courts?.lng?[m.courts.lat,m.courts.lng] as [number,number]:null);
      if (cc&&mc){ if (haversineKm(cc[0],cc[1],mc[0],mc[1])>filterRadius) return false; }
    } else if (filterCity){ if (m.courts?.city!==filterCity) return false; }
    if (filterClub&&!(m.courts?.name||"").toLowerCase().includes(filterClub.toLowerCase())) return false;
    return true;
  });

  // ─── Render ──────────────────────────────────────────────────────────────────
  if (sbUser&&needsOnboard) return <OnboardScreen onOnboard={handleOnboard}/>;
  if (sbUser&&subScreen){
    const match=subScreen.matchId?matches.find((m:any)=>m.id===subScreen.matchId):null;
    if (subScreen.type==="detail"&&match)
      return <MatchDetailScreen match={match} sbUser={sbUser} cnt={getCount(match)}
        onJoin={()=>joinMatch(match.id)} onLeave={()=>leaveMatch(match.id)} onCancel={()=>cancelMatch(match.id)}
        onChat={()=>setSubScreen({type:"chat",matchId:match.id})}
        onToggleBooked={(v:boolean)=>toggleCourtBooked(match.id,v)}
        onSetCourtNumber={(n:number|null)=>setCourtNumber(match.id,n)}
        onBack={()=>setSubScreen(null)} toast$={toast$}/>;
    if (subScreen.type==="chat"&&match)
      return <ChatScreen match={match} sbUser={sbUser} onBack={()=>setSubScreen(null)} toast$={toast$} addNotif={addNotif}/>;
    if (subScreen.type==="dm")
    return <DirectMessageScreen friendId={subScreen.friendId} sbUser={sbUser} onBack={()=>setSubScreen(null)} toast$={toast$} addNotif={addNotif}/>;    if (subScreen.type==="friendProfile")
      return <FriendProfileScreen friendId={subScreen.friendId} sbUser={sbUser} onBack={()=>setSubScreen(null)} onChat={()=>setSubScreen({type:"dm",friendId:subScreen.friendId})} toast$={toast$}/>;
  }
  if (!sbUser) return authMode==="login"
    ?<LoginScreen onLogin={handleLogin} onSwitch={()=>setAuthMode("register")} onForgot={handleForgot}/>
    :<RegisterScreen onRegister={handleRegister} onSwitch={()=>setAuthMode("login")}/>;

  return (
    <div style={s.appShell}>
      <style>{css}</style>
      {toast&&<Toast {...toast}/>}
      {showNotifs&&<NotifPanel notifs={notifs} onClose={()=>setShowNotifs(false)} onMarkAll={()=>setNotifs(p=>p.map(n=>({...n,read:true})))} onNavigate={navigate}/>}
      {suggestOpen&&<SuggestCourtModal onClose={()=>setSuggestOpen(false)} onSubmit={submitCourtSuggestion}/>}
      {feedbackOpen&&<FeedbackModal onClose={()=>setFeedbackOpen(false)} onSubmit={handleFeedback}/>}
      <Header profile={profile} unread={notifs.filter(n=>!n.read).length} onBell={()=>setShowNotifs(v=>!v)} onProfile={()=>setScreen("profile")}/>
      <div style={s.mainWrap}>
        {screen==="home"    && <HomeScreen matches={matches} loading={loading} setScreen={setScreen} joinMatch={joinMatch} weather={weather} onOpen={(id:string)=>setSubScreen({type:"detail",matchId:id})} getCount={getCount} sbUser={sbUser}/>}
        {screen==="matches" && <MatchesScreen openMatches={openMatches} allMatches={matches} sbUser={sbUser} joinMatch={joinMatch} onOpen={(id:string)=>setSubScreen({type:"detail",matchId:id})} getCount={getCount}
          filterLevel={filterLevel} setFilterLevel={setFilterLevel} filterDate={filterDate} setFilterDate={setFilterDate}
          filterType={filterType} setFilterType={setFilterType} filterKnltb={filterKnltb} setFilterKnltb={setFilterKnltb}
          filterCity={filterCity} setFilterCity={setFilterCity} filterRadius={filterRadius} setFilterRadius={setFilterRadius}
          filterClub={filterClub} setFilterClub={setFilterClub}/>}
        {screen==="create"  && <CreateScreen courts={courts} onCreate={createMatch} sbUser={sbUser}/>}
        {screen==="courts"  && <CourtsScreen courts={courts} matches={matches} getCount={getCount} onSuggest={()=>setSuggestOpen(true)}/>}
        {screen==="friends" && <FriendsScreen sbUser={sbUser} toast$={toast$} onChat={(id:string)=>setSubScreen({type:"dm",friendId:id})} onProfile={(id:string)=>setSubScreen({type:"friendProfile",friendId:id})}/>}
        {screen==="profile" && <ProfileScreen profile={profile} sbUser={sbUser} matches={matches} getCount={getCount} onOpen={(id:string)=>setSubScreen({type:"detail",matchId:id})} onLogout={handleLogout} onUpdateProfile={updateProfile} onUploadAvatar={uploadAvatar} toast$={toast$}/>}
      </div>
      <BottomNav screen={screen} setScreen={setScreen}/>
      <button className="fab-feedback" onClick={()=>setFeedbackOpen(true)} title="Idee of feedback"><Lightbulb size={18} color="#fff"/></button>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({msg,type}:any){ return <div className={`toast toast-${type}`}>{msg}</div>; }

// ─── Notif panel ──────────────────────────────────────────────────────────────
function NotifPanel({notifs,onClose,onMarkAll,onNavigate}:any){
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.notifPanel} onClick={(e:any)=>e.stopPropagation()}>
        <div style={s.notifHead}><strong>🔔 Meldingen</strong><span className="link" style={{fontSize:12}} onClick={onMarkAll}>Alles gelezen</span></div>
        {notifs.length===0&&<div style={{padding:"24px",textAlign:"center",color:C.sub,fontSize:13}}>Geen meldingen</div>}
        {notifs.map((n:any)=>(
          <div key={n.id} onClick={()=>{onMarkAll();if(n.link)onNavigate(n.link);onClose();}} style={{padding:"10px 14px",borderBottom:"1px solid #f1f5f9",background:n.read?"#f8fafc":"#e0f2fe",cursor:n.link?"pointer":"default"}}>
            <div style={{fontSize:13,color:C.dark,lineHeight:1.4}}>{n.icon} {n.text}{n.link&&<span style={{color:C.sea,fontSize:11,marginLeft:6}}>→ bekijken</span>}</div>
            <div style={{fontSize:11,color:C.sub,marginTop:2}}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────
function FeedbackModal({onClose,onSubmit}:any){
  const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  const go=async()=>{ if (!msg.trim()) return; setBusy(true); await onSubmit(msg); setBusy(false); };
  return (
    <div style={{...s.overlay,alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={s.modalCard} onClick={(e:any)=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><Lightbulb size={20} color={C.sea}/><strong style={{fontSize:16,fontWeight:800,color:C.dark}}>Idee of suggestie</strong></div>
          <button style={s.closeBtn} onClick={onClose}><X size={18}/></button>
        </div>
        <textarea className="inp" rows={5} placeholder="Jouw idee…" value={msg} onChange={e=>setMsg(e.target.value)} style={{resize:"none",marginBottom:10}}/>
        <button className="btn-primary" disabled={!msg.trim()||busy} onClick={go}>{busy?"Versturen…":"Verstuur 💡"}</button>
      </div>
    </div>
  );
}
function SuggestCourtModal({onClose,onSubmit}:any){
  const [f,setF]=useState({name:"",city:"",address:"",is_indoor:false,booking_url:"",note:""});
  const [busy,setBusy]=useState(false);
  const set=(k:string)=>(e:any)=>setF(p=>({...p,[k]:e.target.value}));
  const go=async()=>{ if (!f.name||!f.city) return; setBusy(true); await onSubmit(f); setBusy(false); };
  return (
    <div style={{...s.overlay,alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={s.modalCard} onClick={(e:any)=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <strong style={{fontSize:16,fontWeight:800,color:C.dark}}>Baan voorstellen</strong>
          <button style={s.closeBtn} onClick={onClose}><X size={18}/></button>
        </div>
        <label style={s.lbl}>Naam baan *</label><input className="inp" placeholder="bijv. Padelclub Middelburg" value={f.name} onChange={set("name")} style={{marginBottom:8}}/>
        <label style={s.lbl}>Stad *</label><select className="inp" value={f.city} onChange={set("city")} style={{marginBottom:8}}><option value="">Kies…</option>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select>
        <label style={s.lbl}>Adres</label><input className="inp" placeholder="bijv. Sportlaan 4" value={f.address} onChange={set("address")} style={{marginBottom:8}}/>
        <label style={s.lbl}>Boekingslink</label><input className="inp" placeholder="https://…" type="url" value={f.booking_url} onChange={set("booking_url")} style={{marginBottom:8}}/>
        <label style={s.lbl}>Extra info</label><input className="inp" placeholder="Bijv. 4 banen…" value={f.note} onChange={set("note")} style={{marginBottom:12}}/>
        <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:700,color:C.dark,cursor:"pointer",marginBottom:14}}>
          <input type="checkbox" checked={f.is_indoor} onChange={e=>setF(p=>({...p,is_indoor:e.target.checked}))} style={{width:17,height:17,accentColor:C.sea}}/>Overdekte baan
        </label>
        <button className="btn-primary" disabled={!f.name||!f.city||busy} onClick={go}>{busy?"Versturen…":"Suggestie versturen"}</button>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({profile,unread,onBell,onProfile}:any){
  return (
    <header style={s.header}>
      <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* Eigen logo afbeelding */}
<div style={{width: 40, height: 40, borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>
  <img 
    src="/Logo.png" 
    alt="Logo" 
    style={{width: "100%", height: "100%", objectFit: "contain"}}
    onError={(e:any)=>{
      // Fallback: toon SVG padel logo
      e.target.style.display="none";
      e.target.parentNode.innerHTML='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M3 12 Q12 7 21 12"/><path d="M3 12 Q12 17 21 12"/></svg>';
    }}
  />
</div>
          <div><div style={{color:"#fff",fontWeight:800,fontSize:15,lineHeight:1}}>Zeeuwse Padel</div><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:600}}>Community</div></div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button style={s.bellBtn} onClick={onBell}><Bell size={18} color="#fff"/>{unread>0&&<span style={s.badge}>{unread}</span>}</button>
          <div style={s.ava} onClick={onProfile}>
            {profile?.avatar_url?<img src={profile.avatar_url} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/>:<span style={{fontSize:12,fontWeight:700}}>{initials(profile)}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Bottom nav ───────────────────────────────────────────────────────────────
function BottomNav({screen,setScreen}:any){
  const items=[{id:"home",Icon:Home,label:"Home"},{id:"matches",Icon:Calendar,label:"Partijtjes"},{id:"create",Icon:Plus,label:"Aanmaken"},{id:"courts",Icon:MapPin,label:"Banen"},{id:"friends",Icon:Users,label:"Vrienden"}];
  return (
    <nav style={s.nav}>
      <div style={s.navInner}>
        {items.map(({id,Icon,label})=>{
          const active=screen===id;
          return (
            <button key={id} style={s.navBtn} onClick={()=>setScreen(id)}>
              {active&&id!=="create"&&<div style={s.navIndicator}/>}
              {id==="create"?<div style={{...s.navCreate,background:active?C.seaDark:C.sea}}><Icon size={20} color="#fff"/></div>:<Icon size={20} color={active?C.sea:"#94a3b8"}/>}
              <span style={{...s.navLbl,color:active&&id!=="create"?C.sea:"#94a3b8"}}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Auth wrapper – toont inline foutmeldingen (GEEN externe toast nodig) ─────
function AuthError({msg}:any){
  if (!msg) return null;
  return <div style={{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:10,padding:"10px 13px",fontSize:13,color:"#991b1b",fontWeight:600,display:"flex",alignItems:"center",gap:8}}><AlertTriangle size={15} color="#dc2626"/>{msg}</div>;
}
function AuthSuccess({msg}:any){
  if (!msg) return null;
  return <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:10,padding:"10px 13px",fontSize:13,color:"#166534",fontWeight:600,display:"flex",alignItems:"center",gap:8}}><CheckCircle size={15} color="#16a34a"/>{msg}</div>;
}

// Flex-gebaseerd invoerveld – icoon kan NOOIT overlappen
function AF({icon,children,pw,onTogglePw,showPw}:any){
  return (
<div style={{display:"flex",alignItems:"center",border:"1.5px solid #e2e8f0",borderRadius:12,background:"#f8fafc",padding:"12px 14px",gap:10,transition:"border .2s"}}      onFocus={()=>{}} className="auth-field-wrap">
      <span style={{display:"flex",alignItems:"center",flexShrink:0,color:C.sub}}>{icon}</span>
      {children}
      {pw&&<button type="button" style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",color:C.sub,flexShrink:0}} onClick={onTogglePw}>{showPw?<EyeOff size={16}/>:<Eye size={16}/>}</button>}
    </div>
  );
}

// ─── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen({onLogin,onSwitch,onForgot}:any){
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [busy,setBusy]=useState(false);
  const [showPw,setShowPw]=useState(false); const [forgotMode,setForgot]=useState(false);
  const [forgotEmail,setFE]=useState(""); const [forgotSent,setFS]=useState(false);
  const [err,setErr]=useState(""); const [forgotErr,setForgotErr]=useState("");

  const go=async()=>{
    if (!email||!pw){ setErr("Vul je e-mailadres en wachtwoord in."); return; }
    setBusy(true); setErr("");
    const msg=await onLogin({email,password:pw});
    if (msg) setErr(msg);
    setBusy(false);
  };
  const sendReset=async()=>{
    if (!forgotEmail){ setForgotErr("Vul je e-mailadres in."); return; }
    setBusy(true); setForgotErr("");
    const msg=await onForgot(forgotEmail);
    if (msg) setForgotErr(msg); else setFS(true);
    setBusy(false);
  };
  return (
    <div style={s.authWrap}><div style={s.authBg}/>
      <div style={s.authCard}>
        <div style={{textAlign:"center"}}>
          <div style={{width:72,height:72,borderRadius:20,background:"linear-gradient(135deg,#0369a1,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",boxShadow:"0 8px 24px rgba(14,165,233,.4)",overflow:"hidden",padding:6}}>
            <img src="/Logo.png" alt="Logo" style={{width:"100%",height:"100%",objectFit:"contain"}}
              onError={(e:any)=>{ e.target.style.display="none"; }}/>
          </div>
          <h1 style={s.authTitle}>Zeeuwse Padel</h1>
          <p style={s.authSub}>Join The Community 🎾</p>
        </div>
        {!forgotMode?(
          <>
            <AuthError msg={err}/>
            <AF icon={<Mail size={18}/>}>
            <input className="auth-bare" style={{fontSize:"17px", padding:"8px 0", width:"100%"}} placeholder="E-mailadres" type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>            </AF>
            <AF icon={<Lock size={18}/>} pw showPw={showPw} onTogglePw={()=>setShowPw(v=>!v)}>
            <input className="auth-bare" style={{fontSize:"13px", padding:"8px 0", width:"100%"}} placeholder="Wachtwoord" type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} autoComplete="current-password"/>            </AF>
            <div style={{textAlign:"right"}}><span className="link" style={{fontSize:12}} onClick={()=>{setForgot(true);setErr("");}}>Wachtwoord vergeten?</span></div>
            <button className="btn-auth" style={{padding:"10px 0", fontSize:"14px", width:"100%"}} onClick={go} disabled={busy||!email||!pw}>{busy?"Bezig…":"Inloggen"}</button>
            <div style={{textAlign:"center",paddingTop:4,fontSize:13,color:C.sub}}>
              Nog geen account?{" "}
              <button onClick={onSwitch} style={{background:"linear-gradient(135deg,#0ea5e9,#0369a1)",color:"#fff",border:"none",borderRadius:10,padding:"7px 14px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginLeft:4}}>
                Maak account aan →
              </button>
            </div>
          </>
        ):(
          <>
            <h3 style={{fontWeight:800,fontSize:15,color:C.dark}}>Wachtwoord vergeten</h3>
            <AuthError msg={forgotErr}/>
            {forgotSent
              ?<AuthSuccess msg="Resetlink verstuurd! Check je inbox 📧"/>
              :(<>
                  <p style={{fontSize:13,color:C.sub}}>Vul je e-mailadres in voor een resetlink.</p>
                  <AF icon={<Mail size={18}/>}><input className="auth-bare" placeholder="E-mailadres" type="email" value={forgotEmail} onChange={e=>setFE(e.target.value)}/></AF>
                  <button className="btn-auth" onClick={sendReset} disabled={busy||!forgotEmail}>{busy?"Versturen…":"Resetlink versturen"}</button>
                </>)
            }
            <p style={{textAlign:"center",fontSize:13,color:C.sub}}><span className="link" onClick={()=>{setForgot(false);setFS(false);setForgotErr("");}}>← Terug naar inloggen</span></p>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Register screen ──────────────────────────────────────────────────────────
function RegisterScreen({onRegister,onSwitch}:any){
  const [f,setF]=useState({full_name:"",email:"",password:"",level:"Gemiddeld",location:"Middelburg",knltb_rating:""});
  const [busy,setBusy]=useState(false); const [step,setStep]=useState(1);
  const [confirmed,setConfirmed]=useState(false); const [err,setErr]=useState("");
  const set=(k:string)=>(e:any)=>setF(p=>({...p,[k]:e.target.value}));

  const validateStep1 = () => {
    if (!f.full_name.trim()) return "Vul je volledige naam in.";
    if (!f.email.includes("@")) return "Vul een geldig e-mailadres in.";
    if (f.password.length<6) return "Wachtwoord moet minimaal 6 tekens zijn.";
    return "";
  };

  const go = async () => {
    const v=validateStep1();
    if (v){ setErr(v); return; }
    if (busy) return;
    setBusy(true); setErr("");
    try {
      const result = await onRegister(f);
      if (result==="confirm"){ setConfirmed(true); }
      else if (result==="ok"){ /* auth state change handelt het af */ }
      else { setErr(typeof result==="string"?result:"Er ging iets mis. Probeer opnieuw."); }
    } catch(e:any){ setErr(e.message||"Onbekende fout"); }
    finally { setBusy(false); }
  };

  if (confirmed) return (
    <div style={s.authWrap}><div style={s.authBg}/>
      <div style={s.authCard}>
        <div style={{textAlign:"center",fontSize:56,marginBottom:8}}>📧</div>
        <h2 style={{...s.authTitle,fontSize:20}}>Check je e-mail!</h2>
        <AuthSuccess msg={`Bevestigingslink verstuurd naar ${f.email}`}/>
        <p style={{fontSize:13,color:C.sub,textAlign:"center",lineHeight:1.5}}>Klik op de link in je inbox om je account te activeren. Daarna kun je inloggen.</p>
        <button className="btn-auth" onClick={onSwitch}>Naar inloggen</button>
      </div>
    </div>
  );
  return (
    <div style={s.authWrap}><div style={s.authBg}/>
      <div style={s.authCard}>
        <div style={{textAlign:"center"}}>
          <div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#0369a1,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",overflow:"hidden",padding:5}}>
            <img src="/Gemini_Generated_Image_jjvfrsjjvfrsjjvf.png" alt="Logo" style={{width:"100%",height:"100%",objectFit:"contain",filter:"brightness(0) invert(1)"}} onError={(e:any)=>e.target.style.display="none"}/>
          </div>
          <h1 style={s.authTitle}>Account aanmaken</h1>
          <p style={s.authSub}>Stap {step} van 2</p>
        </div>
        <div style={{display:"flex",gap:6}}>
          {[1,2].map(i=><div key={i} style={{flex:1,height:4,borderRadius:4,background:i<=step?C.sea:"#e2e8f0",transition:"background .3s"}}/>)}
        </div>
        <AuthError msg={err}/>
        {step===1?(
          <>
            <AF icon={<User size={18}/>}><input className="auth-bare" placeholder="Volledige naam" value={f.full_name} onChange={set("full_name")}/></AF>
            <AF icon={<Mail size={18}/>}><input className="auth-bare" placeholder="E-mailadres" type="email" value={f.email} onChange={set("email")}/></AF>
            <AF icon={<Lock size={18}/>}><input className="auth-bare" placeholder="Wachtwoord (min. 6 tekens)" type="password" value={f.password} onChange={e=>setF(p=>({...p,password:e.target.value}))}/></AF>
            <button className="btn-auth" onClick={()=>{ const v=validateStep1(); if(v){setErr(v);return;} setErr(""); setStep(2); }}>
              Volgende →
            </button>
            <div style={{textAlign:"center",fontSize:13,color:C.sub}}>Al een account? <span className="link" onClick={onSwitch}>Inloggen</span></div>
          </>
        ):(
          <>
            <div>
              <label style={s.regLbl}>Speelniveau</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>
                {LEVELS.map(l=><button key={l} type="button" onClick={()=>setF(p=>({...p,level:l}))} style={{padding:"7px 10px",borderRadius:20,fontSize:12,fontWeight:700,border:"2px solid",cursor:"pointer",background:f.level===l?C.sea:"#fff",color:f.level===l?"#fff":C.dark,borderColor:f.level===l?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{LEVEL_LABELS[l]||l}</button>)}
              </div>
            </div>
            <div>
              <label style={s.regLbl}>KNLTB Rating <span style={{color:C.sub,fontWeight:400}}>(optioneel)</span></label>
              <select className="inp" value={f.knltb_rating} onChange={set("knltb_rating")}><option value="">Geen / onbekend</option>{KNLTB_RATINGS.map(r=><option key={r} value={r}>{r}</option>)}</select>
            </div>
            <div>
              <label style={s.regLbl}>Woonplaats</label>
              <select className="inp" value={f.location} onChange={set("location")}>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button type="button" className="btn-auth-outline" onClick={()=>{ setStep(1); setErr(""); }}>← Terug</button>
              <button type="button" className="btn-auth" style={{flex:2}} onClick={go} disabled={busy}>{busy?"Aanmaken…":"Account aanmaken ✓"}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Onboard ──────────────────────────────────────────────────────────────────
function OnboardScreen({onOnboard}:any){
  const [f,setF]=useState({level:"Gemiddeld",location:"Middelburg",knltb_rating:""});
  const [busy,setBusy]=useState(false);
  const go=async()=>{ setBusy(true); await onOnboard(f); setBusy(false); };
  return (
    <div style={s.authWrap}><div style={s.authBg}/>
      <div style={s.authCard}>
        <div style={{textAlign:"center"}}><h1 style={s.authTitle}>Bijna klaar! 🎾</h1><p style={s.authSub}>Stel je padelerprofiel in</p></div>
        <div><label style={s.regLbl}>Speelniveau</label><div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>{LEVELS.map(l=><button key={l} type="button" onClick={()=>setF(p=>({...p,level:l}))} style={{padding:"7px 10px",borderRadius:20,fontSize:12,fontWeight:700,border:"2px solid",cursor:"pointer",background:f.level===l?C.sea:"#fff",color:f.level===l?"#fff":C.dark,borderColor:f.level===l?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{LEVEL_LABELS[l]||l}</button>)}</div></div>
        <div><label style={s.regLbl}>KNLTB Rating <span style={{color:C.sub,fontWeight:400}}>(optioneel)</span></label><select className="inp" value={f.knltb_rating} onChange={e=>setF(p=>({...p,knltb_rating:e.target.value}))}><option value="">Geen / onbekend</option>{KNLTB_RATINGS.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
        <button className="btn-auth" onClick={go} disabled={busy}>{busy?"Opslaan…":"Profiel opslaan"}</button>
      </div>
    </div>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────────────
function HomeScreen({matches,loading,setScreen,joinMatch,onOpen,getCount,sbUser,weather}:any){
  const [myIds,setMyIds]=useState<string[]>([]); const [lm,setLm]=useState(true);
  useEffect(()=>{ if (!sbUser) return; sb.from("participants").select("match_id").eq("user_id",sbUser.id).then(({data}:any)=>{ if (data) setMyIds(data.map((p:any)=>p.match_id)); setLm(false); }); },[sbUser,matches]);
  const myUpcoming=matches.filter((m:any)=>myIds.includes(m.id));
  return (
    <div style={s.page}>
      <div style={s.weatherCard}>
        <WeatherIcon wc={weather?.wc} night={weather?.night}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:800,fontSize:15,color:C.dark}}>{weather?.temp||"–"} <span style={{fontSize:12,color:C.sub,fontWeight:600}}>Zeeland</span></div>
          <div style={{fontSize:12,color:C.sub,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{weather?.desc||"Laden…"}</div>
        </div>
        <div style={{fontSize:11,color:C.sub,flexShrink:0}}>{weather?.wind||"–"}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {[{label:"Open partijtjes",value:matches.filter((m:any)=>getCount(m)<4).length,Icon:Calendar,color:C.sea},{label:"Mijn partijtjes",value:myUpcoming.length,Icon:Users,color:"#8b5cf6"}].map((st:any)=>(
          <div key={st.label} style={{...s.statCard,borderTop:`3px solid ${st.color}`}}><st.Icon size={18} color={st.color}/><span style={{fontSize:24,fontWeight:800,color:C.dark}}>{st.value}</span><span style={{fontSize:11,color:C.sub,fontWeight:600}}>{st.label}</span></div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <h3 style={s.secTitle}>Mijn aankomende partijtjes</h3>
        <span className="link" style={{fontSize:13,display:"flex",alignItems:"center",gap:2}} onClick={()=>setScreen("matches")}>Alle <ChevronRight size={14}/></span>
      </div>
      {loading||lm?<Spinner/>:myUpcoming.length===0?(
        <div style={s.emptyState}><Calendar size={36} color="#cbd5e1"/><p style={{fontSize:14,color:C.sub,marginTop:8}}>Je doet nog nergens aan mee</p><button className="btn-primary" style={{marginTop:12,maxWidth:220}} onClick={()=>setScreen("matches")}>Partijtjes zoeken</button></div>
      ):myUpcoming.map((m:any)=><MatchCard key={m.id} match={m} sbUser={sbUser} cnt={getCount(m)} onJoin={()=>joinMatch(m.id)} onOpen={()=>onOpen(m.id)} compact/>)}
      <button className="btn-primary" style={{marginTop:14}} onClick={()=>setScreen("create")}>+ Partijtje aanmaken</button>
    </div>
  );
}

// ─── Matches screen ───────────────────────────────────────────────────────────
function MatchesScreen({openMatches,allMatches,sbUser,joinMatch,onOpen,getCount,filterLevel,setFilterLevel,filterDate,setFilterDate,filterType,setFilterType,filterKnltb,setFilterKnltb,filterCity,setFilterCity,filterRadius,setFilterRadius,filterClub,setFilterClub}:any){
  const [tab,setTab]=useState("open"); const [showF,setShowF]=useState(false);
  return (
    <div style={s.page}>
      <h2 style={s.pageTitle}>Partijtjes</h2>
      <div style={s.tabRow}>
        <button style={{...s.tabBtn,...(tab==="open"?s.tabActive:{})}} onClick={()=>setTab("open")}>Open</button>
        <button style={{...s.tabBtn,...(tab==="mijn"?s.tabActive:{})}} onClick={()=>setTab("mijn")}>Mijn partijtjes</button>
      </div>
      {tab==="open"&&(
        <>
          <button onClick={()=>setShowF(v=>!v)} style={{...s.filterToggleBtn,background:showF?C.sea:"#fff",color:showF?"#fff":C.dark}}>
            <Search size={13}/>{showF?"Filters verbergen":"Filters tonen"}
            {(filterLevel!=="Alle"||filterDate||filterType!=="Alle"||filterKnltb||filterCity||filterClub)&&<span style={{background:"#ef4444",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",marginLeft:4}}>!</span>}
          </button>
          {showF&&(
            <div style={s.filterBox}>
              <p style={s.filterLabel}>Club zoeken</p>
              <div style={{display:"flex",gap:8,marginBottom:10}}><input className="inp-sm" placeholder="Naam van de club…" value={filterClub} onChange={e=>setFilterClub(e.target.value)} style={{flex:1}}/>{filterClub&&<button style={s.clearBtn} onClick={()=>setFilterClub("")}><X size={13}/></button>}</div>
              <p style={s.filterLabel}>Locatie</p>
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                <select className="inp-sm" value={filterCity} onChange={e=>setFilterCity(e.target.value)} style={{flex:1}}><option value="">Alle plaatsen</option>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select>
                {filterCity&&<select className="inp-sm" value={filterRadius} onChange={e=>setFilterRadius(Number(e.target.value))} style={{flex:1}}><option value={0}>Alleen {filterCity}</option>{RADIUS_OPTIONS.map(r=><option key={r} value={r}>+ {r} km</option>)}</select>}
              </div>
              <p style={s.filterLabel}>Niveau</p>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{["Alle",...LEVELS].map(l=><button key={l} onClick={()=>setFilterLevel(l)} style={{padding:"5px 9px",borderRadius:16,fontSize:11,fontWeight:700,border:"1.5px solid",cursor:"pointer",background:filterLevel===l?C.sea:"#fff",color:filterLevel===l?"#fff":C.dark,borderColor:filterLevel===l?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{l==="Alle"?"Alle":LEVEL_LABELS[l]||l}</button>)}</div>
              <p style={s.filterLabel}>Soort baan</p>
              <div style={{display:"flex",gap:6,marginBottom:10}}>{["Alle","Binnen","Buiten"].map(t=><button key={t} onClick={()=>setFilterType(t)} style={{padding:"5px 10px",borderRadius:16,fontSize:11,fontWeight:700,border:"1.5px solid",cursor:"pointer",background:filterType===t?C.sea:"#fff",color:filterType===t?"#fff":C.dark,borderColor:filterType===t?C.sea:"#e2e8f0",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>{t==="Binnen"?<><Home size={11}/>Binnen</>:t==="Buiten"?<><Sun size={11}/>Buiten</>:"Alle"}</button>)}</div>
              <p style={s.filterLabel}>KNLTB Rating host</p>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{KNLTB_RANGES.map(r=><button key={r.label} onClick={()=>setFilterKnltb(filterKnltb===r.label?"":r.label)} style={{padding:"5px 9px",borderRadius:16,fontSize:11,fontWeight:700,border:"1.5px solid",cursor:"pointer",background:filterKnltb===r.label?C.sea:"#fff",color:filterKnltb===r.label?"#fff":C.dark,borderColor:filterKnltb===r.label?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{r.label}</button>)}</div>
              <p style={s.filterLabel}>Datum</p>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><input className="inp-sm" type="date" value={filterDate} onChange={e=>setFilterDate(e.target.value)} style={{flex:1}}/>{filterDate&&<button style={s.clearBtn} onClick={()=>setFilterDate("")}><X size={13}/></button>}</div>
            </div>
          )}
          {openMatches.length===0?<div style={s.emptyState}><Search size={36} color="#cbd5e1"/><p style={{fontSize:14,color:C.sub,marginTop:8}}>Geen open partijtjes gevonden</p></div>:openMatches.map((m:any)=><MatchCard key={m.id} match={m} sbUser={sbUser} cnt={getCount(m)} onJoin={()=>joinMatch(m.id)} onOpen={()=>onOpen(m.id)}/>)}
        </>
      )}
      {tab==="mijn"&&<MyMatchesTab sbUser={sbUser} allMatches={allMatches} getCount={getCount} onOpen={onOpen}/>}
    </div>
  );
}
function MyMatchesTab({sbUser,allMatches,getCount,onOpen}:any){
  const [ids,setIds]=useState<string[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{ if (!sbUser) return; sb.from("participants").select("match_id").eq("user_id",sbUser.id).then(({data}:any)=>{ if (data) setIds(data.map((p:any)=>p.match_id)); setLoading(false); }); },[sbUser]);
  const myMatches=allMatches.filter((m:any)=>ids.includes(m.id));
  if (loading) return <Spinner/>;
  if (myMatches.length===0) return <div style={s.emptyState}><Calendar size={36} color="#cbd5e1"/><p style={{fontSize:14,color:C.sub,marginTop:8}}>Je doet nog nergens aan mee</p></div>;
  return myMatches.map((m:any)=>(
    <div key={m.id} style={{...s.matchCard,borderLeft:`4px solid ${C.sea}`}} onClick={()=>onOpen(m.id)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14,color:C.dark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.courts?.name||"Onbekende baan"}</div><div style={{fontSize:12,color:C.sub,marginTop:2,display:"flex",alignItems:"center",gap:6}}><Calendar size={11}/>{fmtDate(m.date)}<Clock size={11}/>{m.start_time?.slice(0,5)}</div></div>
        {m.level&&<div style={{...s.lvlBadge,background:(LEVEL_COLOR[m.level]||C.sub)+"22",color:LEVEL_COLOR[m.level]||C.sub}}>{m.level}</div>}
      </div>
      <div style={{marginTop:6}}><BookedBadge booked={m.court_booked} courtNumber={m.court_number} small/></div>
    </div>
  ));
}
function MatchCard({match:m,sbUser,cnt,onJoin,onOpen,compact}:any){
  const lc=LEVEL_COLOR[m.level]||C.sub;
  return (
    <div style={s.matchCard} onClick={onOpen}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:14,color:C.dark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.courts?.name||"Onbekende baan"}</div>
          <div style={{fontSize:12,color:C.sub,marginTop:2,display:"flex",alignItems:"center",gap:6}}><Calendar size={11}/>{fmtDate(m.date)}<Clock size={11}/>{m.start_time?.slice(0,5)}{m.courts?.is_indoor!==undefined&&<span style={{color:C.sea}}>{m.courts.is_indoor?<Home size={11}/>:<Sun size={11}/>}</span>}</div>
          <div style={{marginTop:5}}><BookedBadge booked={m.court_booked} courtNumber={m.court_number} small/></div>
        </div>
        {m.level&&<div style={{...s.lvlBadge,background:lc+"22",color:lc,flexShrink:0,marginLeft:6}}>{m.level}</div>}
      </div>
      {!compact&&m.description&&<p style={{fontSize:12,color:C.sub,fontStyle:"italic",margin:"0 0 7px",lineHeight:1.4}}>"{m.description}"</p>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{...s.slot,...(i<cnt?s.slotFill:s.slotEmpty)}}>{i<cnt&&<Check size={10} color="#fff"/>}</div>)}
          <span style={{fontSize:11,color:C.sub,marginLeft:4}}>{cnt>=4?"Vol":`${4-cnt} vrij`}</span>
        </div>
        <div onClick={(e:any)=>e.stopPropagation()}>{cnt<4&&<button className="btn-join" onClick={(e:any)=>{e.stopPropagation();onJoin();}}>Meedoen</button>}</div>
      </div>
    </div>
  );
}
function BookedBadge({booked,courtNumber,small}:any){
  const sz=small?10:12;
  if (booked) return <span style={{fontSize:sz,background:"#dcfce7",color:"#16a34a",padding:"2px 7px",borderRadius:8,fontWeight:700,display:"inline-flex",alignItems:"center",gap:3}}><CheckCircle size={sz}/>Baan geboekt{courtNumber&&<span style={{background:"#16a34a",color:"#fff",borderRadius:6,padding:"0 5px",marginLeft:2,fontWeight:800}}>#{courtNumber}</span>}</span>;
  return <span style={{fontSize:sz,background:"#fff7ed",color:"#c2410c",padding:"2px 7px",borderRadius:8,fontWeight:700,display:"inline-flex",alignItems:"center",gap:3}}><AlertTriangle size={sz}/>Baan nog niet geboekt</span>;
}

// ─── Match detail ─────────────────────────────────────────────────────────────
function MatchDetailScreen({match:m,sbUser,cnt,onJoin,onLeave,onCancel,onChat,onBack,onToggleBooked,onSetCourtNumber,toast$}:any){
  const [parts,setParts]=useState<any[]>([]); const [isP,setIsP]=useState(false);
  const lc=LEVEL_COLOR[m.level]||C.sub; const full=cnt>=4; const isHost=m.host_id===sbUser?.id; const past=isMatchPast(m);
  useEffect(()=>{
    sb.from("participants").select("user_id,profiles(id,full_name,username,level,knltb_rating,avatar_url)").eq("match_id",m.id)
      .then(({data,error}:any)=>{ if (!error&&data){ setParts(data); setIsP(data.some((p:any)=>p.user_id===sbUser?.id)); }});
  },[m.id,cnt]);
  return (
    // BREEDTE FIX: zelfde structuur als main app
    <div style={s.appShell}><style>{css}</style>
      <div style={s.backHdr}>
        <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"0 16px 12px",paddingTop:"max(14px,env(safe-area-inset-top))"}}>
          <button style={s.backBtn} onClick={onBack}><ArrowLeft size={16}/> Terug</button>
          <strong style={{fontSize:15,color:"#fff"}}>Partijtje</strong>
          <div style={{width:70}}/>
        </div>
      </div>
      <div style={{maxWidth:APP_MAX_W,margin:"0 auto",padding:"14px 14px 32px"}}>
        <div style={s.detailCard}>
          {m.level&&<div style={{...s.lvlBadge,background:lc+"22",color:lc,marginBottom:10,display:"inline-flex"}}>{m.level}</div>}
          <h2 style={{fontSize:18,fontWeight:800,color:C.dark,marginBottom:8}}>{m.courts?.name}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
            <div style={{fontSize:13,color:C.sub,display:"flex",alignItems:"center",gap:6}}><Calendar size={13}/>{fmtDate(m.date)} om {m.start_time?.slice(0,5)}</div>
            {m.courts?.address&&<div style={{fontSize:13,color:C.sub,display:"flex",alignItems:"center",gap:6}}><MapPin size={13}/>{m.courts.address}, {m.courts.city}</div>}
            <div style={{fontSize:13,color:C.sub,display:"flex",alignItems:"center",gap:6}}><User size={13}/>Host: <strong style={{color:C.dark}}>{displayName(m.host)}</strong></div>
          </div>
          {isP&&!past?(
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}>
              <button onClick={()=>onToggleBooked(!m.court_booked)} style={{fontSize:13,padding:"10px 14px",borderRadius:12,fontWeight:700,border:"2px solid",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,background:m.court_booked?"#dcfce7":"#fff7ed",color:m.court_booked?"#16a34a":"#c2410c",borderColor:m.court_booked?"#16a34a":"#c2410c",width:"100%",fontFamily:"inherit"}}>
                {m.court_booked?<><CheckCircle size={15}/>Baan geboekt — klik om te wijzigen</>:<><AlertTriangle size={15}/>Baan nog niet geboekt — klik om te bevestigen</>}
              </button>
              {m.court_booked&&(
                <div style={{background:"#f0f9ff",borderRadius:12,padding:"12px 14px"}}>
                  <p style={{fontSize:12,fontWeight:700,color:C.dark,marginBottom:8,display:"flex",alignItems:"center",gap:5}}><Hash size={13} color={C.sea}/>Op welke baan spelen jullie?</p>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>onSetCourtNumber(m.court_number===n?null:n)} style={{width:38,height:38,borderRadius:10,border:"2px solid",cursor:"pointer",fontWeight:800,fontSize:15,background:m.court_number===n?C.sea:"#fff",color:m.court_number===n?"#fff":C.dark,borderColor:m.court_number===n?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{n}</button>)}</div>
                  {m.court_number&&<p style={{fontSize:12,color:C.green,fontWeight:700,marginTop:8,display:"flex",alignItems:"center",gap:4}}><Check size={12}/>Jullie spelen op baan #{m.court_number}</p>}
                </div>
              )}
            </div>
          ):<div style={{marginBottom:8}}><BookedBadge booked={m.court_booked} courtNumber={m.court_number}/></div>}
          {m.courts?.booking_url&&<a href={m.courts.booking_url} target="_blank" rel="noopener noreferrer" style={{fontSize:12,background:C.sea+"22",color:C.sea,padding:"6px 12px",borderRadius:10,fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:4,marginTop:4}}><MapPin size={12}/>Boek baan online</a>}
          {m.description&&<div style={{...s.detailNote,marginTop:10}}>"{m.description}"</div>}
        </div>
        <h3 style={{...s.secTitle,marginBottom:8}}>Spelers ({cnt}/4)</h3>
        {[0,1,2,3].map(i=>{ const p=parts[i]; const pr=p?.profiles; const lvl=levelText(pr?.level); return (
          <div key={i} style={s.playerRow}>
            <div style={{...s.avaMed,overflow:"hidden"}}>{pr?.avatar_url?<img src={pr.avatar_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:pr?<span style={{color:"#fff",fontWeight:700,fontSize:15}}>{initials(pr)}</span>:<User size={18} color={C.sub}/>}</div>
            {pr?(<div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:14,color:C.dark,display:"flex",alignItems:"center",gap:5}}>{displayName(pr)}{p.user_id===m.host_id&&<Trophy size={12} color={C.sea}/>}</div>
              <div style={{fontSize:12,color:C.sub,display:"flex",alignItems:"center",gap:6}}>{pr.knltb_rating&&<span>KNLTB {pr.knltb_rating}</span>}{pr.level&&<span style={{background:(LEVEL_COLOR[lvl]||C.sub)+"22",color:LEVEL_COLOR[lvl]||C.sub,padding:"1px 7px",borderRadius:8,fontWeight:700,fontSize:11}}>{lvl}</span>}</div>
            </div>):(<div style={{flex:1,color:C.sub,fontSize:14,fontStyle:"italic"}}>Open plek</div>)}
          </div>
        );})}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:16}}>
          <button className="btn-secondary" onClick={onChat} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><MessageSquare size={16}/>Groepschat</button>
          {!isP&&!full&&!past&&<button className="btn-primary" onClick={onJoin}>Meedoen</button>}
          {isP&&!isHost&&!past&&<button style={s.leaveBtn} onClick={onLeave}>Uitschrijven</button>}
          {isHost&&!past&&<button style={s.cancelBtn} onClick={onCancel}><Trash2 size={14} style={{marginRight:6}}/>Partijtje annuleren</button>}
          {past&&<div style={s.pastBadge}>Dit partijtje is al gespeeld</div>}
          {full&&!isP&&!past&&<div style={s.pastBadge}>Dit partijtje is vol</div>}
        </div>
      </div>
    </div>
  );
}

// ─── Chat helpers (GEFIXED: laad berichten na verzenden) ──────────────────────
function ChatBubble({msg,mine,senderName}:any){
  const ts=msg.created_at?new Date(msg.created_at).toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"}):"";
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:mine?"flex-end":"flex-start"}}>
      {!mine&&<span style={{fontSize:11,color:C.sub,marginBottom:2,marginLeft:4}}>{senderName}</span>}
      <div style={{maxWidth:"78%",padding:"9px 13px",borderRadius:14,fontSize:14,lineHeight:1.4,background:mine?C.sea:"#fff",color:mine?"#fff":C.dark,borderBottomRightRadius:mine?2:14,borderBottomLeftRadius:mine?14:2,boxShadow:"0 1px 4px rgba(0,0,0,.08)"}}>{msg.content}</div>
      <span style={{fontSize:10,color:C.sub,marginTop:2}}>{ts}</span>
    </div>
  );
}

// ─── Group chat (GEFIXED: berichten tonen direct na verzenden) ─────────────────
function ChatScreen({match:m,sbUser,onBack,toast$,addNotif}:any){
  const [messages,setMessages]=useState<any[]>([]); const [text,setText]=useState(""); const [loading,setLoading]=useState(true); const endRef=useRef<any>(null);
  const loadMsgs=useCallback(async()=>{
    const {data}:any=await sb.from("messages").select("*,profiles!messages_sender_id_fkey(full_name,username,avatar_url)").eq("match_id",m.id).order("created_at",{ascending:true});
    if (data) setMessages(data); setLoading(false);
  },[m.id]);
  useEffect(()=>{ loadMsgs(); },[loadMsgs]);
  useEffect(()=>{
    const ch=sb.channel(`chat-${m.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`match_id=eq.${m.id}`},(pl:any)=>{
      loadMsgs(); // Laad voor iedereen (ook verzender)
      if (pl.new?.sender_id!==sbUser?.id) addNotif?.(`Nieuw bericht in ${m.courts?.name}`,"💬",{type:"chat",matchId:m.id});
    }).subscribe();
    return ()=>sb.removeChannel(ch);
  },[m.id,loadMsgs,sbUser?.id,addNotif]);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);
  const send=async()=>{
    if (!text.trim()) return;
    const msg=text.trim(); setText("");
    const {error}=await sb.from("messages").insert({match_id:m.id,sender_id:sbUser.id,content:msg});
    if (error) toast$(error.message,"error");
    else loadMsgs(); // Direct herladen na verzenden
  };
  return (
    <div style={{...s.appShell,display:"flex",flexDirection:"column",height:"100dvh"}}><style>{css}</style>
      <div style={s.backHdr}>
        <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"0 16px 12px",paddingTop:"max(14px,env(safe-area-inset-top))"}}>
          <button style={s.backBtn} onClick={onBack}><ArrowLeft size={16}/> Terug</button>
          <div style={{textAlign:"center"}}><strong style={{fontSize:14,color:"#fff"}}>{m.courts?.name}</strong><div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{fmtDate(m.date)} · {m.start_time?.slice(0,5)}</div></div>
          <div style={{width:70}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8,background:C.bg,maxWidth:APP_MAX_W,margin:"0 auto",width:"100%"}}>
        {loading&&<Spinner/>}
        {!loading&&messages.length===0&&<div style={s.emptyState}><MessageSquare size={36} color="#cbd5e1"/><p style={{fontSize:14,color:C.sub,marginTop:8}}>Nog geen berichten</p></div>}
        {messages.map((msg:any)=><ChatBubble key={msg.id} msg={msg} mine={msg.sender_id===sbUser?.id} senderName={displayName(msg.profiles)}/>)}
        <div ref={endRef}/>
      </div>
      <div style={{background:"#fff",borderTop:"1px solid #e2e8f0",padding:"10px 12px",paddingBottom:"max(10px,env(safe-area-inset-bottom))"}}>
        <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",gap:8}}>
          <input className="inp" placeholder="Typ een bericht…" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} style={{flex:1}}/>
          <button style={{width:42,height:42,borderRadius:"50%",background:C.sea,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} onClick={send}><Send size={18} color="#fff"/></button>
        </div>
      </div>
    </div>
  );
}

// ─── Direct message (GEFIXED) ─────────────────────────────────────────────────
function DirectMessageScreen({friendId,sbUser,onBack,toast$}:any){
  const [friend,setFriend]=useState<any>(null); const [messages,setMessages]=useState<any[]>([]); const [text,setText]=useState(""); const [loading,setLoading]=useState(true); const endRef=useRef<any>(null);
  useEffect(()=>{ sb.from("profiles").select("*").eq("id",friendId).single().then(({data}:any)=>setFriend(data)); },[friendId]);
  const loadMsgs=useCallback(async()=>{
    const {data}:any=await sb.from("direct_messages").select("*").or(`and(sender_id.eq.${sbUser.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${sbUser.id})`).order("created_at",{ascending:true});
    if (data) setMessages(data); setLoading(false);
  },[sbUser.id,friendId]);
  useEffect(()=>{ loadMsgs(); },[loadMsgs]);
  useEffect(()=>{
    const ch=sb.channel(`dm-${[sbUser.id,friendId].sort().join("-")}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"direct_messages"},(pl:any)=>{ loadMsgs(); if(pl.new?.sender_id!==sbUser.id) addNotif?.(`Nieuw bericht van ${friend?displayName(friend):"vriend"}`,"✉️",{type:"dm",friendId}); }).subscribe();    return ()=>sb.removeChannel(ch);
  },[loadMsgs,sbUser.id,friendId]);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);
  const send=async()=>{
    if (!text.trim()) return; const msg=text.trim(); setText("");
    const {error}=await sb.from("direct_messages").insert({sender_id:sbUser.id,receiver_id:friendId,content:msg});
    if (error) toast$(error.message,"error"); else loadMsgs();
  };
  return (
    <div style={{...s.appShell,display:"flex",flexDirection:"column",height:"100dvh"}}><style>{css}</style>
      <div style={s.backHdr}>
        <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"0 16px 12px",paddingTop:"max(14px,env(safe-area-inset-top))"}}>
          <button style={s.backBtn} onClick={onBack}><ArrowLeft size={16}/> Terug</button>
          <div style={{textAlign:"center"}}><strong style={{fontSize:14,color:"#fff"}}>{friend?displayName(friend):"…"}</strong><div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>Directe chat</div></div>
          <div style={{width:70}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8,background:C.bg,maxWidth:APP_MAX_W,margin:"0 auto",width:"100%"}}>
        {loading&&<Spinner/>}
        {!loading&&messages.length===0&&<div style={s.emptyState}><MessageSquare size={36} color="#cbd5e1"/><p style={{fontSize:14,color:C.sub,marginTop:8}}>Start het gesprek! 👋</p></div>}
        {messages.map((msg:any)=><ChatBubble key={msg.id} msg={msg} mine={msg.sender_id===sbUser.id} senderName={friend?displayName(friend):"Vriend"}/>)}
        <div ref={endRef}/>
      </div>
      <div style={{background:"#fff",borderTop:"1px solid #e2e8f0",padding:"10px 12px",paddingBottom:"max(10px,env(safe-area-inset-bottom))"}}>
        <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",gap:8}}>
          <input className="inp" placeholder="Typ een bericht…" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} style={{flex:1}}/>
          <button style={{width:42,height:42,borderRadius:"50%",background:C.sea,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} onClick={send}><Send size={18} color="#fff"/></button>
        </div>
      </div>
    </div>
  );
}

// ─── Friend profile ───────────────────────────────────────────────────────────
function FriendProfileScreen({friendId,sbUser,onBack,onChat,toast$}:any){
  const [fr,setFr]=useState<any>(null); const [recentMatches,setRecentMatches]=useState<any[]>([]);
  useEffect(()=>{
    sb.from("profiles").select("*").eq("id",friendId).single().then(({data}:any)=>setFr(data));
    sb.from("participants").select("match_id").eq("user_id",friendId).then(async({data}:any)=>{
      if (!data||!data.length) return;
      const {data:mData}:any=await sb.from("matches").select("*,courts(name,city)").in("id",data.map((r:any)=>r.match_id)).eq("is_cancelled",false).order("date",{ascending:false}).limit(5);
      if (mData) setRecentMatches(mData);
    });
  },[friendId]);
  if (!fr) return <div style={s.appShell}><style>{css}</style><div style={s.backHdr}><div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"0 16px 12px",paddingTop:"max(14px,env(safe-area-inset-top))"}}><button style={s.backBtn} onClick={onBack}><ArrowLeft size={16}/> Terug</button><strong style={{color:"#fff"}}>Profiel</strong><div style={{width:70}}/></div></div><Spinner/></div>;
  const lvl=levelText(fr.level);
  return (
    <div style={s.appShell}><style>{css}</style>
      <div style={s.backHdr}>
        <div style={{maxWidth:APP_MAX_W,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"0 16px 12px",paddingTop:"max(14px,env(safe-area-inset-top))"}}>
          <button style={s.backBtn} onClick={onBack}><ArrowLeft size={16}/> Terug</button>
          <strong style={{fontSize:15,color:"#fff"}}>Profiel</strong>
          <div style={{width:70}}/>
        </div>
      </div>
      <div style={{maxWidth:APP_MAX_W,margin:"0 auto",padding:"14px 14px 32px"}}>
        <div style={{textAlign:"center",padding:"8px 0 18px"}}>
          <div style={{...s.profileAva,margin:"0 auto 10px"}}>{fr.avatar_url?<img src={fr.avatar_url} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/>:<span style={{color:"#fff",fontSize:26,fontWeight:800}}>{initials(fr)}</span>}</div>
          <h2 style={{fontSize:21,fontWeight:800,color:C.dark,margin:"0 0 4px"}}>{displayName(fr)}</h2>
          {fr.username&&<div style={{color:C.sub,fontSize:13,marginBottom:6}}>@{fr.username}</div>}
          <div style={{display:"inline-block",background:(LEVEL_COLOR[lvl]||C.sea)+"22",color:LEVEL_COLOR[lvl]||C.sea,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:4}}>{LEVEL_LABELS[lvl]||lvl||"–"}</div>
          <div style={{color:C.sub,fontSize:13,marginBottom:5,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><MapPin size={12}/>{fr.location||"–"}</div>
          {fr.knltb_rating&&<div style={{fontSize:13,fontWeight:700,color:C.sea,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Trophy size={14}/>KNLTB {fr.knltb_rating}</div>}
          {fr.bio&&<p style={{fontSize:13,color:C.sub,marginTop:8,fontStyle:"italic"}}>"{fr.bio}"</p>}
        </div>
        <button className="btn-primary" style={{marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={onChat}><MessageSquare size={16}/>Stuur bericht</button>
        {recentMatches.length>0&&(<>
          <h3 style={{...s.secTitle,marginBottom:8}}>Recente partijtjes</h3>
          {recentMatches.map((m:any)=>(
            <div key={m.id} style={{background:"#fff",borderRadius:12,padding:"10px 13px",marginBottom:8,boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
              <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{m.courts?.name||"Onbekende baan"}</div>
              <div style={{fontSize:12,color:C.sub,marginTop:2,display:"flex",alignItems:"center",gap:5}}><Calendar size={11}/>{fmtDate(m.date)}</div>
            </div>
          ))}
        </>)}
      </div>
    </div>
  );
}

// ─── Create screen (GEFIXED: vrienden worden echt toegevoegd) ─────────────────
function CreateScreen({courts,onCreate,sbUser}:any){
  const initTime=defaultFutureTime();
  const [f,setF]=useState({courtId:"",date:today(),time:initTime,level:"Gemiddeld",note:"",court_booked:false});
  const [busy,setBusy]=useState(false); const [friends,setFriends]=useState<any[]>([]); const [invitedIds,setInvitedIds]=useState<string[]>([]);
  const set=(k:string)=>(e:any)=>setF(p=>({...p,[k]:e.target.value}));
  const court=courts.find((c:any)=>String(c.id)===String(f.courtId));
  const timeValid=isMatchTimeValid(f.date,f.time);
  useEffect(()=>{
    if (!sbUser) return;
    sb.from("friendships").select("friend_id,profiles!friendships_friend_id_fkey(id,full_name,username,avatar_url)").eq("user_id",sbUser.id).eq("status","accepted")
      .then(({data}:any)=>{ if (data) setFriends(data.map((r:any)=>r.profiles).filter(Boolean)); });
  },[sbUser]);
  const toggleInvite=(id:string)=>setInvitedIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const go=async()=>{
    if (!f.courtId||!timeValid) return; setBusy(true);
    await onCreate({...f,invitedFriends:invitedIds}); setBusy(false);
  };
  return (
    <div style={s.page}><h2 style={s.pageTitle}>Partijtje aanmaken</h2>
      <div style={s.formCard}>
        <label style={s.lbl}>Baan *</label>
        <select className="inp" value={f.courtId} onChange={set("courtId")}><option value="">Kies een baan…</option>{courts.map((c:any)=><option key={c.id} value={c.id}>{c.name} — {c.city||c.location}</option>)}</select>
        <label style={s.lbl}>Datum *</label><input className="inp" type="date" value={f.date} min={today()} onChange={set("date")}/>
        <label style={s.lbl}>Starttijd * <span style={{color:C.sub,fontWeight:400,fontSize:11,textTransform:"none"}}>(min. 2 uur van tevoren)</span></label>
        <input className="inp" type="time" value={f.time} onChange={set("time")} style={{borderColor:f.time&&!timeValid?"#ef4444":undefined}}/>
        {f.time&&!timeValid&&<div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.red,marginTop:-4}}><AlertTriangle size={13}/>Min. 2 uur in de toekomst</div>}
        <label style={s.lbl}>Niveau</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{LEVELS.map(l=><button key={l} type="button" onClick={()=>setF(p=>({...p,level:l}))} style={{padding:"6px 10px",borderRadius:16,fontSize:12,fontWeight:700,border:"1.5px solid",cursor:"pointer",background:f.level===l?C.sea:"#fff",color:f.level===l?"#fff":C.dark,borderColor:f.level===l?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{LEVEL_LABELS[l]||l}</button>)}</div>
        <div style={{background:C.bg,borderRadius:10,padding:"12px 13px"}}>
          <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,fontWeight:700,color:C.dark}}>
            <input type="checkbox" checked={f.court_booked} onChange={e=>setF(p=>({...p,court_booked:e.target.checked}))} style={{width:17,height:17,accentColor:C.sea}}/>Ik heb de baan al geboekt
          </label>
          {court?.booking_url&&!f.court_booked&&<a href={court.booking_url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,fontSize:12,color:C.sea,fontWeight:700,textDecoration:"none"}}><MapPin size={12}/>Boek {court.name} hier</a>}
        </div>
        {/* Vrienden uitnodigen – worden DIRECT als deelnemer toegevoegd */}
        {friends.length>0&&(
          <div>
            <label style={s.lbl}>Vrienden uitnodigen (worden direct toegevoegd)</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {friends.map((fr:any)=>{
                const invited=invitedIds.includes(fr.id);
                return (
                  <button key={fr.id} type="button" onClick={()=>toggleInvite(fr.id)} style={{display:"flex",alignItems:"center",gap:6,borderRadius:10,padding:"5px 10px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",border:`2px solid ${invited?C.sea:"#e2e8f0"}`,background:invited?"#e0f2fe":"#fff",color:invited?C.sea:C.dark,transition:"all .15s"}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:invited?C.sea:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:invited?"#fff":C.sub,overflow:"hidden"}}>
                      {fr.avatar_url?<img src={fr.avatar_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:initials(fr)}
                    </div>
                    {displayName(fr)}
                    {invited&&<Check size={12} color={C.sea}/>}
                  </button>
                );
              })}
            </div>
            {invitedIds.length>0&&<p style={{fontSize:12,color:C.green,marginTop:6,fontWeight:600}}>✓ {invitedIds.length} vriend{invitedIds.length>1?"en":""} worden direct toegevoegd</p>}
          </div>
        )}
        <label style={s.lbl}>Opmerking (optioneel)</label>
        <input className="inp" placeholder="Bijv. gezellig potje, beginners welkom…" value={f.note} onChange={set("note")}/>
        {court&&(<div style={s.previewCard}>
          <p style={{fontWeight:700,fontSize:13,color:C.dark,margin:"0 0 8px",display:"flex",alignItems:"center",gap:5}}><Check size={14} color={C.sea}/>Overzicht</p>
          {[["Baan",court.name],["Datum",`${fmtDate(f.date)} om ${f.time}`],["Niveau",f.level],["Vrij","na uitnodigingen"+(invitedIds.length>0?` (${3-invitedIds.length} plekken)`:"")],["Geboekt",f.court_booked?"Ja ✓":"Nog niet"]].map(([l,v])=><p key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.sub,margin:"4px 0"}}><span>{l}</span><strong style={{color:C.dark}}>{v}</strong></p>)}
        </div>)}
        <button className="btn-primary" disabled={!f.courtId||busy||!timeValid} onClick={go}>{busy?"Aanmaken…":"Partijtje plaatsen"}</button>
      </div>
    </div>
  );
}

// ─── Courts map ───────────────────────────────────────────────────────────────
function CourtsMap({courts}:any){
  const mapRef=useRef<any>(null); const instanceRef=useRef<any>(null);
  useEffect(()=>{
    if (instanceRef.current||!mapRef.current||courts.length===0) return;
    if (!document.getElementById("leaflet-css")){ const link=document.createElement("link"); link.id="leaflet-css"; link.rel="stylesheet"; link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link); }
    const load=()=>{ if ((window as any).L) initMap(); else { const sc=document.createElement("script"); sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; sc.onload=initMap; document.head.appendChild(sc); } };
    const initMap=async()=>{
      if (instanceRef.current||!mapRef.current) return;
      const L=(window as any).L;
      const map=L.map(mapRef.current,{zoomControl:true,scrollWheelZoom:false}).setView([51.46,3.87],10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(map);
      instanceRef.current=map;
      for (const c of courts){
        let coords:[number,number]|null=null;
        if (c.lat&&c.lng) coords=[c.lat,c.lng];
        else if (c.address&&c.city){ try { const q=encodeURIComponent(`${c.address}, ${c.city}, Zeeland, Nederland`); const r=await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=nl`,{headers:{"Accept-Language":"nl"}}); const data=await r.json(); if (data[0]) coords=[parseFloat(data[0].lat),parseFloat(data[0].lon)]; await new Promise(res=>setTimeout(res,300)); } catch {} }
        if (!coords) coords=CITY_COORDS[c.city]||null;
        if (!coords) continue;
        const icon=L.divIcon({className:"",html:`<div style="background:${c.is_indoor?"#8b5cf6":"#0ea5e9"};width:30px;height:30px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:14px">${c.is_indoor?"🏠":"☀️"}</div>`,iconSize:[30,30],iconAnchor:[15,15]});
        L.marker(coords,{icon}).addTo(map).bindPopup(`<strong>${c.name}</strong><br><small>${c.address?c.address+", ":""}${c.city}</small>`);
      }
      setTimeout(()=>map.invalidateSize(),200);
    };
    load();
    return ()=>{ if (instanceRef.current){ instanceRef.current.remove(); instanceRef.current=null; } };
  },[courts]);
  return <div style={{borderRadius:14,overflow:"hidden",marginBottom:14,boxShadow:"0 2px 14px rgba(0,0,0,.12)"}}><div ref={mapRef} style={{height:230,width:"100%",background:"#e2e8f0"}}/></div>;
}

function CourtsScreen({courts,matches,getCount,onSuggest}:any){
  return (
    <div style={s.page}><h2 style={s.pageTitle}>Banen in Zeeland</h2>
      {courts.length===0?<Spinner/>:<>
        <CourtsMap courts={courts}/>
        {courts.map((c:any)=>{ const active=matches.filter((m:any)=>m.court_id===c.id&&getCount(m)<4).length; return (
          <div key={c.id} style={s.courtCard}>
            <div style={{width:44,height:44,background:C.bg,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{c.is_indoor?<Home size={20} color={C.sea}/>:<Sun size={20} color="#f59e0b"/>}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:14,color:C.dark}}>{c.name}</div>
              <div style={{fontSize:12,color:C.sub,marginTop:2,display:"flex",alignItems:"center",gap:4}}><MapPin size={11}/>{c.address?`${c.address}, ${c.city}`:c.city}</div>
              <div style={{display:"flex",gap:6,marginTop:5,alignItems:"center"}}><span style={{fontSize:11,color:C.sea,fontWeight:600}}>{c.is_indoor?"Overdekt":"Buiten"}</span>{c.booking_url&&<a href={c.booking_url} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#fff",background:C.sea,padding:"2px 8px",borderRadius:8,fontWeight:700,textDecoration:"none"}}><MapPin size={9}/>Boeken</a>}</div>
            </div>
            {active>0&&<div style={{background:C.green+"22",color:C.green,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20,flexShrink:0}}>{active} open</div>}
          </div>
        );})}
      </>}
      <button style={s.suggestBtn} onClick={onSuggest}><Plus size={16}/> Baan voorstellen</button>
    </div>
  );
}

// ─── Friends screen ───────────────────────────────────────────────────────────
function FriendsScreen({sbUser,toast$,onChat,onProfile}:any){
  const [friends,setFriends]=useState<any[]>([]); const [pending,setPending]=useState<any[]>([]);
  const [search,setSearch]=useState(""); const [results,setResults]=useState<any[]>([]); const [searching,setSearching]=useState(false);
  const [confirmRemove,setConfirmRemove]=useState<string|null>(null);
  const loadFriends=useCallback(async()=>{
    if (!sbUser) return;
    const {data:acc}:any=await sb.from("friendships").select("friend_id,profiles!friendships_friend_id_fkey(id,full_name,username,knltb_rating,level,avatar_url)").eq("user_id",sbUser.id).eq("status","accepted");
    if (acc) setFriends(acc.map((r:any)=>r.profiles).filter(Boolean));
    const {data:pend}:any=await sb.from("friendships").select("user_id,profiles!friendships_user_id_fkey(id,full_name,username)").eq("friend_id",sbUser.id).eq("status","pending");
    if (pend) setPending(pend.map((r:any)=>({...r.profiles,fid:r.user_id})).filter(Boolean));
  },[sbUser]);
  useEffect(()=>{ loadFriends(); },[loadFriends]);
  const doSearch=async()=>{
    if (!search.trim()) return; setSearching(true);
    const {data}:any=await sb.from("profiles").select("id,full_name,username,knltb_rating,level,avatar_url").or(`full_name.ilike.%${search}%,username.ilike.%${search}%`).neq("id",sbUser.id).limit(10);
    if (data) setResults(data); setSearching(false);
  };
  const sendRequest=async(friendId:string)=>{ const {error}:any=await sb.from("friendships").insert({user_id:sbUser.id,friend_id:friendId,status:"pending"}); if (error) toast$(error.code==="23505"?"Al verstuurd":error.message,"error"); else toast$("Vriendschapsverzoek verstuurd! 🤝"); setResults([]); setSearch(""); };
  const acceptRequest=async(fromId:string)=>{ await sb.from("friendships").update({status:"accepted"}).eq("user_id",fromId).eq("friend_id",sbUser.id); await sb.from("friendships").insert({user_id:sbUser.id,friend_id:fromId,status:"accepted"}).then(()=>{}); toast$("Vriend toegevoegd! 🎾"); loadFriends(); };
  const declineRequest=async(fromId:string)=>{ await sb.from("friendships").delete().eq("user_id",fromId).eq("friend_id",sbUser.id); toast$("Verzoek afgewezen"); loadFriends(); };
  const removeFriend=async(friendId:string)=>{ await sb.from("friendships").delete().eq("user_id",sbUser.id).eq("friend_id",friendId); await sb.from("friendships").delete().eq("user_id",friendId).eq("friend_id",sbUser.id); toast$("Vriend verwijderd"); setConfirmRemove(null); loadFriends(); };
  return (
    <div style={s.page}>
      <h2 style={s.pageTitle}>Vrienden</h2>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <input className="inp" placeholder="Zoek op naam of gebruikersnaam…" value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()} style={{flex:1}}/>
        <button style={{padding:"0 14px",background:C.sea,border:"none",borderRadius:10,cursor:"pointer",color:"#fff",fontWeight:700,fontSize:13,fontFamily:"inherit"}} onClick={doSearch} disabled={searching}>Zoek</button>
      </div>
      {results.length>0&&(
        <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,.1)",marginBottom:14}}>
          <div style={{padding:"8px 12px",background:"#f0f9ff",fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:.5}}>Zoekresultaten</div>
          {results.map((r:any)=>(
            <div key={r.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderBottom:"1px solid #f1f5f9"}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:C.sea,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:700,overflow:"hidden",flexShrink:0}}>{r.avatar_url?<img src={r.avatar_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:initials(r)}</div>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{displayName(r)}</div><div style={{fontSize:11,color:C.sub}}>{levelText(r.level)}</div></div>
              <button onClick={()=>sendRequest(r.id)} style={{padding:"6px 12px",background:C.sea,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}><UserPlus size={12}/>Voeg toe</button>
            </div>
          ))}
        </div>
      )}
      {pending.length>0&&(
        <div style={{marginBottom:14}}>
          <p style={{...s.filterLabel,marginBottom:8}}>Vriendschapsverzoeken ({pending.length})</p>
          {pending.map((p:any)=>(
            <div key={p.id} style={{background:"#fef9c3",borderRadius:12,padding:"10px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"#f59e0b",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",fontWeight:700,flexShrink:0}}>{initials(p)}</div>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.dark}}>{displayName(p)}</div><div style={{fontSize:11,color:C.sub}}>Wil jouw vriend zijn 🤝</div></div>
              <button onClick={()=>acceptRequest(p.fid)} style={{padding:"6px 10px",background:C.green,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>✓</button>
              <button onClick={()=>declineRequest(p.fid)} style={{padding:"6px 10px",background:"#fee2e2",color:C.red,border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>✗</button>
            </div>
          ))}
        </div>
      )}
      <p style={{...s.filterLabel,marginBottom:8}}>Mijn vrienden ({friends.length})</p>
      {friends.length===0?<div style={{...s.emptyState,padding:"28px 0"}}><Users size={38} color="#cbd5e1"/><p style={{fontSize:14,color:C.sub,marginTop:8}}>Nog geen vrienden</p><p style={{fontSize:12,color:C.sub}}>Zoek op naam 👆</p></div>
        :friends.map((fr:any)=>(
          <div key={fr.id} style={{background:"#fff",borderRadius:12,padding:"10px 12px",marginBottom:8,boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
            {confirmRemove===fr.id?(
              <div>
                <p style={{fontSize:13,color:C.dark,fontWeight:700,marginBottom:8}}>{displayName(fr)} verwijderen als vriend?</p>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>removeFriend(fr.id)} style={{flex:1,padding:"8px",background:"#fee2e2",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",color:C.red}}>Verwijderen</button>
                  <button onClick={()=>setConfirmRemove(null)} style={{flex:1,padding:"8px",background:"#f1f5f9",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",color:C.sub}}>Annuleren</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div onClick={()=>onProfile(fr.id)} style={{width:42,height:42,borderRadius:"50%",background:C.sea,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700,overflow:"hidden",flexShrink:0,cursor:"pointer"}}>
                  {fr.avatar_url?<img src={fr.avatar_url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:initials(fr)}
                </div>
                <div style={{flex:1,cursor:"pointer"}} onClick={()=>onProfile(fr.id)}>
                  <div style={{fontWeight:700,fontSize:14,color:C.dark}}>{displayName(fr)}</div>
                  <div style={{fontSize:12,color:C.sub}}>{levelText(fr.level)}{fr.knltb_rating&&` · KNLTB ${fr.knltb_rating}`}</div>
                </div>
                <button onClick={()=>onChat(fr.id)} style={{padding:"7px 10px",background:"#e0f2fe",border:"none",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:700,color:C.sea}}><MessageSquare size={13}/>Chat</button>
                <button onClick={()=>setConfirmRemove(fr.id)} style={{padding:"7px 8px",background:"#fee2e2",border:"none",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",color:C.red}}><Trash2 size={13}/></button>
              </div>
            )}
          </div>
        ))
      }
    </div>
  );
}

// ─── Profile screen ───────────────────────────────────────────────────────────
function ProfileScreen({profile,sbUser,matches,getCount,onOpen,onLogout,onUpdateProfile,onUploadAvatar,toast$}:any){
  const [editing,setEditing]=useState(false); const [editLevel,setEL]=useState(3); const [editBio,setEB]=useState(""); const [editLoc,setELoc]=useState(""); const [editKnltb,setEK]=useState("");
  const [changePw,setChangePw]=useState(false); const [newPw,setNewPw]=useState(""); const [confirmPw,setConfirmPw]=useState(""); const [pwBusy,setPwBusy]=useState(false);
  const [uploading,setUploading]=useState(false); const fileRef=useRef<any>(null);
  useEffect(()=>{ if (profile){ setEL(profile.level||3); setEB(profile.bio||""); setELoc(profile.location||""); setEK(profile.knltb_rating||""); } },[profile]);
  const lvl=levelText(profile?.level);
  const hosted=matches.filter((m:any)=>m.host_id===sbUser?.id);
  const upcoming=hosted.filter((m:any)=>!isMatchPast(m)); const played=hosted.filter((m:any)=>isMatchPast(m));
  const saveEdit=async()=>{ await onUpdateProfile({level:Number(editLevel),bio:editBio,location:editLoc,knltb_rating:editKnltb||null}); setEditing(false); };
  const handleAvatarChange=async(e:any)=>{ const file=e.target.files?.[0]; if (!file) return; setUploading(true); const url=await onUploadAvatar(file); if (url) await onUpdateProfile({avatar_url:url}); setUploading(false); };
  const handleChangePw=async()=>{ if (!newPw||newPw!==confirmPw){ toast$("Wachtwoorden komen niet overeen","error"); return; } if (newPw.length<6){ toast$("Minimaal 6 tekens","error"); return; } setPwBusy(true); const {error}:any=await sb.auth.updateUser({password:newPw}); if (error) toast$(error.message,"error"); else{ toast$("Wachtwoord gewijzigd!"); setChangePw(false); setNewPw(""); setConfirmPw(""); } setPwBusy(false); };
  return (
    <div style={s.page}>
      <h2 style={s.pageTitle}>Profiel</h2>
      <div style={{textAlign:"center",padding:"4px 0 14px"}}>
        <div style={{position:"relative",display:"inline-block",marginBottom:10}}>
          <div style={s.profileAva}>{profile?.avatar_url?<img src={profile.avatar_url} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/>:<span style={{color:"#fff",fontSize:26,fontWeight:800}}>{initials(profile)}</span>}</div>
          <button type="button" onClick={()=>fileRef.current?.click()} disabled={uploading} style={{position:"absolute",bottom:2,right:2,width:28,height:28,borderRadius:"50%",background:C.sea,border:"2px solid #fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{uploading?<div className="spin-sm"/>:<Camera size={12} color="#fff"/>}</button>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleAvatarChange}/>
        </div>
        <h2 style={{fontSize:20,fontWeight:800,color:C.dark,margin:"0 0 4px"}}>{displayName(profile)}</h2>
        {profile?.username&&<div style={{color:C.sub,fontSize:13,marginBottom:5}}>@{profile.username}</div>}
        <div style={{display:"inline-block",background:(LEVEL_COLOR[lvl]||C.sea)+"22",color:LEVEL_COLOR[lvl]||C.sea,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:4}}>{LEVEL_LABELS[lvl]||lvl||"–"}</div>
        <div style={{color:C.sub,fontSize:13,marginBottom:5,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><MapPin size={12}/>{profile?.location||"–"}</div>
        {profile?.knltb_rating&&<div style={{fontSize:13,fontWeight:700,color:C.sea,marginBottom:4,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Trophy size={14}/>KNLTB {profile.knltb_rating}</div>}
        {profile?.bio&&<p style={{fontSize:13,color:C.sub,marginTop:8,fontStyle:"italic"}}>"{profile.bio}"</p>}
      </div>
      {!editing&&!changePw&&(
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button style={{...s.editBtn,flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={()=>setEditing(true)}><Edit2 size={14}/>Bewerken</button>
          <button style={{...s.editBtn,flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={()=>setChangePw(true)}><Key size={14}/>Wachtwoord</button>
        </div>
      )}
      {editing&&(
        <div style={{...s.formCard,marginBottom:14}}>
          <p style={{fontWeight:800,fontSize:14,color:C.dark}}>Profiel bewerken</p>
          <label style={s.lbl}>Niveau</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{LEVELS.map((l,i)=><button key={l} type="button" onClick={()=>setEL(i+1)} style={{padding:"6px 10px",borderRadius:16,fontSize:11,fontWeight:700,border:"1.5px solid",cursor:"pointer",background:editLevel===(i+1)?C.sea:"#fff",color:editLevel===(i+1)?"#fff":C.dark,borderColor:editLevel===(i+1)?C.sea:"#e2e8f0",fontFamily:"inherit"}}>{LEVEL_LABELS[l]||l}</button>)}</div>
          <label style={s.lbl}>KNLTB Rating</label><select className="inp" value={editKnltb} onChange={e=>setEK(e.target.value)}><option value="">Geen / onbekend</option>{KNLTB_RATINGS.map(r=><option key={r} value={r}>{r}</option>)}</select>
          <label style={s.lbl}>Woonplaats</label><select className="inp" value={editLoc} onChange={e=>setELoc(e.target.value)}>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</select>
          <label style={s.lbl}>Bio (optioneel)</label><textarea className="inp" rows={3} placeholder="Vertel iets over jezelf…" value={editBio} onChange={e=>setEB(e.target.value)} style={{resize:"none"}}/>
          <div style={{display:"flex",gap:8}}><button style={{...s.leaveBtn,flex:1,padding:"10px"}} onClick={()=>setEditing(false)}>Annuleren</button><button className="btn-primary" style={{flex:2}} onClick={saveEdit}>Opslaan</button></div>
        </div>
      )}
      {changePw&&(
        <div style={{...s.formCard,marginBottom:14}}>
          <p style={{fontWeight:800,fontSize:14,color:C.dark,display:"flex",alignItems:"center",gap:6}}><Key size={15}/>Wachtwoord wijzigen</p>
          <label style={s.lbl}>Nieuw wachtwoord</label><input className="inp" type="password" placeholder="Minimaal 6 tekens" value={newPw} onChange={e=>setNewPw(e.target.value)}/>
          <label style={s.lbl}>Bevestig wachtwoord</label><input className="inp" type="password" placeholder="Herhaal wachtwoord" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)}/>
          <div style={{display:"flex",gap:8}}><button style={{...s.leaveBtn,flex:1,padding:"10px"}} onClick={()=>setChangePw(false)}>Annuleren</button><button className="btn-primary" style={{flex:2}} onClick={handleChangePw} disabled={pwBusy||!newPw||!confirmPw}>{pwBusy?"Opslaan…":"Opslaan"}</button></div>
        </div>
      )}
      <div style={s.stats3}>{[{label:"Gehost",value:played.length,Icon:CheckCircle},{label:"Gepland",value:upcoming.length,Icon:Calendar},{label:"KNLTB",value:profile?.knltb_rating||"–",Icon:Trophy}].map(({label,value,Icon}:any)=><div key={label} style={s.statCard}><Icon size={18} color={C.sea}/><span style={{fontSize:18,fontWeight:800,color:C.dark}}>{value}</span><span style={{fontSize:10,color:C.sub}}>{label}</span></div>)}</div>
      <h3 style={{...s.secTitle,marginBottom:8,marginTop:4}}>Aankomende partijtjes als host</h3>
      {upcoming.length===0?<div style={{...s.emptyState,padding:"20px 0"}}><Calendar size={28} color="#cbd5e1"/><p style={{fontSize:13,color:C.sub,marginTop:6}}>Geen komende partijtjes als host</p></div>
        :upcoming.map((m:any)=>(
          <div key={m.id} style={{background:"#fff",borderRadius:12,padding:"11px 13px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,.05)",cursor:"pointer"}} onClick={()=>onOpen(m.id)}>
            <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14,color:C.dark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.courts?.name}</div><div style={{fontSize:12,color:C.sub,marginTop:2,display:"flex",alignItems:"center",gap:5}}><Calendar size={11}/>{fmtDate(m.date)}<Clock size={11}/>{m.start_time?.slice(0,5)}</div></div>
            {m.level&&<div style={{...s.lvlBadge,background:(LEVEL_COLOR[m.level]||C.sub)+"22",color:LEVEL_COLOR[m.level]||C.sub,flexShrink:0}}>{m.level}</div>}
          </div>
        ))
      }
      <button style={{...s.leaveBtn,marginTop:14,color:C.red,borderColor:"#fecaca",display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={onLogout}><LogOut size={15}/>Uitloggen</button>
    </div>
  );
}

function Spinner(){ return <div style={{textAlign:"center",padding:"28px 0"}}><div className="spinner"/><p style={{color:C.sub,fontSize:12,marginTop:10,fontWeight:600}}>Laden…</p></div>; }

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string,any> = {
  // BREEDTE FIX: appShell is volledig breed, content is altijd max 430 gecentreerd
  appShell:{fontFamily:"'Nunito',sans-serif",background:C.bg,minHeight:"100dvh",width:"100%",overflowX:"hidden"},
  mainWrap:{maxWidth:APP_MAX_W,margin:"0 auto",paddingTop: "calc(95px + env(safe-area-inset-top))",paddingBottom: 100},
  // Header: fixed + full width, content gecentreerd binnen
  header:{background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)",position:"fixed",top:0,left:0,right:0,zIndex:2000,boxShadow:"0 2px 20px rgba(3,105,161,0.3)",padding:"0 16px 12px",paddingTop:"calc(15px + env(safe-area-inset-top))"},
  // Backheader voor subschermen (ook full width)
  backHdr:{background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 10px rgba(3,105,161,0.2)",paddingTop: "calc(15px + env(safe-area-inset-top))",paddingBottom: "12px"},
  backBtn:{background:"none",border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"},
  ava:{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.25)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,overflow:"hidden"},
  avaMed:{width:42,height:42,borderRadius:"50%",background:C.sea,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"},
  profileAva:{width:84,height:84,borderRadius:"50%",background:C.sea,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  bellBtn:{background:"none",border:"none",cursor:"pointer",position:"relative",padding:"0 2px",flexShrink:0,display:"flex",alignItems:"center"},
  badge:{position:"absolute",top:-3,right:-3,background:"#ef4444",color:"#fff",fontSize:9,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700},
  // Nav: fixed + full width, content gecentreerd
  nav: {
    position: "fixed",
    bottom: 0, // MOET op 0 staan
    left: 0,
    right: 0,
    background: "#fff",
    boxShadow: "0 -2px 20px rgba(0,0,0,0.08)",
    zIndex: 100,
    // Dit zorgt dat de witte balk helemaal naar beneden doorloopt onder het streepje
    paddingBottom: "env(safe-area-inset-bottom)",
  },
  
  navInner: {
    display: "flex",
    maxWidth: APP_MAX_W,
    margin: "0 auto",
    height: "65px", // Een vaste hoogte voor de knoppen
    alignItems: "center",
  },  navBtn:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 2px 6px",background:"none",border:"none",cursor:"pointer",gap:3,minWidth:0,overflow:"hidden",position:"relative"},
  navIndicator:{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:3,background:C.sea,borderRadius:"0 0 4px 4px"},
  navCreate:{width:46,height:46,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(14,165,233,0.45)",marginTop:-12,marginBottom:2},
  navLbl:{fontSize:10,whiteSpace:"nowrap"},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"flex-end"},
  notifPanel:{background:"#fff",width:"min(300px,90vw)",maxHeight:"80dvh",overflowY:"auto",marginTop:"calc(90px + env(safe-area-inset-top))",marginRight:8,borderRadius:14,boxShadow:"0 8px 30px rgba(0,0,0,.2)"},
  notifHead:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderBottom:"1px solid #e2e8f0"},
  modalCard:{background:"#fff",width:"min(390px,94vw)",maxHeight:"90dvh",overflowY:"auto",margin:"auto",borderRadius:20,padding:"18px 16px",boxShadow:"0 20px 60px rgba(0,0,0,.3)"},
  closeBtn:{background:"none",border:"none",cursor:"pointer",color:C.sub,padding:"0 2px",display:"flex",alignItems:"center"},
  // Auth
  authWrap:{minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",background:"linear-gradient(160deg,#0f172a 0%,#0ea5e9 100%)",position:"relative",overflow:"hidden"},
  authBg:{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 20%,rgba(14,165,233,.3) 0%,transparent 50%),radial-gradient(circle at 70% 80%,rgba(8,145,178,.2) 0%,transparent 50%)",pointerEvents:"none"},
  authCard:{background:"rgba(255,255,255,.97)",backdropFilter:"blur(20px)",borderRadius:22,padding:"24px 20px",width:"100%",maxWidth:440,display:"flex",flexDirection:"column" as const,gap:12,boxShadow:"0 24px 64px rgba(0,0,0,.35)",position:"relative"},
  authTitle:{fontSize:22,fontWeight:800,color:C.dark,textAlign:"center" as const,margin:0},
  authSub:{color:C.sub,textAlign:"center" as const,fontSize:13,marginTop:-4},
  regLbl:{fontSize:12,fontWeight:700,color:C.dark,display:"block",marginBottom:5},
  // Content
  page:{padding:"14px 14px 0"},
  pageTitle:{fontSize:20,fontWeight:800,color:C.dark,marginBottom:14,letterSpacing:-0.5},
  secTitle:{fontSize:15,fontWeight:700,color:C.dark,margin:0},
  lbl:{fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase" as const,letterSpacing:.5,display:"block",marginBottom:4},
  weatherCard:{background:"#fff",borderRadius:14,padding:"12px 13px",marginBottom:12,display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 10px rgba(0,0,0,.07)"},
  stats3:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12},
  statCard:{background:"#fff",borderRadius:12,padding:"12px 6px",textAlign:"center" as const,display:"flex",flexDirection:"column" as const,alignItems:"center",gap:3,boxShadow:"0 2px 8px rgba(0,0,0,.06)"},
  tabRow:{display:"flex",gap:8,marginBottom:12},
  tabBtn:{flex:1,padding:"9px 4px",border:"1.5px solid #e2e8f0",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",background:"#fff",color:C.sub,fontFamily:"inherit"},
  tabActive:{background:C.sea,color:"#fff",borderColor:C.sea},
  filterToggleBtn:{width:"100%",padding:"9px 14px",border:"1.5px solid #e2e8f0",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:10,transition:"all .2s"},
  filterBox:{background:"#fff",borderRadius:14,padding:"12px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.05)"},
  filterLabel:{fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase" as const,letterSpacing:.5,margin:"0 0 6px",display:"block"},
  matchCard:{background:"#fff",borderRadius:14,padding:"12px 13px",marginBottom:10,boxShadow:"0 2px 12px rgba(0,0,0,.07)",cursor:"pointer"},
  lvlBadge:{fontSize:11,fontWeight:700,padding:"3px 7px",borderRadius:20,whiteSpace:"nowrap"},
  slot:{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  slotFill:{background:C.sea},
  slotEmpty:{background:"#e2e8f0",border:"2px dashed #cbd5e1"},
  clearBtn:{background:"#e2e8f0",border:"none",borderRadius:8,padding:"7px 9px",cursor:"pointer",color:C.dark,flexShrink:0,display:"flex",alignItems:"center"},
  emptyState:{textAlign:"center" as const,color:C.sub,padding:"32px 14px",display:"flex",flexDirection:"column" as const,alignItems:"center",gap:4},
  formCard:{background:"#fff",borderRadius:14,padding:"16px 14px",display:"flex",flexDirection:"column" as const,gap:10,boxShadow:"0 2px 12px rgba(0,0,0,.07)"},
  previewCard:{background:C.bg,borderRadius:10,padding:"11px 12px"},
  courtCard:{background:"#fff",borderRadius:14,padding:"12px 13px",marginBottom:10,display:"flex",alignItems:"center",gap:11,boxShadow:"0 2px 8px rgba(0,0,0,.06)"},
  suggestBtn:{width:"100%",padding:"12px",background:"#fff",border:"1.5px dashed #cbd5e1",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",color:C.sea,marginTop:4,marginBottom:18,display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"inherit"},
  detailCard:{background:"#fff",borderRadius:14,padding:"14px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.07)"},
  detailNote:{fontSize:13,color:C.sub,fontStyle:"italic",background:C.bg,borderRadius:8,padding:"8px 10px"},
  playerRow:{background:"#fff",borderRadius:12,padding:"10px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10,boxShadow:"0 1px 6px rgba(0,0,0,.05)"},
  leaveBtn:{width:"100%",padding:"11px",background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",color:C.sub,fontFamily:"inherit"},
  cancelBtn:{width:"100%",padding:"11px",background:"#fee2e2",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",color:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"},
  pastBadge:{textAlign:"center" as const,color:C.sub,fontSize:13,padding:10,background:"#f1f5f9",borderRadius:10},
  editBtn:{padding:"10px",background:"#fff",border:"1.5px solid #e2e8f0",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",color:C.dark,fontFamily:"inherit"},
};

const css=`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
  
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}

  .auth-field-wrap:focus-within{border-color:#0ea5e9 !important;background:#fff !important;}
  .auth-bare{flex:1;border:none;background:transparent;outline:none;padding:5px 0;font-size:18px;font-family:inherit;color:#1e293b;min-width:0;}
  .auth-bare::placeholder{color:#94a3b8;}
  .inp{width:100%;padding:11px 13px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:14px;font-family:inherit;background:#fff;outline:none;color:#1e293b;}
  .inp:focus{border-color:#0ea5e9;}
  .inp-sm{padding:9px 11px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;font-family:inherit;background:#fff;outline:none;color:#1e293b;width:100%;}
  .inp-sm:focus{border-color:#0ea5e9;}
  .btn-primary{width:100%;padding:13px;background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;}
  .btn-primary:disabled{opacity:.45;cursor:not-allowed;}
  .btn-auth{width:100%;padding:20px;background:linear-gradient(135deg,#0ea5e9,#0369a1);color:#fff;border:none;border-radius:14px;font-size:18px;font-weight:800;cursor:pointer;font-family:inherit;}  .btn-auth:disabled{opacity:.4;cursor:not-allowed;}
  .btn-auth-outline{flex:1;padding:13px;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;font-size:14px;font-weight:700;color:#64748b;cursor:pointer;font-family:inherit;}
  .btn-secondary{width:100%;padding:12px;background:#f0f9ff;border:1.5px solid #0ea5e9;border-radius:12px;font-size:14px;font-weight:700;color:#0ea5e9;cursor:pointer;font-family:inherit;}
  .btn-join{padding:7px 14px;background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#fff;border:none;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;}
  .link{color:#0ea5e9;cursor:pointer;font-weight:700;}
  .toast{position:fixed;top:max(14px,calc(env(safe-area-inset-top)+70px));left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;padding:10px 18px;border-radius:20px;font-size:13px;font-weight:600;z-index:300;white-space:nowrap;animation:fadeIn .2s;box-shadow:0 4px 20px rgba(0,0,0,.2);}
  .toast-error{background:#ef4444;}
  .leaflet-top, .leaflet-bottom {
    z-index: 500 !important;}
  .leaflet-control-container {z-index: 500 !important;}
  select.inp,select.inp-sm{appearance:none;-webkit-appearance:none;}
  textarea.inp{font-family:inherit;}
  .spinner{width:32px;height:32px;border:3px solid #e2e8f0;border-top-color:#0ea5e9;border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block;}
  .spin-sm{width:12px;height:12px;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block;}
  .fab-feedback{position:fixed;bottom:130px;right:16px;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(245,158,11,.5);z-index:50;}
  @keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
`;
