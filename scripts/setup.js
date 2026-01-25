#!/usr/bin/env node
import { execSync, spawn } from "child_process"
import fs from "fs"

/* -------------------------
   Helpers
------------------------- */
function run(cmd, cwd) {
  execSync(cmd, {
    stdio: "inherit",
    cwd
  })
}

function runAsync(cmd, args, cwd) {
  const child = spawn(cmd, args, {
    cwd,
    stdio: "inherit",
    shell: true
  })

  child.on("error", err => {
    console.error(`❌ Failed to start ${cmd}`, err)
  })
}

/* -------------------------
   Node version check
------------------------- */
const nodeMajor = Number(process.versions.node.split(".")[0])
if (nodeMajor < 18) {
  console.error(
    `❌ Node.js 18+ required. You are using ${process.versions.node}`
  )
  process.exit(1)
}

/* -------------------------
   Start setup
------------------------- */
console.log("\n🚀 Setting up Spendly...\n")

/* -------------------------
   Backend
------------------------- */
console.log("📦 Installing backend dependencies...")
run("npm install", "backend")

if (!fs.existsSync("backend/.env")) {
  if (fs.existsSync("backend/.env.example")) {
    console.log("🔐 Creating backend .env file...")
    fs.copyFileSync(
      "backend/.env.example",
      "backend/.env"
    )
  } else {
    console.warn(
      "⚠️ backend/.env.example not found — skipping env setup"
    )
  }
}

/* Prisma (optional) */
if (fs.existsSync("backend/prisma")) {
  console.log("🗄️ Running database migrations...")
  try {
    run("npx prisma migrate dev", "backend")
  } catch {
    console.warn(
      "⚠️ Prisma migration failed. You may need to configure DATABASE_URL."
    )
  }
}

/* -------------------------
   Frontend
------------------------- */
console.log("\n📦 Installing frontend dependencies...")
run("npm install", "frontend")

if (!fs.existsSync("frontend/.env") && fs.existsSync("frontend/.env.example")) {
  console.log("🌐 Creating frontend .env file...")
  fs.copyFileSync(
    "frontend/.env.example",
    "frontend/.env"
  )
}

/* -------------------------
   Start servers
------------------------- */
console.log("\n🔥 Starting Spendly (frontend + backend)...\n")

runAsync("npm", ["run", "dev"], "backend")
runAsync("npm", ["run", "dev"], "frontend")

console.log(`
✅ Spendly setup complete!

🌐 Frontend: http://localhost:5173
⚙️ Backend:  http://localhost:3000 (or configured port)

ℹ️ Press Ctrl + C to stop both servers.
`)
