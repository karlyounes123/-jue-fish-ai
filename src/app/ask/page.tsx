import type { Metadata } from "next";
import StainForm from "@/components/StainForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ask Jue Fish AI — Stain Removal Expert",
  description: "Upload a photo of your stain and get expert removal instructions in seconds.",
};

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || "https://juefishcleaning.com";

export default function AskPage() {
  return (
    <div style={{background:"#ffffff", color:"#1a1a2e", fontFamily:"'DM Sans', sans-serif", minHeight:"auto"}}>

      {/* ── HERO — purple gradient top ── */}
      <section style={{
        background:"linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)",
        padding:"56px 24px 64px",
        textAlign:"center",
        position:"relative",
        overflow:"hidden"
      }}>
        {/* Decorative circles */}
        <div style={{position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none"}} />
        <div style={{position:"absolute", bottom:-60, left:-60, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none"}} />

        <div style={{maxWidth:540, margin:"0 auto", position:"relative"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:100, padding:"6px 16px", marginBottom:24}}>
            <span style={{width:6, height:6, borderRadius:"50%", background:"#fff", display:"inline-block", opacity:0.9}} />
            <span style={{fontSize:10, fontWeight:700, letterSpacing:"0.16em", color:"rgba(255,255,255,0.9)", textTransform:"uppercase" as const}}>AI-Powered · Free to Use</span>
          </div>

          <h1 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(36px,9vw,58px)", fontWeight:700, lineHeight:1.08, color:"#ffffff", marginBottom:16, letterSpacing:"-0.02em"}}>
            Stains Gone.<br />
            <em style={{fontStyle:"italic", color:"rgba(255,255,255,0.8)"}}>Life Moves On.</em>
          </h1>

          <p style={{fontSize:15, color:"rgba(255,255,255,0.7)", lineHeight:1.7, marginBottom:36, maxWidth:420, margin:"0 auto 36px"}}>
            Upload a photo of your stain. Our AI analyses the fabric, identifies the stain type, and gives you a step-by-step removal plan.
          </p>

          {/* Stats */}
          <div style={{display:"inline-flex", gap:0, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:14, overflow:"hidden", marginBottom:32}}>
            {[
              {num:"30+", label:"Stain types"},
              {num:"~10s", label:"Analysis time"},
              {num:"100%", label:"Free"},
            ].map((s, i) => (
              <div key={s.label} style={{padding:"14px 20px", textAlign:"center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none"}}>
                <div style={{fontSize:20, fontWeight:800, color:"#ffffff", fontFamily:"'Playfair Display', serif"}}>{s.num}</div>
                <div style={{fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" as const, marginTop:3}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Trust row */}
          <div style={{display:"flex", flexWrap:"wrap" as const, justifyContent:"center", gap:8}}>
            {["🔒 Photos never saved", "✦ AI-powered results", "🌍 Trusted across GCC"].map(t => (
              <span key={t} style={{fontSize:12, padding:"5px 14px", borderRadius:100, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.8)", fontWeight:500}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAVE DIVIDER ── */}
      <div style={{background:"linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)", marginBottom:-2}}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"block", width:"100%"}}>
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* ── PRIVACY ── */}
      <section style={{background:"#ffffff", padding:"20px 20px 0"}}>
        <div style={{maxWidth:560, margin:"0 auto", background:"#f5f0ff", border:"1px solid #e9d5ff", borderRadius:14, padding:"16px 20px", display:"flex", gap:12, alignItems:"flex-start"}}>
          <span style={{fontSize:20, flexShrink:0}}>🔒</span>
          <p style={{fontSize:13, lineHeight:1.65, color:"#4b5563"}}>
            <strong style={{color:"#6d28d9"}}>100% Private & Secure. </strong>
            Your photo is analysed instantly and permanently deleted the moment your results are ready. Never stored, never shared.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{background:"#ffffff", padding:"40px 20px 32px"}}>
        <div style={{maxWidth:560, margin:"0 auto"}}>
          <p style={{fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"#7c3aed", textAlign:"center", marginBottom:20}}>How it works</p>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12}}>
            {[
              {icon:"📷", step:"01", title:"Upload photo", desc:"Take a clear photo of the stain"},
              {icon:"🧠", step:"02", title:"AI analyses", desc:"We identify stain type & fabric"},
              {icon:"✨", step:"03", title:"Get steps", desc:"Personalised removal instructions"},
            ].map((item) => (
              <div key={item.step} style={{textAlign:"center", padding:"20px 12px", background:"#fafafa", borderRadius:16, border:"1px solid #f0e6ff"}}>
                <div style={{fontSize:28, marginBottom:8}}>{item.icon}</div>
                <div style={{fontSize:10, fontWeight:700, color:"#7c3aed", letterSpacing:"0.1em", marginBottom:6}}>{item.step}</div>
                <div style={{fontSize:12, fontWeight:700, color:"#1a1a2e", marginBottom:4}}>{item.title}</div>
                <div style={{fontSize:11, color:"#9ca3af", lineHeight:1.5}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{background:"#ffffff", padding:"32px 20px 48px", maxWidth:600, margin:"0 auto"}}>
        <div style={{textAlign:"center", marginBottom:28}}>
          <h2 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(26px,6vw,36px)", fontWeight:700, color:"#1a1a2e", lineHeight:1.2, marginBottom:8}}>
            What&apos;s your stain?
          </h2>
          <p style={{fontSize:13, color:"#9ca3af", lineHeight:1.6}}>Fill in the details below and let the AI do the work.</p>
        </div>
        <div style={{border:"2px solid #f0e6ff", borderRadius:20, padding:"24px 20px", background:"#fafafa"}}>
          <StainForm />
        </div>
      </section>

      {/* ── STAIN TYPES ── */}
      <section style={{background:"#f5f0ff", padding:"40px 20px", borderTop:"1px solid #e9d5ff", borderBottom:"1px solid #e9d5ff"}}>
        <div style={{maxWidth:560, margin:"0 auto", textAlign:"center"}}>
          <p style={{fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"#7c3aed", marginBottom:16}}>Works on all stain types</p>
          <div style={{display:"flex", flexWrap:"wrap" as const, justifyContent:"center", gap:8}}>
            {["🍷 Wine","☕ Coffee","🩸 Blood","🌿 Grass","🐾 Pet stains","🍝 Sauce","🫒 Oil","💄 Makeup","🖊️ Ink","🌧️ Mud"].map(t => (
              <span key={t} style={{fontSize:12, padding:"6px 14px", borderRadius:100, background:"white", border:"1px solid #ddd6fe", color:"#6d28d9", fontWeight:500}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{background:"#ffffff", padding:"48px 20px"}}>
        <div style={{maxWidth:540, margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:28}}>
            <p style={{fontSize:11, fontWeight:700, letterSpacing:"0.14em", color:"#7c3aed", textTransform:"uppercase" as const, marginBottom:10}}>Customer stories</p>
            <h2 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:26, fontWeight:700, color:"#1a1a2e", fontStyle:"italic"}}>It actually works</h2>
          </div>
          <div style={{display:"flex", flexDirection:"column" as const, gap:12}}>
            {[
              {stars:5, text:"The AI identified my wine stain instantly and the steps worked perfectly. My white dress is saved!", name:"Sara K.", location:"Dubai"},
              {stars:5, text:"Shocked by how accurate this was. It knew it was coffee on polyester. Steps worked first try.", name:"Lina M.", location:"Beirut"},
              {stars:5, text:"It warned me about my silk fabric before I made it worse. This tool saved my favourite blouse.", name:"Nour A.", location:"Kuwait"},
            ].map((r, i) => (
              <div key={i} style={{background:"#fafafa", border:"1px solid #f0e6ff", borderRadius:14, padding:"20px"}}>
                <div style={{color:"#7c3aed", fontSize:14, marginBottom:10}}>{"★".repeat(r.stars)}</div>
                <p style={{fontSize:13, lineHeight:1.75, color:"#4b5563", fontStyle:"italic", marginBottom:10}}>&ldquo;{r.text}&rdquo;</p>
                <p style={{fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"#9ca3af"}}>— {r.name}, {r.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background:"linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
        padding:"52px 24px", textAlign:"center",
        position:"relative", overflow:"hidden"
      }}>
        <div style={{position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none"}} />
        <div style={{maxWidth:440, margin:"0 auto", position:"relative"}}>
          <Image src="/logo end.png" alt="Jue Fish" width={140} height={34} style={{objectFit:"contain", filter:"brightness(0) invert(1)", marginBottom:18}} />
          <p style={{fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.7, marginBottom:28}}>
            Enzyme-based formula. Colour-safe.<br />Works on 30+ stain types.
          </p>
          <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex", alignItems:"center", gap:8, background:"#ffffff", color:"#6d28d9", padding:"15px 36px", borderRadius:12, fontWeight:800, fontSize:14, textDecoration:"none", letterSpacing:"0.02em"}}>
            Shop Jue Fish →
          </a>
          <p style={{fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:14}}>Free shipping · Trusted across GCC</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{padding:"18px 24px", textAlign:"center", background:"#ffffff", borderTop:"1px solid #f0e6ff"}}>
        <p style={{fontSize:11, color:"#d1d5db"}}>
          © {new Date().getFullYear()} Jue Fish · Results may vary · Always patch test first
        </p>
      </div>

    </div>
  );
}
