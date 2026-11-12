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
    <nav class="menu">${nav.map(([k, u, t]) => `<a href="${R}${u}"${k === S ? ' aria-current="page"' : ""}>${t}</a>`).join("")}${C.WHATSAPP ? `<a class="menu-wa" href="${C.WHATSAPP}" rel="noopener">💬 Comunidad</a>` : ""}</nav>
  </header>`;
  const pie = document.getElementById("pie");
  if (pie) pie.outerHTML = `<footer class="pie">
    ${mono}
    <p class="pie-lema">Rezar cada día, en familia.</p>
    ${C.WHATSAPP ? `<p><a class="boton pie-wa" href="${C.WHATSAPP}" rel="noopener">💬 Únete a la comunidad del Padre Samuel en WhatsApp</a></p>` : ""}
    <p>${nav.map(([k, u, t]) => `<a href="${R}${u}">${t}</a>`).join(" · ")}</p>
    <p class="pie-mini">${(C.CANALES || []).map(c => `<a href="${c.url}" rel="noopener">${c.nombre}</a>`).join(" · ")}</p>
    <p class="pie-mini"><a href="${R}privacidad/">Privacidad</a> · Gratis, sin anuncios y sin pagos</p>
  </footer>`;
  // Comunidad de WhatsApp: SIEMPRE visible (orden de Dani, 12-11-2026)
  if (C.WHATSAPP && !document.querySelector(".wa-fija")) {
    const a = document.createElement("a");
    a.className = "wa-fija"; a.href = C.WHATSAPP; a.rel = "noopener";
    a.setAttribute("aria-label", "Únete a la comunidad del Padre Samuel en WhatsApp");
    a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.3 19.4L3 29l6.8-1.8A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1 1.1-3.9-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z"/></svg><span><b>Únete a la comunidad</b><small>Una oración cada mañana en WhatsApp</small></span>';
    document.body.appendChild(a); document.body.classList.add("con-wa");
  }
})();
