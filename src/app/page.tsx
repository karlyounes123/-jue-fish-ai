// ============================================================
// src/app/page.tsx — Redirect root to /ask
// ============================================================

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/ask");
}
