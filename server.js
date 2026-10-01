import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const rootPrefix=root.endsWith(path.sep)?root:root+path.sep;
const port = Number(process.env.PORT || 3000);
const envPath=path.join(root,'.env');
if(fs.existsSync(envPath)) for(const line of fs.readFileSync(envPath,'utf8').split(/\r?\n/)){const m=line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^(['"])(.*)\1$/,'$2');}
const key = process.env.NIM_API_KEY;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json'};
const server = http.createServer(async (req,res) => {
  if (req.url === '/api/chat' && req.method === 'POST') {
    if (!key) {res.writeHead(503, {'content-type':'application/json'}); return res.end(JSON.stringify({error:'NIM_API_KEY is not configured. Put it in .env and restart the server.'}));}
    let raw=''; for await (const chunk of req) {raw+=chunk; if(raw.length>1_000_000){res.writeHead(413);return res.end();}}
    try {
      const {messages} = JSON.parse(raw);
      if(!Array.isArray(messages) || !messages.length || messages.some(m=>!['user','assistant','system'].includes(m.role)||typeof m.content!=='string')) throw new Error('Invalid messages payload');
      const upstream=await fetch('https://integrate.api.nvidia.com/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${key}`},body:JSON.stringify({model:process.env.NIM_MODEL||'meta/llama-3.1-8b-instruct',messages,max_tokens:1200})});
      const data=await upstream.json(); if(!upstream.ok) throw Object.assign(new Error(data.error?.message||`NIM error ${upstream.status}`),{status:upstream.status});
      res.writeHead(200,{'content-type':'application/json'}); return res.end(JSON.stringify({reply:data.choices?.[0]?.message?.content||''}));
    } catch(e) {res.writeHead(e.status||(e instanceof SyntaxError?400:502),{'content-type':'application/json'});return res.end(JSON.stringify({error:e.message||'Request failed'}));}
  }
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root, pathname==='/'?'index.html':'.'+pathname);
  if(!file.startsWith(rootPrefix)){res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});res.end(data);});
});
server.listen(port,'127.0.0.1',()=>console.log(`Serving http://localhost:${port}`));
