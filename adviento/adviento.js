/* La corona de Adviento de tu familia — se genera en el navegador. Los nombres de la familia NUNCA se envían. */
(() => {
  const C = window.PS_CONFIG || {}, $ = s => document.querySelector(s);
  const MORADO = "#4a2160", VINO = "#3d0c16", ORO = "#b8892b", OROS = "#8a6a22", MARFIL = "#faf6ee", TINTA = "#231a17", SUAVE = "#6a5c53";
  const DOM = [
    { f: "29 de noviembre de 2026", t: "Esperanza", c: ["Estén atentos y vigilen.", "Marcos 13, 33"], o: "Señor Jesús, hoy encendemos la primera vela y empezamos a esperarte. Despierta nuestra casa. Que {F} no vivamos estas semanas con prisas, sino atentos a lo que de verdad importa. Danos esperanza a los que estamos cansados, y que esta luz pequeña nos recuerde que tú ya vienes. Amén.", g: "Esta semana, apaguen la tele un rato cada noche y pregúntense en familia: ¿qué esperamos de verdad de esta Navidad?" },
    { f: "6 de diciembre de 2026", t: "Paz", c: ["Preparen el camino del Señor.", "Marcos 1, 3"], o: "Señor, hoy encendemos la segunda vela. Prepara el camino en nuestra casa: allana lo que está torcido y quita las piedras que nos separan. Que {F} sepamos pedir perdón y perdonar antes de Navidad, y que en esta mesa haya paz. Amén.", g: "Esta semana, hagan las paces con alguien: una llamada, un mensaje o un abrazo pendiente." },
    { f: "13 de diciembre de 2026", t: "Alegría", c: ["Yo soy la voz que grita en el desierto.", "Juan 1, 23"], o: "Señor, hoy encendemos la vela rosa, la de la alegría. Ya falta poco. Llena de alegría a {F}, una alegría sencilla que no depende de los regalos ni del dinero. Y acuérdate de los que esta Navidad estarán tristes o solos: que alguien les lleve tu luz. Amén.", g: "Esta semana, visiten o llamen a alguien que vaya a pasar la Navidad solo." },
    { f: "20 de diciembre de 2026", t: "Amor", c: ["Hágase en mí según tu palabra.", "Lucas 1, 38"], o: "Señor, hoy encendemos la cuarta vela y la corona está completa. Como María, queremos decirte que sí. Entra en nuestra casa esta Navidad y quédate con {F}. Que el Niño que esperamos nos encuentre unidos, con el corazón preparado y la puerta abierta. Amén.", g: "Esta semana, pongan juntos el Nacimiento, y que el Niño Jesús no aparezca hasta la noche del 24." },
  ];
  const EJ = ["Rosa", "Manuel", "la abuela Carmen", "Mateo"];
  const st = { personas: ["", "", ""], pag: 0, tu: "" };
  const PAISES = [["México", "52"], ["Colombia", "57"], ["Argentina", "54"], ["Perú", "51"], ["Venezuela", "58"], ["Chile", "56"], ["Ecuador", "593"], ["Guatemala", "502"], ["Cuba", "53"], ["Bolivia", "591"], ["República Dominicana", "1"], ["Honduras", "504"], ["Paraguay", "595"], ["El Salvador", "503"], ["Nicaragua", "505"], ["Costa Rica", "506"], ["Panamá", "507"], ["Uruguay", "598"], ["Puerto Rico", "1"], ["Estados Unidos", "1"], ["España", "34"], ["Otro país", ""]];
  const limpia = t => (t || "").replace(/\s+/g, " ").trim();
  const gente = () => { const v = st.personas.map(limpia).filter(Boolean); return v.length ? v : EJ; };
  const lista = () => { const g = gente(); return g.length === 1 ? g[0] : g.slice(0, -1).join(", ") + " y " + g[g.length - 1]; };
  const conNombres = t => t.split("{F}").join(gente().length === 1 ? lista() : "nosotros, " + lista() + ",");
  function lineas(ctx, txt, maxW) { const out = []; let l = ""; for (const w of txt.split(" ")) { const t = l ? l + " " + w : w; if (ctx.measureText(t).width > maxW && l) { out.push(l); l = w; } else l = t; } if (l) out.push(l); return out; }
  function fondo(ctx, W, H) {
    ctx.fillStyle = MARFIL; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = ORO; ctx.lineWidth = W * .004; ctx.strokeRect(W * .05, H * .035, W * .9, H * .93);
    ctx.lineWidth = W * .0015; ctx.strokeRect(W * .066, H * .046, W * .868, H * .908);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
  }
  function corona(ctx, cx, cy, s, encendidas) {
    ctx.save(); ctx.strokeStyle = "#2f5d3a"; ctx.lineWidth = s * .14; ctx.beginPath(); ctx.ellipse(cx, cy + s * .35, s * 1.25, s * .38, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "#4f8a5b"; ctx.lineWidth = s * .05; for (let a = 0; a < 24; a++) { const t = a / 24 * Math.PI * 2, x = cx + Math.cos(t) * s * 1.25, y = cy + s * .35 + Math.sin(t) * s * .38; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(t + 1) * s * .14, y + Math.sin(t + 1) * s * .1); ctx.stroke(); }
    const pos = [-.9, -.3, .3, .9], col = ["#5b2a78", "#5b2a78", "#d58aa8", "#5b2a78"], orden = [0, 1, 2, 3];
    pos.forEach((p, i) => {
      const x = cx + p * s, top = cy - s * (i === 2 ? .55 : .7), w = s * .22;
      ctx.fillStyle = col[i]; ctx.fillRect(x - w / 2, top, w, cy + s * .35 - top);
      if (orden[i] < encendidas) { const g = ctx.createRadialGradient(x, top - s * .2, 2, x, top - s * .2, s * .4); g.addColorStop(0, "rgba(255,214,120,.9)"); g.addColorStop(1, "rgba(255,214,120,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, top - s * .2, s * .4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#f6a623"; ctx.beginPath(); ctx.ellipse(x, top - s * .14, s * .06, s * .13, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.strokeStyle = "#222"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, top - s * .05); ctx.stroke();
    });
    ctx.restore();
  }
  const pie = (ctx, W, H) => { ctx.font = `600 ${W * .017}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText("ORACIONES DEL PADRE SAMUEL  ·  ADVIENTO 2026", W / 2, H * .935); };
  function portada(ctx, W, H) {
    fondo(ctx, W, H); corona(ctx, W / 2, H * .24, W * .17, 4);
    ctx.fillStyle = MORADO; ctx.font = `700 ${W * .085}px Cinzel`; ctx.fillText("Adviento", W / 2, H * .45);
    ctx.font = `italic 600 ${W * .045}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("en familia", W / 2, H * .5);
    ctx.font = `500 ${W * .038}px "Cormorant Garamond"`; ctx.fillStyle = TINTA;
    lineas(ctx, "La corona de " + lista(), W * .72).slice(0, 5).forEach((l, i) => ctx.fillText(l, W / 2, H * .6 + i * W * .055));
    if (limpia(st.tu)) { ctx.font = `italic 500 ${W * .03}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("Preparado con cariño por " + limpia(st.tu), W / 2, H * .86); }
    pie(ctx, W, H);
  }
  function guia(ctx, W, H) {
    fondo(ctx, W, H); ctx.fillStyle = MORADO; ctx.font = `700 ${W * .05}px Cinzel`; ctx.fillText("Cómo hacer la corona", W / 2, H * .14);
    const pasos = ["Unas ramas verdes en círculo: pino, laurel o lo que tengan. El verde es la esperanza.", "Cuatro velas: tres moradas y una rosa. Si no tienen, cuatro velas blancas con un lazo.", "Pónganla en la mesa donde come la familia.", "Cada domingo, antes de comer o de cenar, enciendan una vela más y lean la página de ese domingo.", "En Nochebuena, enciendan las cuatro y pongan al Niño Jesús en el Nacimiento."];
    let y = H * .23; ctx.textAlign = "left";
    pasos.forEach((p, i) => { ctx.font = `700 ${W * .045}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText(String(i + 1), W * .14, y); ctx.font = `500 ${W * .037}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; lineas(ctx, p, W * .66).forEach(l => { ctx.fillText(l, W * .21, y); y += W * .05; }); y += W * .035; });
    ctx.textAlign = "center"; pie(ctx, W, H);
  }
  function domingo(ctx, W, H, i) {
    const d = DOM[i]; fondo(ctx, W, H); corona(ctx, W / 2, H * .13, W * .1, i + 1);
    ctx.font = `600 ${W * .022}px Cinzel`; ctx.fillStyle = OROS; ctx.fillText(`${["PRIMER", "SEGUNDO", "TERCER", "CUARTO"][i]} DOMINGO  ·  ${d.f.toUpperCase()}`, W / 2, H * .245);
    ctx.font = `700 ${W * .075}px Cinzel`; ctx.fillStyle = i === 2 ? "#a2456c" : MORADO; ctx.fillText(d.t, W / 2, H * .31);
    ctx.font = `italic 600 ${W * .034}px "Cormorant Garamond"`; ctx.fillStyle = VINO; ctx.fillText("«" + d.c[0] + "»", W / 2, H * .36);
    ctx.font = `600 ${W * .019}px Cinzel`; ctx.fillStyle = SUAVE; ctx.fillText(d.c[1].toUpperCase(), W / 2, H * .382);
    let fs = W * .042, ls; const txt = conNombres(d.o);
    do { ctx.font = `500 ${fs}px "Cormorant Garamond"`; ls = lineas(ctx, txt, W * .74); fs -= 1; } while (ls.length * fs * 1.42 > H * .36 && fs > W * .028);
    let y = H * .44; ctx.fillStyle = TINTA; ls.forEach(l => { ctx.fillText(l, W / 2, y); y += (fs + 1) * 1.42; });
    y = Math.max(y + W * .03, H * .79); ctx.font = `700 ${W * .022}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText("EL GESTO DE LA SEMANA", W / 2, y); y += W * .045;
    ctx.font = `italic 500 ${W * .031}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; lineas(ctx, d.g, W * .72).forEach(l => { ctx.fillText(l, W / 2, y); y += W * .04; });
    pie(ctx, W, H);
  }
  function nochebuena(ctx, W, H) {
    fondo(ctx, W, H); corona(ctx, W / 2, H * .15, W * .12, 4);
    ctx.fillStyle = MORADO; ctx.font = `700 ${W * .055}px Cinzel`; ctx.fillText("Nochebuena", W / 2, H * .31);
    ctx.font = `italic 600 ${W * .03}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("al poner al Niño en el Nacimiento", W / 2, H * .35);
    const t = conNombres("Niño Jesús, bienvenido a esta casa. Te hemos esperado cuatro semanas, y aquí estamos {F} para recibirte. Bendice esta mesa y a los que hoy no pueden estar en ella. Que nunca nos falte tu paz. Amén.");
    ctx.font = `500 ${W * .04}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; let y = H * .43; lineas(ctx, t, W * .74).forEach(l => { ctx.fillText(l, W / 2, y); y += W * .058; });
    ctx.font = `italic 500 ${W * .027}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE;
    lineas(ctx, "En Nochebuena, los de la comunidad de WhatsApp del Padre Samuel recibirán la bendición de la mesa de Navidad. Más oraciones en padresamuel.github.io", W * .7).forEach((l, i) => ctx.fillText(l, W / 2, H * .84 + i * W * .038));
    pie(ctx, W, H);
  }
  const paginas = () => [["Portada", portada], ["Cómo hacer la corona", guia], ...DOM.map((d, i) => [`Domingo ${i + 1}`, (c, W, H) => domingo(c, W, H, i)]), ["Nochebuena", nochebuena]];
  function pinta() { const ps = paginas(); st.pag = Math.min(st.pag, ps.length - 1); const cv = $("#cvPag"); ps[st.pag][1](cv.getContext("2d"), cv.width, cv.height); $("#numPag").textContent = `${ps[st.pag][0]} · ${st.pag + 1} de ${ps.length}`; }
  function filas() {
    const cont = $("#personas"); cont.innerHTML = "";
    st.personas.forEach((p, i) => {
      const f = document.createElement("div"); f.className = "persona solo";
      f.innerHTML = `<input class="campo" maxlength="30" placeholder="${i ? "Otro nombre" : "Nombre, por ejemplo: Rosa"}" aria-label="Nombre ${i + 1}">${i ? '<button type="button" class="quita" aria-label="Quitar">×</button>' : ""}`;
      const inp = f.querySelector("input"); inp.value = p; inp.oninput = () => { st.personas[i] = inp.value; st.pag = 2; pinta(); };
      const q = f.querySelector(".quita"); if (q) q.onclick = () => { st.personas.splice(i, 1); filas(); pinta(); };
      cont.appendChild(f);
    });
    $("#mas").hidden = st.personas.length >= 15;
  }
  function pdf() {
    const { jsPDF } = window.jspdf, d = new jsPDF({ unit: "mm", format: "a4", compress: true });
    paginas().forEach(([, f], i) => { const c = document.createElement("canvas"); c.width = 1654; c.height = 2339; f(c.getContext("2d"), c.width, c.height); if (i) d.addPage(); d.addImage(c.toDataURL("image/jpeg", .88), "JPEG", 0, 0, 210, 297); });
    d.setProperties({ title: "Adviento en familia 2026", creator: "Oraciones del Padre Samuel" });
    d.save("Adviento en familia 2026.pdf");
  }
  function envia(ev) {
    ev.preventDefault(); const av = $("#aviso");
    const nombre = limpia($("#nombre").value), tel = $("#tel").value.replace(/[^\d]/g, ""), pais = $("#pais").value;
    if (!st.personas.some(p => limpia(p))) { av.textContent = "Escribe al menos un nombre en el paso 1."; document.querySelector("#personas input").focus(); return; }
    if (!nombre) { av.textContent = "Escribe tu nombre."; $("#nombre").focus(); return; }
    if (tel.length < 7) { av.textContent = "Revisa tu número de WhatsApp: parece que falta algo."; $("#tel").focus(); return; }
    av.textContent = ""; st.tu = nombre; st.pag = 0; pinta();
    const pre = (PAISES.find(x => x[0] === pais) || [, ""])[1];
    // Solo viajan nombre, WhatsApp y país. Los nombres de la familia NO se envían.
    const datos = new URLSearchParams({ nombre, whatsapp: (pre ? "+" + pre + " " : "") + tel, pais, regalo: "Adviento 2026", acepta: "si", avisos: "si", web: $("#web").value });
    const clave = "ps_enviado_adv_" + tel; let ya = false; try { ya = !!sessionStorage.getItem(clave); sessionStorage.setItem(clave, "1"); } catch (e) {}
    if (C.COMUNIDAD_ENDPOINT && !ya) { try { fetch(C.COMUNIDAD_ENDPOINT, { method: "POST", mode: "no-cors", body: datos, keepalive: true }); } catch (e) {} }
    try { pdf(); } catch (e) {}
    $("#fNombre").textContent = nombre.split(" ")[0]; $("#finCanal").href = C.WHATSAPP || "../";
    const fin = $("#final"); fin.hidden = false; fin.scrollIntoView({ behavior: "smooth" });
    if (C.WHATSAPP && !/iPad|iPhone|iPod/.test(navigator.userAgent)) setTimeout(() => { location.href = C.WHATSAPP; }, 2500);
  }
  function paisPorDefecto() {
    let tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    const M = { Mexico: "México", Monterrey: "México", Cancun: "México", Merida: "México", Tijuana: "México", Chihuahua: "México", Hermosillo: "México", Mazatlan: "México", Bogota: "Colombia", Buenos_Aires: "Argentina", Argentina: "Argentina", Lima: "Perú", Caracas: "Venezuela", Santiago: "Chile", Guayaquil: "Ecuador", Guatemala: "Guatemala", Havana: "Cuba", La_Paz: "Bolivia", Santo_Domingo: "República Dominicana", Tegucigalpa: "Honduras", Asuncion: "Paraguay", El_Salvador: "El Salvador", Managua: "Nicaragua", Costa_Rica: "Costa Rica", Panama: "Panamá", Montevideo: "Uruguay", Puerto_Rico: "Puerto Rico", Madrid: "España", Canary: "España", New_York: "Estados Unidos", Chicago: "Estados Unidos", Los_Angeles: "Estados Unidos", Denver: "Estados Unidos", Phoenix: "Estados Unidos" };
    for (const k in M) if (tz.includes(k)) return M[k];
    return "México";
  }
  async function inicia() {
    const sp = $("#pais"); sp.innerHTML = PAISES.map(([n, p]) => `<option value="${n}">${n}${p ? " +" + p : ""}</option>`).join(""); sp.value = paisPorDefecto();
    filas();
    $("#mas").onclick = () => { st.personas.push(""); filas(); const ins = document.querySelectorAll("#personas input"); ins[ins.length - 1].focus(); };
    $("#ant").onclick = () => { st.pag = Math.max(0, st.pag - 1); pinta(); };
    $("#sig").onclick = () => { st.pag = Math.min(paginas().length - 1, st.pag + 1); pinta(); };
    $("#nombre").oninput = e => { st.tu = e.target.value; st.pag = 0; pinta(); };
    $("#form").addEventListener("submit", envia); $("#bajaPDF").onclick = pdf;
    await Promise.all(['700 40px Cinzel', '600 40px Cinzel', '500 40px "Cormorant Garamond"', 'italic 600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"'].map(f => document.fonts.load(f)));
    const h = $("#cvHeroe"); domingo(h.getContext("2d"), h.width, h.height, 0);
    pinta();
  }
  inicia();
})();
