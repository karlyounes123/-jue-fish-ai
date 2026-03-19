import type { Metadata } from "next";
import StainForm from "@/components/StainForm";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ask Jue Fish AI — Free Stain Removal Advisor",
  description: "Upload a photo of your stain and get expert removal instructions in seconds.",
};

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || "https://juefishcleaning.com";

export default function AskPage() {
  return (
    <div style={{minHeight:"100vh", background:"#f7f4ee", fontFamily:"var(--font-body)"}}>
      {/* Nav */}
      
      {/* Hero */}
      <div style={{maxWidth:600, margin:"0 auto", padding:"40px 20px 20px", textAlign:"center"}}>
        <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"#ede9fe", border:"1px solid #ddd6fe", borderRadius:100, padding:"6px 14px", marginBottom:16}}>
          <span style={{width:7, height:7, borderRadius:"50%", background:"#7c3aed", display:"inline-block"}} />
          <span style={{fontSize:11, fontWeight:700, color:"#6d28d9", letterSpacing:"0.1em", textTransform:"uppercase"}}>AI-Powered · Free</span>
        </div>
        <h1 style={{fontFamily:"var(--font-display)", fontSize:"clamp(32px,8vw,52px)", fontWeight:700, color:"#0f1a12", lineHeight:1.1, marginBottom:12}}>
          Ask Jue Fish <em style={{color:"#7c3aed", fontStyle:"italic"}}>AI</em>
        </h1>
        <p style={{fontSize:15, color:"#6b7a6d", lineHeight:1.6, marginBottom:20}}>
          Upload a stain photo, answer 2 quick questions, get personalised step-by-step removal instructions.
        </p>
        <div style={{display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:8}}>
          {["🍷 Wine","☕ Coffee","🩸 Blood","🌿 Grass","🐾 Pet stains"].map(t => (
            <span key={t} style={{fontSize:12, padding:"5px 12px", borderRadius:100, background:"white", border:"1px solid #d4d0c8", color:"#0f1a12"}}>{t}</span>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{maxWidth:560, margin:"0 auto", padding:"0 16px 40px"}}>
        <StainForm />
      </div>

      {/* Footer */}
      <div style={{borderTop:"1px solid #d4d0c8", padding:"16px 20px", textAlign:"center"}}>
        <p style={{fontSize:11, color:"#9ca3af"}}>© {new Date().getFullYear()} Jue Fish · Results may vary · Always patch test first</p>
      </div>
    </div>
  );
}
