import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/PageHero";

type ToolId = "json" | "base64" | "color" | "regex" | "lorem" | "hash" | "jwt" | "css" | "gradient" | "minifier";

interface DevTool {
  id: ToolId;
  name: string;
  description: string;
}

const tools: DevTool[] = [
  { id: "json", name: "JSON Formatter", description: "Format, validate, and minify JSON data" },
  { id: "base64", name: "Base64 Encoder/Decoder", description: "Encode or decode Base64 strings" },
  { id: "color", name: "Color Converter", description: "Convert between HEX, RGB, and HSL color formats" },
  { id: "regex", name: "Regex Tester", description: "Test regular expressions against sample text" },
  { id: "css", name: "CSS Generator", description: "Generate CSS for shadows, borders, and transforms" },
  { id: "gradient", name: "Gradient Generator", description: "Create CSS linear and radial gradients visually" },
  { id: "minifier", name: "CSS/JS Minifier", description: "Minify CSS and JavaScript code" },
  { id: "lorem", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs" },
  { id: "hash", name: "String Hash Generator", description: "Generate simple hash values from text" },
  { id: "jwt", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" title="Copy">
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(''); } catch { setError('Invalid JSON'); setOutput(''); } };
  const minify = () => { try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); } catch { setError('Invalid JSON'); setOutput(''); } };
  return (
    <div className="space-y-3">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON here..." rows={6}
        className="w-full bg-secondary text-foreground rounded-md border border-border p-3 text-sm font-mono resize-y focus:outline-none focus:ring-1 focus:ring-ring" />
      <div className="flex gap-2">
        <button onClick={format} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Format</button>
        <button onClick={minify} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium border border-border hover:bg-accent transition-colors">Minify</button>
      </div>
      {error && <p className="text-sm text-destructive font-mono">{error}</p>}
      {output && (
        <div className="relative">
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          <pre className="text-sm overflow-auto max-h-64">{output}</pre>
        </div>
      )}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const encode = () => { try { setOutput(btoa(input)); } catch { setOutput('Error encoding'); } };
  const decode = () => { try { setOutput(atob(input)); } catch { setOutput('Invalid Base64'); } };
  return (
    <div className="space-y-3">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." rows={4}
        className="w-full bg-secondary text-foreground rounded-md border border-border p-3 text-sm font-mono resize-y focus:outline-none focus:ring-1 focus:ring-ring" />
      <div className="flex gap-2">
        <button onClick={encode} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Encode</button>
        <button onClick={decode} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium border border-border hover:bg-accent transition-colors">Decode</button>
      </div>
      {output && (
        <div className="relative">
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          <pre className="text-sm overflow-auto max-h-40">{output}</pre>
        </div>
      )}
    </div>
  );
}

function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
    return isNaN(r) ? null : { r, g, b };
  };
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else { s = 0; }
    return { h: Math.round(h * 360), s: Math.round((s || 0) * 100), l: Math.round(l * 100) };
  };
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-12 h-12 rounded border border-border cursor-pointer" />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} placeholder="#000000"
          className="bg-secondary text-foreground rounded-md border border-border px-3 py-2 text-sm font-mono w-32 focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>
      {rgb && hsl && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "HEX", value: hex.toUpperCase() },
            { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
          ].map(c => (
            <div key={c.label} className="flex items-center justify-between bg-secondary rounded-md border border-border px-3 py-2">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-mono">{c.label}</span>
                <p className="text-sm font-mono text-foreground">{c.value}</p>
              </div>
              <CopyButton text={c.value} />
            </div>
          ))}
        </div>
      )}
      <div className="h-16 rounded-md border border-border" style={{ backgroundColor: hex }} />
    </div>
  );
}

function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gi');
  const [text, setText] = useState('');
  let matches: RegExpMatchArray[] = [];
  let error = '';
  try { if (pattern) { matches = Array.from(text.matchAll(new RegExp(pattern, flags))); } } catch (e) { error = (e as Error).message; }
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Regex pattern..."
          className="flex-1 bg-secondary text-foreground rounded-md border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring" />
        <input type="text" value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi"
          className="w-16 bg-secondary text-foreground rounded-md border border-border px-3 py-2 text-sm font-mono text-center focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Test string..." rows={4}
        className="w-full bg-secondary text-foreground rounded-md border border-border p-3 text-sm font-mono resize-y focus:outline-none focus:ring-1 focus:ring-ring" />
      {error && <p className="text-sm text-destructive font-mono">{error}</p>}
      {matches.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-mono">{matches.length} match{matches.length !== 1 ? 'es' : ''}</p>
          <div className="flex flex-wrap gap-1.5">
            {matches.map((m, i) => (
              <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono border border-primary/20">{m[0]}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CssGenerator() {
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(4);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [opacity, setOpacity] = useState(25);
  const [borderRadius, setBorderRadius] = useState(8);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#e5e7eb');

  const shadowCSS = `box-shadow: ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')};`;
  const borderCSS = `border: ${borderWidth}px solid ${borderColor};\nborder-radius: ${borderRadius}px;`;
  const fullCSS = `${shadowCSS}\n${borderCSS}`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Box Shadow</h4>
          {[
            { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
            { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
            { label: "Offset X", value: offsetX, set: setOffsetX, min: -50, max: 50 },
            { label: "Offset Y", value: offsetY, set: setOffsetY, min: -50, max: 50 },
            { label: "Opacity %", value: opacity, set: setOpacity, min: 0, max: 100 },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground w-20 shrink-0">{s.label}</label>
              <input type="range" min={s.min} max={s.max} value={s.value} onChange={e => s.set(Number(e.target.value))}
                className="flex-1 accent-primary" />
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">{s.value}</span>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-20 shrink-0">Color</label>
            <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer" />
          </div>

          <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider pt-2">Border</h4>
          {[
            { label: "Radius", value: borderRadius, set: setBorderRadius, min: 0, max: 50 },
            { label: "Width", value: borderWidth, set: setBorderWidth, min: 0, max: 10 },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground w-20 shrink-0">{s.label}</label>
              <input type="range" min={s.min} max={s.max} value={s.value} onChange={e => s.set(Number(e.target.value))}
                className="flex-1 accent-primary" />
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">{s.value}</span>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-20 shrink-0">Color</label>
            <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Preview</h4>
          <div className="flex items-center justify-center h-48 bg-secondary/50 rounded-md border border-border">
            <div
              className="w-32 h-32 bg-card"
              style={{
                boxShadow: `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`,
                border: `${borderWidth}px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
              }}
            />
          </div>
          <div className="relative">
            <div className="absolute top-2 right-2"><CopyButton text={fullCSS} /></div>
            <pre className="text-sm overflow-auto">{fullCSS}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradientGenerator() {
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;
  const css = `background: ${gradient};`;

  return (
    <div className="space-y-4">
      <div className="h-40 rounded-md border border-border" style={{ background: gradient }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-16 shrink-0">Type</label>
            <div className="flex gap-1.5">
              {(['linear', 'radial'] as const).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={cn("px-2.5 py-1 text-xs rounded-md border transition-colors capitalize",
                    type === t ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-muted-foreground border-border hover:bg-accent"
                  )}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-16 shrink-0">Color 1</label>
            <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer" />
            <span className="text-xs font-mono text-muted-foreground">{color1}</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-16 shrink-0">Color 2</label>
            <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-8 h-8 rounded border border-border cursor-pointer" />
            <span className="text-xs font-mono text-muted-foreground">{color2}</span>
          </div>
          {type === 'linear' && (
            <div className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground w-16 shrink-0">Angle</label>
              <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="text-xs font-mono text-muted-foreground w-10 text-right">{angle}°</span>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
          <pre className="text-sm overflow-auto">{css}</pre>
        </div>
      </div>
      {/* Preset gradients */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-mono uppercase">Presets</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {[
            ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'],
            ['#43e97b', '#38f9d7'], ['#fa709a', '#fee140'], ['#a18cd1', '#fbc2eb'],
            ['#fccb90', '#d57eeb'], ['#e0c3fc', '#8ec5fc'], ['#f5576c', '#ff9a9e'],
            ['#667eea', '#43e97b'], ['#ff9a9e', '#fad0c4'], ['#a1c4fd', '#c2e9fb'],
          ].map(([c1, c2], i) => (
            <button key={i} onClick={() => { setColor1(c1); setColor2(c2); }}
              className="h-8 rounded border border-border hover:scale-105 transition-transform"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MinifierTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'css' | 'js'>('css');

  const minifyCSS = (code: string) => {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
  };

  const minifyJS = (code: string) => {
    return code
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
      .trim();
  };

  const doMinify = () => {
    setOutput(mode === 'css' ? minifyCSS(input) : minifyJS(input));
  };

  const saved = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5">
        {(['css', 'js'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={cn("px-2.5 py-1 text-xs rounded-md border transition-colors uppercase font-mono",
              mode === m ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-muted-foreground border-border hover:bg-accent"
            )}>{m}</button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)}
        placeholder={mode === 'css' ? "Paste CSS code here..." : "Paste JavaScript code here..."}
        rows={6}
        className="w-full bg-secondary text-foreground rounded-md border border-border p-3 text-sm font-mono resize-y focus:outline-none focus:ring-1 focus:ring-ring" />
      <button onClick={doMinify} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
        Minify
      </button>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">
              {input.length} → {output.length} chars ({saved}% saved)
            </span>
          </div>
          <div className="relative">
            <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
            <pre className="text-sm overflow-auto max-h-48">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

function LoremGenerator() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');
  const generate = () => {
    const paragraphs = Array.from({ length: count }, () => {
      const len = 40 + Math.floor(Math.random() * 40);
      return Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]).join(' ') + '.';
    });
    setOutput(paragraphs.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('\n\n'));
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm text-muted-foreground">Paragraphs:</label>
        <input type="number" min={1} max={20} value={count} onChange={e => setCount(Number(e.target.value))}
          className="w-20 bg-secondary text-foreground rounded-md border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring" />
        <button onClick={generate} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Generate</button>
      </div>
      {output && (
        <div className="relative">
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          <div className="bg-secondary rounded-md border border-border p-4 text-sm font-serif text-foreground leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">{output}</div>
        </div>
      )}
    </div>
  );
}

function HashGenerator() {
  const [input, setInput] = useState('');
  const simpleHash = (str: string) => { let hash = 0; for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |= 0; } return Math.abs(hash).toString(16).padStart(8, '0'); };
  const djb2 = (str: string) => { let hash = 5381; for (let i = 0; i < str.length; i++) { hash = ((hash << 5) + hash) + str.charCodeAt(i); hash |= 0; } return Math.abs(hash).toString(16).padStart(8, '0'); };
  return (
    <div className="space-y-3">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to hash..."
        className="w-full bg-secondary text-foreground rounded-md border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring" />
      {input && (
        <div className="space-y-2">
          {[
            { label: "Simple Hash", value: simpleHash(input) },
            { label: "DJB2 Hash", value: djb2(input) },
            { label: "Length", value: String(input.length) },
          ].map(h => (
            <div key={h.label} className="flex items-center justify-between bg-secondary rounded-md border border-border px-3 py-2">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-mono">{h.label}</span>
                <p className="text-sm font-mono text-foreground">{h.value}</p>
              </div>
              <CopyButton text={h.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function JwtDecoder() {
  const [token, setToken] = useState('');
  const decode = (t: string) => {
    try {
      const parts = t.split('.');
      if (parts.length !== 3) return null;
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return { header, payload };
    } catch { return null; }
  };
  const decoded = token ? decode(token) : null;
  return (
    <div className="space-y-3">
      <textarea value={token} onChange={e => setToken(e.target.value)} placeholder="Paste JWT token here..." rows={3}
        className="w-full bg-secondary text-foreground rounded-md border border-border p-3 text-sm font-mono resize-y focus:outline-none focus:ring-1 focus:ring-ring break-all" />
      {token && !decoded && <p className="text-sm text-destructive font-mono">Invalid JWT token</p>}
      {decoded && (
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase mb-1">Header</p>
            <div className="relative">
              <div className="absolute top-2 right-2"><CopyButton text={JSON.stringify(decoded.header, null, 2)} /></div>
              <pre className="text-sm overflow-auto max-h-32">{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase mb-1">Payload</p>
            <div className="relative">
              <div className="absolute top-2 right-2"><CopyButton text={JSON.stringify(decoded.payload, null, 2)} /></div>
              <pre className="text-sm overflow-auto max-h-48">{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const toolComponents: Record<ToolId, React.FC> = {
  json: JsonFormatter,
  base64: Base64Tool,
  color: ColorConverter,
  regex: RegexTester,
  css: CssGenerator,
  gradient: GradientGenerator,
  minifier: MinifierTool,
  lorem: LoremGenerator,
  hash: HashGenerator,
  jwt: JwtDecoder,
};

const DevToolsPage = () => {
  const [activeTool, setActiveTool] = useState<ToolId>("json");
  const ActiveComponent = toolComponents[activeTool];
  const active = tools.find(t => t.id === activeTool)!;

   return (
      <div className="space-y-10 animate-fade-in pb-12">
        <PageHero
          icon={Wrench}
          badge="Architectural Toolset"
          description="Technical utility engine for modern engineering workflows."
          theme="blue"
          className="py-4 md:py-5"
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Tool Navigation - More minimalistic */}
          <div className="w-full lg:w-48 shrink-0 lg:sticky lg:top-24">
            <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-3 px-4 py-2.5 text-xs rounded-xl transition-all font-black uppercase tracking-tighter group text-left",
                    activeTool === tool.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                      : "text-slate-400 hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <div className={cn(
                    "w-1 h-1 rounded-full transition-all",
                    activeTool === tool.id ? "bg-white scale-125" : "bg-transparent group-hover:bg-slate-400"
                  )} />
                  {tool.name.replace(" Generator", "").replace(" Formatter", "").replace(" Decoder", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Tool Content */}
          <div className="flex-1 min-w-0">
            <div className="glass-morphism rounded-3xl border border-border/50 p-6 md:p-10 space-y-8 min-h-[500px] shadow-2xl shadow-black/5">
              <div className="space-y-2 border-b border-border/50 pb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black tracking-tighter text-foreground">
                    {active.name}
                  </h2>
                  <Badge variant="outline" className="rounded-full px-4 border-primary/20 text-primary font-black uppercase text-[10px] tracking-tighter">
                    Client Side
                  </Badge>
                </div>
                <p className="text-muted-foreground font-medium">{active.description}</p>
              </div>
              
              <div className="animate-fade-in">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DevToolsPage;
