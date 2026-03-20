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
    <div style={{background:"#0a0a0a", color:"#f5f0e8", fontFamily:"'DM Sans', sans-serif", minHeight:"auto"}}>

      {/* HERO */}
      <section style={{
        background:"linear-gradient(180deg, #0a0a0a 0%, #111008 100%)",
        padding:"64px 24px 56px",
        textAlign:"center",
        position:"relative",
        overflow:"hidden",
        borderBottom:"1px solid rgba(212,175,55,0.15)"
      }}>
        <div style={{
          position:"absolute", top:"-60px", left:"50%", transform:"translateX(-50%)",
          width:"400px", height:"200px",
          background:"radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)",
          pointerEvents:"none"
        }} />
        <div style={{maxWidth:540, margin:"0 auto", position:"relative"}}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            border:"1px solid rgba(212,175,55,0.4)",
            borderRadius:100, padding:"7px 18px", marginBottom:28
          }}>
            <span style={{width:5, height:5, borderRadius:"50%", background:"#d4af37", display:"inline-block"}} />
            <span style={{fontSize:10, fontWeight:700, letterSpacing:"0.18em", color:"#d4af37", textTransform:"uppercase" as const}}>Jue Fish AI Technology</span>
            <span style={{width:5, height:5, borderRadius:"50%", background:"#d4af37", display:"inline-block"}} />
          </div>
          <h1 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(38px,9vw,62px)", fontWeight:700, lineHeight:1.05, marginBottom:18, letterSpacing:"-0.02em"}}>
            Remove Any Stain.<br />
            <em style={{color:"#d4af37", fontStyle:"italic"}}>Effortlessly.</em>
          </h1>
          <p style={{fontSize:15, color:"rgba(245,240,232,0.5)", lineHeight:1.75, marginBottom:40, maxWidth:420, margin:"0 auto 40px"}}>
            Upload a photo of your stain. Our AI identifies it, assesses your fabric, and gives you a personalised removal plan in seconds.
          </p>
          <div style={{display:"flex", justifyContent:"center", gap:0, marginBottom:40, borderTop:"1px solid rgba(212,175,55,0.15)", borderBottom:"1px solid rgba(212,175,55,0.15)", padding:"20px 0"}}>
            {[
              {num:"30+", label:"Stain Types"},
              {num:"~10s", label:"Analysis"},
              {num:"100%", label:"Free"},
              {num:"24/7", label:"Available"},
            ].map((s, i) => (
              <div key={s.label} style={{flex:1, textAlign:"center", borderRight: i < 3 ? "1px solid rgba(212,175,55,0.15)" : "none", padding:"0 12px"}}>
                <div style={{fontSize:22, fontWeight:700, fontFamily:"'Playfair Display', serif", color:"#d4af37"}}>{s.num}</div>
                <div style={{fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"rgba(245,240,232,0.35)", marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex", flexWrap:"wrap" as const, justifyContent:"center", gap:10}}>
            {["🔒 Photos never saved", "✦ AI-powered accuracy", "🌍 Ships to GCC"].map(t => (
              <span key={t} style={{fontSize:11, padding:"5px 14px", borderRadius:100, background:"rgba(212,175,55,0.08)", border:"1px solid rgba(212,175,55,0.2)", color:"rgba(245,240,232,0.55)", fontWeight:500}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div style={{height:1, background:"linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)"}} />

      {/* PRIVACY */}
      <section style={{padding:"24px", background:"#0d0d0d"}}>
        <div style={{maxWidth:540, margin:"0 auto", background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.15)", borderRadius:14, padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start"}}>
          <span style={{fontSize:20, flexShrink:0, marginTop:2}}>🔒</span>
          <p style={{fontSize:13, lineHeight:1.65, color:"rgba(245,240,232,0.55)"}}>
            <strong style={{color:"#d4af37", fontWeight:700}}>100% Private & Secure. </strong>
            Your photo is analysed instantly and permanently deleted the moment results are ready. Never stored, never shared.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={{padding:"40px 20px 48px", maxWidth:600, margin:"0 auto"}}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <p style={{fontSize:11, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:"#d4af37", marginBottom:12}}>
            Stain Analysis Tool
          </p>
          <h2 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(26px,6vw,36px)", fontWeight:700, color:"#f5f0e8", lineHeight:1.2, marginBottom:10}}>
            What&apos;s the stain?
          </h2>
          <p style={{fontSize:13, color:"rgba(245,240,232,0.4)", lineHeight:1.6}}>
            Upload a photo, select your fabric and we&apos;ll handle the rest.
          </p>
        </div>
        <div style={{border:"1px solid rgba(212,175,55,0.2)", borderRadius:20, padding:"28px 20px", background:"rgba(255,255,255,0.02)"}}>
          <StainForm />
        </div>
      </section>

      <div style={{height:1, background:"linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)"}} />

      {/* REVIEWS */}
      <section style={{background:"#0d0d0d", padding:"48px 20px"}}>
        <div style={{maxWidth:540, margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:32}}>
            <p style={{fontSize:11, fontWeight:700, letterSpacing:"0.16em", color:"#d4af37", textTransform:"uppercase" as const, marginBottom:10}}>Trusted by customers</p>
            <h2 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:26, fontWeight:700, fontStyle:"italic", color:"#f5f0e8"}}>Real results, real stories</h2>
          </div>
          <div style={{display:"flex", flexDirection:"column" as const, gap:12}}>
            {[
              {stars:5, text:"The AI identified my wine stain instantly and the steps worked perfectly. My dress looked brand new.", name:"Sara K.", location:"Dubai"},
              {stars:5, text:"I was skeptical but it actually knew it was a coffee stain on polyester. Exact steps, worked first try.", name:"Lina M.", location:"Beirut"},
              {stars:5, text:"Warned me about my silk fabric before I made it worse. This tool saved my favourite blouse.", name:"Nour A.", location:"Kuwait"},
            ].map((r, i) => (
              <div key={i} style={{background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.12)", borderRadius:14, padding:"20px"}}>
                <div style={{color:"#d4af37", fontSize:14, marginBottom:10, letterSpacing:2}}>{"★".repeat(r.stars)}</div>
                <p style={{fontSize:13, lineHeight:1.75, color:"rgba(245,240,232,0.65)", fontStyle:"italic", marginBottom:12}}>&ldquo;{r.text}&rdquo;</p>
                <p style={{fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:"rgba(212,175,55,0.5)"}}>— {r.name}, {r.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{height:1, background:"linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)"}} />

      {/* CTA */}
      <section style={{background:"linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)", padding:"52px 24px", textAlign:"center"}}>
        <div style={{maxWidth:440, margin:"0 auto"}}>
          <Image src="/logo end.png" alt="Jue Fish" width={140} height={34} style={{objectFit:"contain", filter:"brightness(0) invert(1)", marginBottom:20, opacity:0.9}} />
          <div style={{width:40, height:1, background:"linear-gradient(90deg, transparent, #d4af37, transparent)", margin:"0 auto 20px"}} />
          <p style={{fontSize:14, color:"rgba(245,240,232,0.45)", lineHeight:1.7, marginBottom:28}}>
            Enzyme-based formula. Colour-safe.<br />Works on 30+ stain types.
          </p>
          <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex", alignItems:"center", gap:10, background:"linear-gradient(135deg, #d4af37 0%, #b8962e 100%)", color:"#0a0a0a", padding:"15px 36px", borderRadius:12, fontWeight:700, fontSize:14, textDecoration:"none", letterSpacing:"0.04em"}}>
            Shop Jue Fish <span style={{fontSize:16}}>→</span>
          </a>
          <p style={{fontSize:11, color:"rgba(245,240,232,0.2)", marginTop:14}}>Free shipping available · Trusted across GCC</p>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{padding:"18px 24px", textAlign:"center", borderTop:"1px solid rgba(212,175,55,0.1)"}}>
        <p style={{fontSize:11, color:"rgba(245,240,232,0.2)", letterSpacing:"0.04em"}}>
          © {new Date().getFullYear()} Jue Fish · Results may vary · Always patch test delicate fabrics first
        </p>
      </div>

    </div>
  );
}
