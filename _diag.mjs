import { chromium } from "playwright";
import fs from "node:fs";

const SHOT_DIR = "C:\\Users\\muniz\\AppData\\Local\\Temp\\claude\\e--Workspace-Pessoal-pousada-dona-marta\\1f48207a-b7b2-4baf-9355-9a0a0e33a54c\\scratchpad\\diag";
fs.mkdirSync(SHOT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dp = await desktop.newPage();
  const dLogs = [];
  dp.on("console", (m) => dLogs.push(`[${m.type()}] ${m.text()}`));
  dp.on("pageerror", (e) => dLogs.push(`[pageerror] ${e.message}`));
  dp.on("requestfailed", (r) => dLogs.push(`[requestfailed] ${r.url()} - ${r.failure()?.errorText}`));

  for (const [name, url] of [
    ["home", "http://localhost:3000/pt"],
    ["acomodacoes", "http://localhost:3000/pt/acomodacoes"],
    ["localizacao", "http://localhost:3000/pt/localizacao"],
    ["reservar", "http://localhost:3000/pt/reservar"],
    ["contato", "http://localhost:3000/pt/contato"],
  ]) {
    await dp.goto(url, { waitUntil: "networkidle" });
    await dp.waitForTimeout(1200);
    await dp.screenshot({ path: `${SHOT_DIR}/desktop-${name}-full.png`, fullPage: true });
  }

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mobile.newPage();
  mp.on("console", (m) => dLogs.push(`[mobile][${m.type()}] ${m.text()}`));
  mp.on("pageerror", (e) => dLogs.push(`[mobile][pageerror] ${e.message}`));
  mp.on("requestfailed", (r) => dLogs.push(`[mobile][requestfailed] ${r.url()} - ${r.failure()?.errorText}`));

  for (const [name, url] of [
    ["home", "http://localhost:3000/pt"],
    ["acomodacoes", "http://localhost:3000/pt/acomodacoes"],
    ["reservar", "http://localhost:3000/pt/reservar"],
  ]) {
    await mp.goto(url, { waitUntil: "networkidle" });
    await mp.waitForTimeout(1200);
    await mp.screenshot({ path: `${SHOT_DIR}/mobile-${name}-full.png`, fullPage: true });
  }

  await browser.close();
  console.log("=== LOGS ===");
  console.log(dLogs.length ? dLogs.join("\n") : "(none)");
})();
