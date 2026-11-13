/* Rezo por ti — el libro se escribe en el navegador. Los nombres de la familia NUNCA se envían. */
(() => {
  const C = window.PS_CONFIG || {}, $ = s => document.querySelector(s);
  const VINO = "#3d0c16", ORO = "#b8892b", MARFIL = "#faf6ee", TINTA = "#231a17", SUAVE = "#6a5c53";

  // ---------- oraciones por necesidad (sin adjetivos con género: valen para hombre o mujer) ----------
  const NEC = [
    { id: "salud", t: "Por su salud", o: "Señor Jesús, médico de los cuerpos y de las almas: hoy te presento a {N}. Tú conoces su dolor mejor que nadie y sabes lo que necesita. Pon tu mano sobre su cuerpo, guía las manos de quienes le atienden y dale fuerza para cada día. Si llega una noche larga, que no le falte tu compañía. Y a los que le cuidamos, danos paciencia y ternura. Amén.", c: ["Por sus llagas hemos sido curados.", "Isaías 53, 5"] },
    { id: "trabajo", t: "Por su trabajo y su pan", o: "Señor, tú que trabajaste con tus manos en el taller de Nazaret, mira a {N}. Conoces sus preocupaciones: las cuentas, el cansancio, lo que no sabe del mañana. Abre las puertas que hoy parecen cerradas, pon en su camino a las personas adecuadas y dale un trabajo digno que le permita llevar el pan a casa sin perder la paz. San José, acompaña sus pasos. Amén.", c: ["Encomienda al Señor tus obras, y tus proyectos se cumplirán.", "Proverbios 16, 3"] },
    { id: "fe", t: "Para que vuelva a la fe", o: "Padre bueno, que sales cada tarde al camino a esperar al hijo que se fue: te encomiendo a {N}. Tú sabes por qué se alejó y lo que lleva en el corazón. No te pido que le obligues; te pido que le alcances. Pon cerca a alguien que le hable de ti con cariño, y a mí enséñame a esperar sin reproches, como esperas tú. Santa Mónica, que rezaste años por tu hijo, ruega por {N}. Amén.", c: ["Estaba perdido y ha sido encontrado.", "Lucas 15, 24"] },
    { id: "paz", t: "Por la paz en su casa", o: "Señor, Príncipe de la paz, entra en la vida de {N} y en su casa. Donde hay palabras duras, pon perdón; donde hay silencio frío, pon conversación; donde hay cansancio, pon descanso. Que en su mesa vuelvan las risas y que nadie se acueste con rencor. Sagrada Familia de Nazaret, cuida de {N} y de los suyos. Amén.", c: ["La paz les dejo, mi paz les doy.", "Juan 14, 27"] },
    { id: "estudios", t: "Por sus estudios", o: "Espíritu Santo, luz de la mente, acompaña a {N} en sus estudios. Dale memoria para lo que aprende, calma en los exámenes y constancia en los días en que cuesta. Que no estudie solo para aprobar, sino para servir mejor a los demás. Líbrale de las malas compañías y de los atajos que hacen daño. Santo Tomás de Aquino, ruega por {N}. Amén.", c: ["Si a alguno le falta sabiduría, que se la pida a Dios.", "Santiago 1, 5"] },
    { id: "bebe", t: "Por un embarazo o un bebé", o: "Señor de la vida, tú conoces a este niño antes de que nadie le vea la cara. Te encomiendo a {N} y a la vida que espera. Cuida cada día de este tiempo, aleja el miedo y las complicaciones, y que el nacimiento llegue en paz. Virgen María, que llevaste a Jesús en tu seno, cubre a {N} con tu manto. Amén.", c: ["Antes de formarte en el vientre, te conocí.", "Jeremías 1, 5"] },
    { id: "mayor", t: "En su vejez o su soledad", o: "Señor, que no abandonas a nadie en sus años cansados, mira con cariño a {N}. Cuando el cuerpo pese y los días se hagan largos, que sienta tu compañía. Dale buenas visitas, manos que le ayuden y un corazón en paz con su historia. Que no le falte quien le llame, quien le escuche y quien le recuerde que su vida vale. San Joaquín y Santa Ana, cuiden de {N}. Amén.", c: ["Hasta su vejez yo seré el mismo; hasta las canas los sostendré.", "Isaías 46, 4"] },
    { id: "proteccion", t: "Por su protección", o: "Señor, que guardas al que sale y al que vuelve, extiende tu mano sobre {N}. En la carretera, en el trabajo, en la calle y en la noche, que su ángel de la guarda le acompañe. Líbrale de todo peligro del cuerpo y del alma, y tráele de vuelta a casa con bien. San Miguel Arcángel, defiende a {N}. Amén.", c: ["El Señor guarda tus entradas y salidas, ahora y por siempre.", "Salmo 121, 8"] },
    { id: "angustia", t: "En un momento difícil", o: "Jesús, que sentiste angustia en el huerto de los Olivos, tú entiendes este peso. Hoy {N} carga algo que no sabe cómo soltar. No te pido solo que quites el problema: dale tu paz en medio de él. Que pueda dormir esta noche, que encuentre a alguien de confianza con quien hablar, y que mañana vea un paso posible. Virgen de los Dolores, quédate a su lado. Amén.", c: ["Vengan a mí los que están cansados y agobiados, y yo los aliviaré.", "Mateo 11, 28"] },
    { id: "difunto", t: "Por su descanso eterno", o: "Señor de la vida, te encomiendo a {N}, que ya no está entre nosotros. Gracias por todo lo que vivimos a su lado. Perdona lo que necesite perdón, completa lo que quedó a medias y recíbele en tu casa, donde no hay llanto ni dolor. Y a los que seguimos aquí, consuélanos con la esperanza de volver a vernos. Dale, Señor, el descanso eterno, y brille para {N} la luz que no se apaga. Amén.", c: ["Yo soy la resurrección y la vida.", "Juan 11, 25"] },
    { id: "gracias", t: "Para dar gracias", o: "Señor, hoy no vengo a pedir: vengo a darte gracias por {N}. Gracias por su vida, por lo que me ha enseñado y por cada día que hemos compartido. Bendice todo lo bueno que hay en su corazón y hazlo crecer. Que nunca le falte tu alegría ni la certeza de que tú le quieres. Amén.", c: ["Den gracias a Dios en toda ocasión.", "1 Tesalonicenses 5, 18"] },
  ];
  const PAISES = [["México", "52"], ["Colombia", "57"], ["Argentina", "54"], ["Perú", "51"], ["Venezuela", "58"], ["Chile", "56"], ["Ecuador", "593"], ["Guatemala", "502"], ["Cuba", "53"], ["Bolivia", "591"], ["República Dominicana", "1"], ["Honduras", "504"], ["Paraguay", "595"], ["El Salvador", "503"], ["Nicaragua", "505"], ["Costa Rica", "506"], ["Panamá", "507"], ["Uruguay", "598"], ["Puerto Rico", "1"], ["Estados Unidos", "1"], ["España", "34"], ["Otro país", ""]];
  const EJ = [{ n: "Rosa", nec: "salud" }, { n: "Manuel", nec: "trabajo" }, { n: "la abuela Carmen", nec: "mayor" }];
  const st = { ap: "", personas: [{ n: "", nec: "salud" }], pag: 0, tu: "" };

  // ---------- texto ----------
  const limpia = t => (t || "").replace(/\s+/g, " ").trim();
  const PART = new Set(["de", "del", "la", "las", "los", "y", "e"]);
  const formatea = a => limpia(a.replace(/[^\p{L}\s'\-]/gu, "")).split(" ").filter(Boolean).map((w, i, ws) => { const l = w.toLocaleLowerCase("es"); return PART.has(l) && i < ws.length - 1 ? l : l.charAt(0).toLocaleUpperCase("es") + l.slice(1); }).join(" ");
  const gente = () => { const v = st.personas.filter(p => limpia(p.n)); return v.length ? v.map(p => ({ n: limpia(p.n), nec: p.nec })) : EJ; };
  const familia = () => formatea(st.ap) || "Hernández";
  const nec = id => NEC.find(x => x.id === id) || NEC[0];
  // «a el abuelo» → «al abuelo», «de el» → «del»
  const nombra = (t, n) => t.split("{N}").join(n).replace(/\ba el /g, "al ").replace(/\bde el /g, "del ").replace(/\bA el /g, "Al ");
  function lineas(ctx, txt, maxW) { const out = []; let l = ""; for (const w of txt.split(" ")) { const t = l ? l + " " + w : w; if (ctx.measureText(t).width > maxW && l) { out.push(l); l = w; } else l = t; } if (l) out.push(l); return out; }
  function ajusta(ctx, txt, font, s, maxW) { ctx.font = font.replace("{s}", s); while (ctx.measureText(txt).width > maxW && s > 10) { s--; ctx.font = font.replace("{s}", s); } return s; }

  // ---------- páginas (A4 a 1240 x 1754) ----------
  function fondo(ctx, W, H) {
    ctx.fillStyle = MARFIL; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * .45, W * .1, W / 2, H * .45, W * .9); g.addColorStop(0, "rgba(255,255,255,.6)"); g.addColorStop(1, "rgba(228,214,187,.45)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = ORO; ctx.lineWidth = W * .004; ctx.strokeRect(W * .05, H * .035, W * .9, H * .93);
    ctx.lineWidth = W * .0015; ctx.strokeRect(W * .066, H * .046, W * .868, H * .908);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
  }
  function cruz(ctx, x, y, s) { ctx.strokeStyle = ORO; ctx.lineWidth = s * .12; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.moveTo(x - s * .62, y - s * .35); ctx.lineTo(x + s * .62, y - s * .35); ctx.stroke(); }
  function pie(ctx, W, H, n) { ctx.font = `600 ${W * .017}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText("ORACIONES DEL PADRE SAMUEL" + (n ? "  ·  " + n : ""), W / 2, H * .935); }
  function portada(ctx, W, H) {
    fondo(ctx, W, H); cruz(ctx, W / 2, H * .2, W * .05);
    ctx.fillStyle = VINO; ctx.font = `700 ${W * .1}px Cinzel`; ctx.fillText("Rezo por ti", W / 2, H * .38);
    ctx.font = `italic 600 ${W * .045}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("El libro de oración de la familia", W / 2, H * .45);
    const s = ajusta(ctx, familia(), '700 {s}px Cinzel', Math.round(W * .075), W * .75); ctx.font = `700 ${s}px Cinzel`; ctx.fillStyle = "#5c141d"; ctx.fillText(familia(), W / 2, H * .53);
    ctx.font = `500 ${W * .032}px "Cormorant Garamond"`; ctx.fillStyle = TINTA;
    const ns = gente().map(p => p.n); const txt = "Por " + (ns.length === 1 ? ns[0] : ns.slice(0, -1).join(", ") + " y " + ns[ns.length - 1]);
    lineas(ctx, txt, W * .7).slice(0, 5).forEach((l, i) => ctx.fillText(l, W / 2, H * .64 + i * W * .046));
    if (st.tu) { ctx.font = `italic 500 ${W * .028}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("Preparado con cariño por " + limpia(st.tu), W / 2, H * .86); }
    pie(ctx, W, H);
  }
  function guia(ctx, W, H) {
    fondo(ctx, W, H); ctx.fillStyle = VINO; ctx.font = `700 ${W * .05}px Cinzel`; ctx.fillText("Cómo rezar con este libro", W / 2, H * .15);
    const pasos = ["Elige un momento fijo del día: al despertar, con el café o antes de dormir.", "Reza una página cada día. Cuando llegues al final, vuelve a empezar.", "Lee despacio y en voz alta. Al decir el nombre, piensa en su cara.", "Termina con un Padrenuestro por esa persona.", "Si puedes, díselo: «hoy recé por ti»."];
    let y = H * .25; ctx.textAlign = "left";
    pasos.forEach((p, i) => { ctx.font = `700 ${W * .045}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText(String(i + 1), W * .14, y); ctx.font = `500 ${W * .036}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; lineas(ctx, p, W * .66).forEach(l => { ctx.fillText(l, W * .21, y); y += W * .05; }); y += W * .04; });
    ctx.textAlign = "center"; ctx.font = `italic 500 ${W * .03}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE;
    lineas(ctx, "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos. (Mateo 18, 20)", W * .7).forEach((l, i) => ctx.fillText(l, W / 2, H * .82 + i * W * .04));
    pie(ctx, W, H);
  }
  function persona(ctx, W, H, p, num) {
    fondo(ctx, W, H); const nd = nec(p.nec);
    ctx.font = `600 ${W * .022}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText(nd.t.toUpperCase(), W / 2, H * .11);
    const s = ajusta(ctx, p.n, '700 {s}px Cinzel', Math.round(W * .085), W * .74); ctx.font = `700 ${s}px Cinzel`; ctx.fillStyle = VINO; ctx.fillText(p.n, W / 2, H * .19);
    ctx.strokeStyle = ORO; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W * .4, H * .22); ctx.lineTo(W * .6, H * .22); ctx.stroke();
    const texto = nombra(nd.o, p.n); let fs = W * .047, ls;
    do { ctx.font = `500 ${fs}px "Cormorant Garamond"`; ls = lineas(ctx, texto, W * .74); fs -= 1; } while (ls.length * fs * 1.45 > H * .5 && fs > W * .03);
    let y = H * .29; ctx.fillStyle = TINTA; ls.forEach(l => { ctx.fillText(l, W / 2, y); y += (fs + 1) * 1.45; });
    y = Math.max(y + W * .04, H * .8); ctx.font = `italic 600 ${W * .032}px "Cormorant Garamond"`; ctx.fillStyle = "#5c141d";
    lineas(ctx, "«" + nd.c[0] + "»", W * .7).forEach(l => { ctx.fillText(l, W / 2, y); y += W * .042; });
    ctx.font = `600 ${W * .02}px Cinzel`; ctx.fillStyle = SUAVE; ctx.fillText(nd.c[1].toUpperCase(), W / 2, y + W * .005);
    pie(ctx, W, H, num);
  }
  function cierre(ctx, W, H) {
    fondo(ctx, W, H); cruz(ctx, W / 2, H * .13, W * .04);
    ctx.fillStyle = VINO; ctx.font = `700 ${W * .048}px Cinzel`; ctx.fillText("Por toda la familia", W / 2, H * .24);
    ctx.font = `italic 600 ${W * .034}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("familia " + familia(), W / 2, H * .285);
    const t = `Señor, tú conoces a cada uno de los que he nombrado en este libro. Los pongo a todos en tus manos: a los que están cerca y a los que están lejos, a los que te buscan y a los que todavía no. Une a esta familia con un lazo que no se rompa, que nos sepamos perdonar y que nadie se sienta solo. Y cuando yo no sepa qué pedir, reza tú por ellos. María, Madre nuestra, cúbrenos con tu manto. Amén.`;
    ctx.font = `500 ${W * .039}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; let y = H * .36;
    lineas(ctx, t, W * .74).forEach(l => { ctx.fillText(l, W / 2, y); y += W * .057; });
    ctx.font = `italic 500 ${W * .027}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE;
    lineas(ctx, "Cada mañana, una oración breve en el canal de WhatsApp del Padre Samuel. Y en su web, más oraciones para cada necesidad: padresamuel.github.io", W * .7).forEach((l, i) => ctx.fillText(l, W / 2, H * .84 + i * W * .038));
    pie(ctx, W, H);
  }
  const paginas = () => { const g = gente(); return [["Portada", portada], ["Cómo rezar", guia], ...g.map((p, i) => [p.n, (c, W, H) => persona(c, W, H, p, i + 1)]), ["Por toda la familia", cierre]]; };

  // ---------- estampa para WhatsApp (1080 x 1350) ----------
  function estampa(p) {
    const c = document.createElement("canvas"), W = 1080, H = 1350; c.width = W; c.height = H; const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#4b111c"); g.addColorStop(1, "#24070d"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const r = ctx.createRadialGradient(W / 2, H * .45, 10, W / 2, H * .45, W * .8); r.addColorStop(0, "rgba(230,201,131,.25)"); r.addColorStop(1, "rgba(230,201,131,0)"); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#c9a24a"; ctx.lineWidth = 4; ctx.strokeRect(46, 46, W - 92, H - 92);
    ctx.textAlign = "center"; cruz(ctx, W / 2, 230, 56);
    ctx.fillStyle = "#e6c983"; ctx.font = `italic 600 76px "Cormorant Garamond"`; ctx.fillText("Hoy recé por ti,", W / 2, 470);
    const s = ajusta(ctx, p.n, '700 {s}px Cinzel', 110, W * .8); ctx.font = `700 ${s}px Cinzel`; ctx.fillStyle = "#faf6ee"; ctx.fillText(p.n, W / 2, 610);
    const nd = nec(p.nec); ctx.font = `italic 500 50px "Cormorant Garamond"`; ctx.fillStyle = "#f1dfae";
    lineas(ctx, "«" + nd.c[0] + "»", W * .76).forEach((l, i) => ctx.fillText(l, W / 2, 800 + i * 62));
    ctx.font = `600 30px Cinzel`; ctx.fillStyle = "#c9a24a"; ctx.fillText(nd.c[1].toUpperCase(), W / 2, 800 + lineas(ctx, nd.c[0], W * .76).length * 62 + 40);
    ctx.font = `600 26px Cinzel`; ctx.fillText("ORACIONES DEL PADRE SAMUEL", W / 2, H - 100);
    return c;
  }

  // ---------- interfaz ----------
  function pinta() {
    const ps = paginas(); st.pag = Math.min(st.pag, ps.length - 1);
    const cv = $("#cvPag"); ps[st.pag][1](cv.getContext("2d"), cv.width, cv.height);
    $("#numPag").textContent = `${ps[st.pag][0]} · ${st.pag + 1} de ${ps.length}`;
  }
  function filas() {
    const cont = $("#personas"); cont.innerHTML = "";
    st.personas.forEach((p, i) => {
      const f = document.createElement("div"); f.className = "persona";
      f.innerHTML = `<input class="campo" maxlength="30" placeholder="${i ? "Otro nombre" : "Nombre, por ejemplo: Rosa"}" aria-label="Nombre de la persona ${i + 1}"><select class="campo" aria-label="Qué está viviendo">${NEC.map(n => `<option value="${n.id}">${n.t}</option>`).join("")}</select>${i ? '<button type="button" class="quita" aria-label="Quitar">×</button>' : ""}`;
      const [inp, sel] = f.querySelectorAll("input,select"); inp.value = p.n; sel.value = p.nec;
      inp.oninput = () => { p.n = inp.value; st.pag = 2 + i; pinta(); };
      sel.onchange = () => { p.nec = sel.value; st.pag = 2 + i; pinta(); };
      const q = f.querySelector(".quita"); if (q) q.onclick = () => { st.personas.splice(i, 1); filas(); pinta(); };
      cont.appendChild(f);
    });
    $("#mas").hidden = st.personas.length >= 15;
  }
  const bajaBlob = (blob, nombre) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); };
  function pdf() {
    const { jsPDF } = window.jspdf, d = new jsPDF({ unit: "mm", format: "a4", compress: true });
    paginas().forEach(([, f], i) => { const c = document.createElement("canvas"); c.width = 1654; c.height = 2339; f(c.getContext("2d"), c.width, c.height); if (i) d.addPage(); d.addImage(c.toDataURL("image/jpeg", .88), "JPEG", 0, 0, 210, 297); });
    d.setProperties({ title: "Rezo por ti - familia " + familia(), creator: "Oraciones del Padre Samuel" });
    d.save(`Rezo por ti - familia ${familia()}.pdf`);
  }
  async function envia(ev) {
    ev.preventDefault(); const av = $("#aviso");
    const nombre = limpia($("#nombre").value), tel = $("#tel").value.replace(/[^\d]/g, ""), pais = $("#pais").value;
    if (!st.personas.some(p => limpia(p.n))) { av.textContent = "Escribe al menos un nombre en el paso II."; document.querySelector("#personas input").focus(); return; }
    if (!nombre) { av.textContent = "Escribe tu nombre."; $("#nombre").focus(); return; }
    if (tel.length < 7) { av.textContent = "Revisa tu número de WhatsApp: parece que falta algo."; $("#tel").focus(); return; }
    if (!$("#acepto").checked) { av.textContent = "Marca la primera casilla para recibir tu libro."; return; }
    av.textContent = ""; st.tu = nombre; pinta();
    const pre = (PAISES.find(x => x[0] === pais) || [, ""])[1];
    const datos = new URLSearchParams({ nombre, whatsapp: (pre ? "+" + pre + " " : "") + tel, pais, canal: new URLSearchParams(location.search).get("c") || "ES1", regalo: "Rezo por ti", acepta: "si", avisos: $("#avisos").checked ? "si" : "no", origen: (new URLSearchParams(location.search).get("v") || document.referrer || "directo").slice(0, 80), web: $("#web").value });
    // Solo viajan nombre, WhatsApp, país y consentimiento. Los nombres de la familia NO se envían.
    if (C.COMUNIDAD_ENDPOINT) { try { await fetch(C.COMUNIDAD_ENDPOINT, { method: "POST", mode: "no-cors", body: datos }); } catch (e) { /* nunca dejamos a nadie sin su libro */ } }
    $("#fNombre").textContent = nombre.split(" ")[0];
    const ew = $("#estampasWA"); ew.innerHTML = "";
    gente().forEach(p => { const b = document.createElement("button"); b.className = "boton claro"; b.textContent = "Estampa para " + p.n; b.onclick = () => estampa(p).toBlob(x => bajaBlob(x, `Hoy recé por ti - ${p.n}.jpg`), "image/jpeg", .92); ew.appendChild(b); });
    if (C.WA_NEGOCIO) { const a = $("#bajaWA"); a.href = `https://wa.me/${C.WA_NEGOCIO}?text=${encodeURIComponent("Hola Padre Samuel, soy " + nombre + ". Quiero mi libro REZO POR TI 🙏")}`; a.hidden = false; }
    const fc = $("#finCanal"); if (C.WHATSAPP) fc.href = C.WHATSAPP; else fc.hidden = true;
    const fin = $("#final"); fin.hidden = false; fin.scrollIntoView({ behavior: "smooth" });
  }
  async function inicia() {
    const sp = $("#pais"); sp.innerHTML = PAISES.map(([n, p]) => `<option value="${n}">${n}${p ? " (+" + p + ")" : ""}</option>`).join("");
    sp.onchange = () => { const p = PAISES.find(x => x[0] === sp.value)[1]; $("#prefijo").textContent = p ? "+" + p : "+"; };
    filas();
    $("#mas").onclick = () => { st.personas.push({ n: "", nec: "salud" }); filas(); const ins = document.querySelectorAll("#personas input"); ins[ins.length - 1].focus(); };
    $("#apellido").oninput = e => { st.ap = e.target.value; st.pag = 0; pinta(); };
    $("#ant").onclick = () => { st.pag = Math.max(0, st.pag - 1); pinta(); };
    $("#sig").onclick = () => { st.pag = Math.min(paginas().length - 1, st.pag + 1); pinta(); };
    $("#form").addEventListener("submit", envia); $("#bajaPDF").onclick = pdf;
    await Promise.all(['700 40px Cinzel', '600 40px Cinzel', '500 40px "Cormorant Garamond"', 'italic 600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"'].map(f => document.fonts.load(f)));
    const h = $("#cvHeroe"); persona(h.getContext("2d"), h.width, h.height, { n: "Rosa", nec: "salud" }, 1);
    pinta();
  }
  inicia();
})();
