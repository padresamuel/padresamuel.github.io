// Cabecera y pie compartidos por todas las páginas (web estática, sin compilar).
(() => {
  const R = document.body.dataset.raiz || "", S = document.body.dataset.seccion || "";
  const C = window.PS_CONFIG || {};
  const mono = `<svg viewBox="0 0 40 48" class="monograma" aria-hidden="true"><path d="M4 46V20a16 16 0 0 1 32 0v26" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M20 12v24M13 20h14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M1 46h38" stroke="currentColor" stroke-width="2.2"/></svg>`;
  const nav = [["hoy", "hoy/", "La oración de hoy"], ["oraciones", "oraciones/", "Oraciones"], ["escudo", "escudo/", "El escudo de tu familia"], ["adviento", "adviento/", "Adviento"]];
  const cab = document.getElementById("cabecera");
  if (cab) cab.outerHTML = `<header class="cab">
    <a class="logo" href="${R}" aria-label="Inicio · Oraciones del Padre Samuel">${mono}<span><b>Oraciones</b> del Padre Samuel</span></a>
    <button class="menu-btn" aria-label="Menú" aria-expanded="false" onclick="this.setAttribute('aria-expanded',this.getAttribute('aria-expanded')==='false');document.body.classList.toggle('menu-abierto')">☰</button>
    <nav class="menu">${nav.map(([k, u, t]) => `<a href="${R}${u}"${k === S ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
  </header>`;
  const pie = document.getElementById("pie");
  if (pie) pie.outerHTML = `<footer class="pie">
    ${mono}
    <p class="pie-lema">Rezar cada día, en familia.</p>
    <p>${nav.map(([k, u, t]) => `<a href="${R}${u}">${t}</a>`).join(" · ")}</p>
    <p class="pie-mini">${(C.CANALES || []).map(c => `<a href="${c.url}" rel="noopener">${c.nombre}</a>`).join(" · ")}</p>
    <p class="pie-mini"><a href="${R}privacidad/">Privacidad</a> · Gratis, sin anuncios y sin pagos</p>
  </footer>`;
})();
