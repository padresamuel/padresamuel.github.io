/* La casa bendecida — todo se dibuja en el navegador (GitHub Pages, sin servidor). */
(() => {
  const C = window.PS_CONFIG, PROT = window.PROTECTORES, RAIZ = document.body.dataset.raiz || "";
  const $ = s => document.querySelector(s);
  const VINO = "#3d0c16", GRANATE = "#5c141d", ORO = "#b8892b", MARFIL = "#faf6ee";
  const EJEMPLO = "Hernández";
  const st = { prot: PROT[0], apellido: "", miembros: "", img: {}, previa: "escudo" };

  // ---------- texto ----------
  const PART = new Set(["de", "del", "la", "las", "los", "y", "e", "da", "do", "dos", "van", "von"]);
  function formatea(a) {
    a = (a || "").replace(/[^\p{L}\s'\-]/gu, "").replace(/\s+/g, " ").trim();
    const ws = a.split(" ");
    return ws.map((w, i) => {
      const l = w.toLocaleLowerCase("es");
      if (PART.has(l) && i < ws.length - 1) return l;
      return l.split("-").map(p => p.charAt(0).toLocaleUpperCase("es") + p.slice(1)).join("-");
    }).join(" ");
  }
  const apellido = () => formatea(st.apellido) || EJEMPLO;
  const familia = () => "Familia " + apellido();
  function miembros() {
    const xs = st.miembros.split(/[,;\n]+/).map(x => x.replace(/\s+/g, " ").trim()).filter(Boolean).slice(0, 12);
    if (!xs.length) return "";
    return xs.length === 1 ? xs[0] : xs.slice(0, -1).join(", ") + " y " + xs[xs.length - 1];
  }
  function carga(src) { return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; }); }
  function ajusta(ctx, txt, font, size, maxW) {
    let s = size; ctx.font = font.replace("{s}", s);
    while (ctx.measureText(txt).width > maxW && s > 8) { s -= 1; ctx.font = font.replace("{s}", s); }
    return s;
  }
  function lineas(ctx, txt, maxW) {
    const out = []; let l = "";
    for (const w of txt.split(" ")) { const t = l ? l + " " + w : w; if (ctx.measureText(t).width > maxW && l) { out.push(l); l = w; } else l = t; }
    if (l) out.push(l); return out;
  }

  // ---------- el escudo ----------
  function dibujaEscudo(ctx, W, H, o = {}) {
    const prot = o.prot || st.prot, ap = o.apellido || apellido();
    const im = st.img[prot.id];
    if (im) ctx.drawImage(im, 0, 0, W, H);
    else { ctx.fillStyle = MARFIL; ctx.fillRect(0, 0, W, H); }
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const txt = "Familia " + ap;
    const s = ajusta(ctx, txt, '700 {s}px Cinzel', Math.round(H * 0.048), W * C.NOMBRE_ANCHO);
    ctx.fillStyle = GRANATE; ctx.font = `700 ${s}px Cinzel`; ctx.fillText(txt, W / 2, H * C.NOMBRE_Y);
    ctx.font = `italic 600 ${Math.round(H * 0.026)}px "Cormorant Garamond"`; ctx.fillStyle = "#3b2a22";
    const ls = lineas(ctx, prot.frase, W * C.FRASE_ANCHO), lh = H * 0.03;
    ls.forEach((l, i) => ctx.fillText(l, W / 2, H * C.FRASE_Y + (i - (ls.length - 1) / 2) * lh));
  }
  function escudoCanvas(W, o) { const c = document.createElement("canvas"); c.width = W; c.height = Math.round(W * 1.5); dibujaEscudo(c.getContext("2d"), c.width, c.height, o); return c; }

  // ---------- la bendición de la casa ----------
  function dibujaBendicion(ctx, W, H) {
    ctx.fillStyle = MARFIL; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * .45, W * .1, W / 2, H * .45, W * .9); g.addColorStop(0, "rgba(255,255,255,.6)"); g.addColorStop(1, "rgba(228,214,187,.45)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = ORO; ctx.lineWidth = W * 0.004; ctx.strokeRect(W * .055, H * .04, W * .89, H * .92);
    ctx.lineWidth = W * 0.0015; ctx.strokeRect(W * .07, H * .05, W * .86, H * .90);
    const e = escudoCanvas(400); ctx.drawImage(e, 0, 0, e.width, e.height * 0.66, W / 2 - W * .07, H * .075, W * .14, W * .14 * 1.5 * 0.66);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = VINO;
    let y = H * .075 + W * .14 * 1.5 * 0.66 + W * .075;
    ctx.font = `700 ${W * 0.048}px Cinzel`; ctx.fillText("Bendición de la casa", W / 2, y); y += W * .052;
    ctx.font = `italic 600 ${W * 0.034}px "Cormorant Garamond"`; ctx.fillStyle = "#6a5c53"; ctx.fillText("de la familia " + apellido(), W / 2, y); y += W * .075;
    const nombres = miembros();
    const texto = [
      "Señor Jesús, que quisiste nacer en una familia y crecer en la casa de Nazaret:",
      `bendice a la familia ${apellido()} y bendice esta casa.`,
      nombres ? `Te encomendamos a cada uno de los que vivimos en ella: ${nombres}. Guárdalos en tu corazón.` : "Guarda en tu corazón a cada uno de los que vivimos en ella.",
      "Que en esta casa no falte el pan, ni la paz, ni el perdón.",
      "Cuida a los que entran y a los que salen, a los que están cerca y a los que están lejos, y a los que ya descansan en ti.",
      "Haz de nuestra mesa un lugar de encuentro y de nuestra puerta un lugar de acogida.",
      st.prot.linea,
      "Y que María, nuestra Madre, nos enseñe a rezar juntos cada día.",
      "Amén."
    ];
    ctx.fillStyle = "#231a17"; const fs = W * 0.03; const lh = fs * 1.42;
    for (const p of texto) {
      ctx.font = p === "Amén." ? `700 italic ${fs * 1.08}px "Cormorant Garamond"` : `500 ${fs}px "Cormorant Garamond"`;
      for (const l of lineas(ctx, p, W * 0.7)) { ctx.fillText(l, W / 2, y); y += lh; } y += lh * 0.38;
    }
    ctx.font = `italic 500 ${W * 0.022}px "Cormorant Garamond"`; ctx.fillStyle = "#6a5c53";
    y = Math.max(y + lh * .4, H * 0.85);
    for (const l of lineas(ctx, "Al colgar el escudo, reúnanse junto a la puerta. Que la lea el mayor de la casa y todos respondan «Amén». Pueden rezarla cada año en esta misma fecha.", W * 0.7)) { ctx.fillText(l, W / 2, y); y += W * 0.031; }
    ctx.font = `600 ${W * 0.019}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText("ORACIONES DEL PADRE SAMUEL", W / 2, H * 0.935);
  }
  function bendicionCanvas(W) { const c = document.createElement("canvas"); c.width = W; c.height = Math.round(W * 1.4143); dibujaBendicion(c.getContext("2d"), c.width, c.height); return c; }

  // ---------- formatos para compartir ----------
  function fondoVertical(ctx, W, H, conTexto) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#4b111c"); g.addColorStop(1, "#24070d"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const r = ctx.createRadialGradient(W / 2, H * .52, 10, W / 2, H * .52, W * .8); r.addColorStop(0, "rgba(230,201,131,.28)"); r.addColorStop(1, "rgba(230,201,131,0)"); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
    const ew = W * 0.74, eh = ew * 1.5, x = (W - ew) / 2, y = conTexto ? H * 0.2 : H * 0.23, m = W * 0.018;
    const mg = ctx.createLinearGradient(x, y, x + ew, y + eh); mg.addColorStop(0, "#f3dc9b"); mg.addColorStop(.3, "#b0832d"); mg.addColorStop(.5, "#f6e3a8"); mg.addColorStop(.75, "#9c721f"); mg.addColorStop(1, "#e7c776");
    ctx.shadowColor = "rgba(0,0,0,.5)"; ctx.shadowBlur = 50; ctx.fillStyle = mg; ctx.fillRect(x - m, y - m, ew + 2 * m, eh + 2 * m); ctx.shadowBlur = 0;
    ctx.drawImage(escudoCanvas(1100), x, y, ew, eh);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    if (conTexto) {
      ctx.fillStyle = "#f1dfae"; ctx.font = `italic 600 ${W * 0.062}px "Cormorant Garamond"`;
      lineas(ctx, "Bendice, Señor, a la familia " + apellido(), W * 0.84).forEach((l, i) => ctx.fillText(l, W / 2, H * 0.085 + i * W * 0.072));
      ctx.font = `600 ${W * 0.028}px Cinzel`; ctx.fillStyle = "#c9a24a"; ctx.fillText("ORACIONES DEL PADRE SAMUEL", W / 2, H * 0.95);
    }
  }
  function portadaFB(ctx, W, H) {
    const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "#2b0810"); g.addColorStop(1, "#5a1521"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const eh = H * 0.86, ew = eh / 1.5, x = W * 0.07, y = (H - eh) / 2;
    ctx.fillStyle = "#c9a24a"; ctx.fillRect(x - 8, y - 8, ew + 16, eh + 16); ctx.drawImage(escudoCanvas(800), x, y, ew, eh);
    const tx = x + ew + W * 0.06, mw = W - tx - W * 0.05;
    ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillStyle = "#f6ead0";
    const s = ajusta(ctx, familia(), '700 {s}px Cinzel', Math.round(H * 0.15), mw); ctx.font = `700 ${s}px Cinzel`; ctx.fillText(familia(), tx, H * 0.42);
    ctx.font = `italic 600 ${Math.round(H * 0.075)}px "Cormorant Garamond"`; ctx.fillStyle = "#e6c983"; ctx.fillText(st.prot.frase, tx, H * 0.6, mw);
  }

  // ---------- pintar ----------
  function pinta() {
    const e = $("#cvEscudo"); dibujaEscudo(e.getContext("2d"), e.width, e.height);
    const b = $("#cvBend"); dibujaBendicion(b.getContext("2d"), b.width, b.height);
  }
  function pintaHeroe() { const h = $("#cvHeroe"); dibujaEscudo(h.getContext("2d"), h.width, h.height, { prot: PROT[0], apellido: EJEMPLO }); }

  // ---------- descargas ----------
  function bajaBlob(blob, nombre) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); }
  const bajaCanvas = (cv, nombre) => cv.toBlob(b => bajaBlob(b, nombre), "image/jpeg", 0.93);
  function descarga(f) {
    const base = `Escudo ${familia()}`;
    if (f === "pdf") {
      const { jsPDF } = window.jspdf; const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
      pdf.setFillColor(250, 246, 238); pdf.rect(0, 0, 210, 297, "F");
      pdf.addImage(escudoCanvas(2000).toDataURL("image/jpeg", 0.92), "JPEG", 15, 13.5, 180, 270);
      pdf.addPage(); pdf.addImage(bendicionCanvas(2480).toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, 210, 297);
      pdf.setProperties({ title: base + " - " + st.prot.nombre, creator: "Oraciones del Padre Samuel" });
      pdf.save(`${base} - para enmarcar.pdf`);
    } else if (f === "movil" || f === "whatsapp") {
      const c = document.createElement("canvas"); c.width = 1080; c.height = 1920; fondoVertical(c.getContext("2d"), 1080, 1920, f === "whatsapp");
      bajaCanvas(c, `${base} - ${f === "movil" ? "fondo del celular" : "estado de WhatsApp"}.jpg`);
    } else if (f === "facebook") {
      const c = document.createElement("canvas"); c.width = 1640; c.height = 624; portadaFB(c.getContext("2d"), 1640, 624); bajaCanvas(c, `${base} - portada de Facebook.jpg`);
    }
  }

  // ---------- formulario ----------
  async function envia(ev) {
    ev.preventDefault();
    const nombre = $("#nombre").value.trim(), correo = $("#correo").value.trim(), av = $("#aviso");
    if (!formatea(st.apellido)) { av.textContent = "Escribe primero el apellido de tu familia (paso I)."; $("#apellido").focus(); return; }
    if (!nombre) { av.textContent = "Escribe tu nombre."; $("#nombre").focus(); return; }
    if (C.FORM_ENDPOINT && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) { av.textContent = "Revisa tu correo: parece que falta algo."; $("#correo").focus(); return; }
    if (C.FORM_ENDPOINT && !$("#acepto").checked) { av.textContent = "Marca la casilla para que podamos enviártelo."; return; }
    av.textContent = "";
    if (C.FORM_ENDPOINT) {   // solo correo, nombre, apellido y protector: los nombres de la familia NO se envían
      const datos = new URLSearchParams({ EMAIL: correo, FIRSTNAME: nombre, APELLIDO: formatea(st.apellido), PROTECTOR: st.prot.id });
      try { await fetch(C.FORM_ENDPOINT, { method: "POST", mode: "no-cors", body: datos }); } catch (e) { /* nunca dejamos a nadie sin su regalo */ }
    }
    $("#fNombre").textContent = nombre.split(" ")[0]; $("#fFamilia").textContent = familia().replace("Familia", "familia");
    const fin = $("#final"); fin.hidden = false; fin.scrollIntoView({ behavior: "smooth" });
  }

  // ---------- arranque ----------
  async function inicia() {
    if (!C.FORM_ENDPOINT) {   // sin servicio de correo todavía: no pedimos datos que no usamos
      ["#bCorreo", "#bAcepto", "#faqCorreo"].forEach(id => { const e = $(id); if (e) e.hidden = true; });
      $("#fTitulo").textContent = "¿A nombre de quién lo bendecimos?";
      $("#fAyuda").textContent = "Lo descargas aquí mismo, gratis y sin dar ningún dato. Pronto podrás recibirlo también por correo.";
    }
    const cont = $("#protectores");
    PROT.forEach((p, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "estampa" + (i ? "" : " activo"); b.setAttribute("aria-pressed", i ? "false" : "true");
      b.innerHTML = `<img alt="" loading="lazy" src="${RAIZ}arte/${p.id}_mini.jpg"><b>${p.nombre}</b><small>${p.para}</small>`;
      b.onclick = () => { st.prot = p; document.querySelectorAll(".estampa").forEach(x => { x.classList.toggle("activo", x === b); x.setAttribute("aria-pressed", x === b); }); pinta(); };
      cont.appendChild(b);
    });
    document.querySelectorAll(".int").forEach(t => t.onclick = () => {
      document.querySelectorAll(".int").forEach(x => x.classList.toggle("activo", x === t));
      $("#cvEscudo").hidden = t.dataset.p !== "escudo"; $("#cvBend").hidden = t.dataset.p !== "bendicion";
    });
    $("#apellido").addEventListener("input", e => { st.apellido = e.target.value; pinta(); });
    $("#miembros").addEventListener("input", e => { st.miembros = e.target.value; pinta(); });
    $("#miembros").addEventListener("focus", () => document.querySelector('.int[data-p="bendicion"]').click());
    $("#apellido").addEventListener("focus", () => document.querySelector('.int[data-p="escudo"]').click());
    $("#form").addEventListener("submit", envia);
    document.querySelectorAll(".tarjeta-d").forEach(b => b.onclick = () => descarga(b.dataset.f));
    await Promise.all(['700 40px Cinzel', '600 40px Cinzel', '500 40px "Cormorant Garamond"', 'italic 600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"'].map(f => document.fonts.load(f)));
    const ims = await Promise.all(PROT.map(p => carga(`${RAIZ}arte/${p.id}.jpg`)));
    PROT.forEach((p, i) => { if (ims[i]) st.img[p.id] = ims[i]; });
    pintaHeroe(); pinta();
  }
  inicia();
})();
