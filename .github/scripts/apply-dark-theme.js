const fs = require("fs");
const path = require("path");

const svgPath = path.resolve(process.cwd(), "metrics.plugin.isocalendar.fullyear.svg");

if (!fs.existsSync(svgPath)) {
  console.error(`Error: File not found: ${svgPath}`);
  process.exit(1);
}

let content = fs.readFileSync(svgPath, "utf8");

// Convert cube colors to dark theme palette
content = content.replace(/fill="#ebedf0"/g, 'fill="#1b222d"');
content = content.replace(/fill="#9be9a8"/g, 'fill="#0e4429"');
content = content.replace(/fill="#40c463"/g, 'fill="#006d32"');
content = content.replace(/fill="#30a14e"/g, 'fill="#26a641"');
content = content.replace(/fill="#216e39"/g, 'fill="#39d353"');

// Replace main <style>...</style> block with customized dark theme CSS
const style = `<style>@keyframes animation-gauge{0%{stroke-dasharray:0 329}}@keyframes animation-rainbow{0%,to{color:#7f00ff;fill:#7f00ff}14%{color:#a933ff;fill:#a933ff}29%{color:#007fff;fill:#007fff}43%{color:#00ff7f;fill:#00ff7f}57%{color:#ff0;fill:#ff0}71%{color:#ff7f00;fill:#ff7f00}86%{color:red;fill:red}}svg{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;color:#8b949e}h2,h3{margin:8px 0 2px;padding:0;color:#58a6ff;font-weight:400}h2 svg,h3 svg{fill:currentColor}h2{font-size:16px}h3,svg{font-size:14px}section>field{margin-left:5px;margin-right:5px}.field{display:flex;align-items:center;margin-bottom:2px;white-space:nowrap}.field svg{margin:0 8px;fill:#8b949e;flex-shrink:0}.row{display:flex;flex-wrap:wrap}.row section{flex:1 1 0}.calendar.field{margin:4px 0 4px 7px}.calendar .day{outline:1px solid rgba(255,255,255,.05);outline-offset:-1px}svg.calendar{margin-left:13px;margin-top:4px}:root{--color-calendar-graph-day-bg:#1b222d;--color-calendar-graph-day-border:rgba(255,255,255,0.05);--color-calendar-graph-day-L1-bg:#0e4429;--color-calendar-graph-day-L2-bg:#006d32;--color-calendar-graph-day-L3-bg:#26a641;--color-calendar-graph-day-L4-bg:#39d353;--color-calendar-halloween-graph-day-L1-bg:#ffee4a;--color-calendar-halloween-graph-day-L2-bg:#ffc501;--color-calendar-halloween-graph-day-L3-bg:#fe9600;--color-calendar-halloween-graph-day-L4-bg:#03001c;--color-calendar-winter-graph-day-L1-bg:#0a3069;--color-calendar-winter-graph-day-L2-bg:#0969da;--color-calendar-winter-graph-day-L3-bg:#54aeff;--color-calendar-winter-graph-day-L4-bg:#b6e3ff;--color-calendar-graph-day-L4-border:rgba(255,255,255,0.05);--color-calendar-graph-day-L3-border:rgba(255,255,255,0.05);--color-calendar-graph-day-L2-border:rgba(255,255,255,0.05);--color-calendar-graph-day-L1-border:rgba(255,255,255,0.05)}#metrics-end{width:100%}</style>`;

if (/<style>[\s\S]*?<\/style>/.test(content)) {
  content = content.replace(/<style>[\s\S]*?<\/style>/, () => style);
} else {
  console.warn("Warning: <style>...</style> block not found in SVG.");
}

fs.writeFileSync(svgPath, content, "utf8");
console.log("Successfully applied dark mode palette to 3D isometric calendar SVG.");
