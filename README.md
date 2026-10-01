# working figma — Proyek Figma Kel Adit

Localhost web prototype built from the original Figma design exports, following
`assets/Layout guide.md`.

## Run

1. Install Node.js if not already installed.
2. Optional (AI chat only): copy `.env.example` to `.env` and put your NVIDIA NIM
   API key in it as `NIM_API_KEY`. The committed `.env` holds a short-lived demo key —
   see "For new users" below before relying on it. Never put a long-lived key in a
   public repo.
3. Run `Start Pathfinder.bat`, or open a terminal in this folder and run `npm start`.
4. Open `http://localhost:3000`.

## For new users (AI key setup)

The committed `.env` contains a demo key that **expires after a few days**. To keep
the AI consultant working, use your own key:

1. Get a free NVIDIA NIM key at https://build.nvidia.com (NVIDIA account required).
2. Put it in `.env` as `NIM_API_KEY=nvapi-...` (never commit real keys to a public repo).
3. Model availability is **account-specific** — a model listed by `/v1/models` can still
   return `404 "Not found for account"`, and models reach end-of-life (`410 Gone`).
   Find one that answers:

   ```
   curl -s https://integrate.api.nvidia.com/v1/models -H "Authorization: Bearer $KEY"
   curl -s https://integrate.api.nvidia.com/v1/chat/completions \
     -H "Content-Type: application/json" -H "Authorization: Bearer $KEY" \
     -d '{"model":"<candidate>","messages":[{"role":"user","content":"hi"}],"max_tokens":10}'
   ```

4. Set the working id in `.env` as `NIM_MODEL=<id>` and restart the server.
   The proxy surfaces NIM errors inline in the chat, including the failing model id.

Verified working models for the demo account: `google/diffusiongemma-26b-a4b-it`,
`nvidia/nemotron-3-ultra-550b-a55b`.

## Routes (from assets/Layout guide.md)

1. `login -> login 1 -> login 2 -> home`
2. `home -> Tes Potensi / Potensi Diri -> potential test -> potential results`
3. `home -> career path -> each faculty button -> its detail page (back returns to career path)`
4. `home -> Data Saya / Akun -> settings`
5. `home -> Konsultasi AI / Konsultasi -> AI consultant chat`
6. Bottom navigation on every screen: Beranda -> home, Potensi Diri -> potential test,
   Konsultasi -> AI consultant, Akun -> settings.

Screens are the original Figma exports from `assets/`; transparent hotspots sit over
the designed buttons. Add `?debug` to the URL to see hotspot outlines.

## AI consultant chat

The chat screen is rebuilt in HTML (typed input, send button, rendered replies).
Messages go to `POST /api/chat` in `server.js`, which proxies server-side to
`https://integrate.api.nvidia.com/v1/chat/completions` — the API key never reaches
the browser. Without `NIM_API_KEY` the proxy returns a clear error and the chat UI
shows it inline. Conversation history persists in browser localStorage.

Not wired (no destination defined in the guide): settings menu rows
(Edit Profil, Riwayat Tes, Pengaturan Notifikasi, Bantuan & FAQ, Kebijakan Privasi,
Tentang Futurely), the home hero "Mulai sekarang" quiz, and "Lihat semua".
Log Out goes to the login screen.

## Figma source

https://www.figma.com/design/9oum6c7NOh3aF6HLzMl1AQ/Proyek-Figma-Kel-Adit
