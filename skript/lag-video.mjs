/**
 * Gjør et råopptak fra telefonen om til filene Videoflate trenger.
 *
 *   node skript/lag-video.mjs <inn.mov> <navn> [valg]
 *
 *   --format 4:5     sideforholdet flaten vises i (beskjæres her, ikke i nettleseren)
 *   --start 0        sekund inn i opptaket klippet starter
 *   --lengde 8       sekunder
 *   --fokus 0.5      hvor beskjæringen legges, 0 = topp/venstre, 1 = bunn/høyre
 *   --plakat <sek>   hvor stillbildet tas fra (standard: samme som --start)
 *   --desktop 1080   bredde på desktop-fila
 *   --mobil 720      bredde på mobil-fila
 *
 * Gir public/video/<navn>-desktop.mp4, <navn>-mobil.mp4 og <navn>-plakat.jpg.
 *
 * Valgene er gjort for at avspillingen skal være lett, ikke bare fila liten:
 * H.264 dekodes i hardware på praktisk talt alle telefoner og PC-er, mens
 * HEVC og AV1 faller til programvare på mange av dem – og det er det som
 * lagger. 30 bilder i sekundet halverer jobben mot iPhonens 60. Lyd fjernes,
 * og faststart legger indeksen først så avspillingen starter før fila er hentet.
 *
 * iPhone filmer i HDR. Uten tonemapping blir fargene grå og utvasket i 8 bit,
 * så HLG/PQ-opptak konverteres til SDR først.
 *
 * ffmpeg er ikke en avhengighet i prosjektet. Pek på en binær med FFMPEG=,
 * for eksempel fra `npm i ffmpeg-static ffprobe-static` i en mappe utenfor.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [inn, navn, ...resten] = process.argv.slice(2);
if (!inn || !navn) {
  console.error("Bruk: node skript/lag-video.mjs <inn> <navn> [--format 4:5] [--start 0] [--lengde 8] [--fokus 0.5]");
  process.exit(1);
}

const valg = { format: "4:5", start: "0", lengde: "8", fokus: "0.5", desktop: "1080", mobil: "720" };
for (let i = 0; i < resten.length; i += 2) valg[resten[i].replace(/^--/, "")] = resten[i + 1];

const ffmpeg = process.env.FFMPEG ?? "ffmpeg";
const ffprobe = process.env.FFPROBE ?? "ffprobe";
const ut = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "video");
mkdirSync(ut, { recursive: true });

const [a, b] = valg.format.split(":").map(Number);
const r = a / b;
const f = Number(valg.fokus);

const overforing = execFileSync(ffprobe, [
  "-v", "error", "-select_streams", "v:0",
  "-show_entries", "stream=color_transfer", "-of", "csv=p=0", inn,
]).toString().trim();
const hdr = ["arib-std-b67", "smpte2084"].includes(overforing);

const tonemap = hdr
  ? "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,"
  : "";
const beskjaer =
  `crop='if(gt(iw/ih,${r}),ih*${r},iw)':'if(gt(iw/ih,${r}),ih,iw/${r})':` +
  `'(iw-ow)*${f}':'(ih-oh)*${f}'`;
const filter = (bredde) => `${tonemap}${beskjaer},scale='min(${bredde},iw)':-2:flags=lanczos,fps=30,format=yuv420p`;

const kjor = (args) => execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

for (const [variant, bredde, crf] of [["desktop", valg.desktop, 23], ["mobil", valg.mobil, 25]]) {
  kjor([
    "-ss", valg.start, "-t", valg.lengde, "-i", inn,
    "-vf", filter(bredde),
    "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
    "-profile:v", "high", "-level", "4.0", "-g", "60",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
    "-movflags", "+faststart", "-an",
    join(ut, `${navn}-${variant}.mp4`),
  ]);
}

// Plakaten er som standard første bilde i klippet, så overgangen til video
// ikke hopper. Starter opptaket i svart, velg et annet sekund med --plakat.
kjor([
  "-ss", valg.plakat ?? valg.start, "-i", inn, "-frames:v", "1",
  "-vf", filter(valg.desktop).replace(",fps=30,format=yuv420p", ""),
  "-q:v", "2", join(ut, `${navn}-plakat.jpg`),
]);

const kb = (fil) => `${Math.round(statSync(join(ut, fil)).size / 1024)} kB`;
console.log(`\n${navn}${hdr ? " (HDR → SDR)" : ""}`);
for (const fil of [`${navn}-desktop.mp4`, `${navn}-mobil.mp4`, `${navn}-plakat.jpg`]) console.log(`  ${fil.padEnd(28)} ${kb(fil)}`);
console.log(`\n  video: { desktop: "/video/${navn}-desktop.mp4", mobil: "/video/${navn}-mobil.mp4", plakat: "/video/${navn}-plakat.jpg" },`);
