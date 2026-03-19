import type { Metadata } from "next";
import StainForm from "@/components/StainForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ask Jue Fish AI — Free Stain Removal Advisor",
  description: "Upload a photo of your stain and get expert removal instructions in seconds.",
};

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || "https://juefishcleaning.com";

export default function AskPage() {
  return (
    <div style={{minHeight:"100vh", background:"#f7f4ee", fontFamily:"'DM Sans', sans-serif", color:"#0f1a12"}}>

      <section style={{background:"#0f1a12", color:"#f7f4ee", padding:"60px 24px 50px", textAlign:"center"}}>
        <div style={{maxWidth:520, margin:"0 auto"}}>
          <div style={{display:"inline-block", border:"1px solid rgba(255,255,255,0.2)", borderRadius:100, padding:"6px 18px", fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" as const, marginBottom:24, color:"rgba(255,255,255,0.7)"}}>
            • JUE FISH AI TECHNOLOGY •
          </div>
          <h1 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(36px,9vw,56px)", fontWeight:700, lineHeight:1.1, marginBottom:16}}>
            Your Personal<br />
            <em style={{fontStyle:"italic", color:"#a78bfa"}}>Stain Expert</em>
          </h1>
          <p style={{fontSize:15, color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:36}}>
            Powered by artificial intelligence, made for your fabrics
          </p>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:32}}>
            {[
              {num:"30+", label:"Stain Types"},
              {num:"4", label:"Questions"},
              {num:"~10s", label:"Analysis"},
              {num:"100%", label:"Free"},
            ].map((s) => (
              <div key={s.label} style={{border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"14px 8px"}}>
                <div style={{fontSize:20, fontWeight:700, fontFamily:"'Playfair Display', serif"}}>{s.num}</div>
                <div style={{fontSize:10, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.45)", marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex", flexWrap:"wrap" as const, justifyContent:"center", gap:16, fontSize:13, color:"rgba(255,255,255,0.5)"}}>
            <span>🔒 Photos never saved</span>
            <span>✨ AI-powered accuracy</span>
            <span>🌍 Trusted by Jue Fish customers</span>
          </div>
        </div>
      </section>

      <section style={{background:"#f0ede6", padding:"20px 24px"}}>
        <div style={{maxWidth:520, margin:"0 auto", background:"white", borderRadius:14, padding:"16px 20px", display:"flex", gap:12, alignItems:"flex-start", border:"1px solid #e5e0d8"}}>
          <span style={{fontSize:22, flexShrink:0}}>🔒</span>
          <p style={{fontSize:13, lineHeight:1.6, color:"#374151"}}>
            <strong style={{color:"#7c3aed"}}>100% Private & Secure.</strong> Your photo is analysed instantly by AI and never stored, saved, or shared. It is permanently deleted the moment your results are ready.
          </p>
        </div>
      </section>

      <section style={{padding:"32px 20px", maxWidth:580, margin:"0 auto"}}>
        <div style={{textAlign:"center", marginBottom:24}}>
          <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"#ede9fe", border:"1px solid #ddd6fe", borderRadius:100, padding:"6px 14px", marginBottom:14}}>
            <span style={{width:7, height:7, borderRadius:"50%", background:"#7c3aed", display:"inline-block"}} />
            <span style={{fontSize:11, fontWeight:700, color:"#6d28d9", letterSpacing:"0.1em", textTransform:"uppercase" as const}}>AI-Powered · Free</span>
          </div>
          <h2 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(28px,7vw,40px)", fontWeight:700, lineHeight:1.15, marginBottom:10}}>
            What&apos;s the stain?
          </h2>
          <p style={{fontSize:14, color:"#6b7a6d", lineHeight:1.6}}>
            Upload a photo, answer 2 questions, get step-by-step removal instructions.
          </p>
        </div>
        <StainForm />
      </section>

      <section style={{background:"#f0ede6", padding:"40px 20px"}}>
        <div style={{maxWidth:520, margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Playfair Display', Georgia, serif", fontSize:26, fontWeight:700, textAlign:"center", marginBottom:24, fontStyle:"italic"}}>
            What our customers are saying
          </h2>
          <div style={{display:"flex", flexDirection:"column" as const, gap:14}}>
            {[
              {stars:5, text:"I had no idea the stain could come out — the AI identified it immediately and gave me exact steps. My white shirt is saved!", name:"Sara K.", location:"Dubai"},
              {stars:5, text:"Honestly shocked by how accurate this was. It detected an old coffee stain and suggested exactly the right treatment. 10/10.", name:"Lina M.", location:"Beirut"},
              {stars:5, text:"I was nervous about my silk blouse but the AI warned me about delicate fabrics and gave me a gentle method. Worked perfectly.", name:"Nour A.", location:"Kuwait"},
            ].map((r, i) => (
              <div key={i} style={{background:"white", borderRadius:14, padding:"18px 20px", border:"1px solid #e5e0d8"}}>
                <div style={{color:"#7c3aed", fontSize:16, marginBottom:8}}>{"★".repeat(r.stars)}</div>
                <p style={{fontSize:13, lineHeight:1.7, color:"#374151", fontStyle:"italic", marginBottom:10}}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <p style={{fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const, color:"#9ca3af"}}>
                  — {r.name}, {r.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:"#0f1a12", padding:"40px 24px", textAlign:"center"}}>
        <div style={{maxWidth:480, margin:"0 auto"}}>
          <Image src="/logo end.png" alt="Jue Fish" width={130} height={32} style={{objectFit:"contain", filter:"brightness(0) invert(1)", marginBottom:16}} />
          <p style={{fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:20}}>
            Enzyme-based. Colour-safe. Works on 30+ stain types.
          </p>
          <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block", background:"#7c3aed", color:"white", padding:"14px 32px", borderRadius:12, fontWeight:700, fontSize:15, textDecoration:"none"}}>
            Shop Jue Fish →
          </a>
        </div>
      </section>

      <div style={{padding:"16px 20px", textAlign:"center", borderTop:"1px solid #d4d0c8"}}>
        <p style={{fontSize:11, color:"#9ca3af"}}>© {new Date().getFullYear()} Jue Fish · Results may vary · Always patch test first</p>
      </div>

    </div>
  );
}
