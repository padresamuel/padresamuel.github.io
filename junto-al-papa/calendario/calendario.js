/* Calendario de protección de la familia — se genera en el navegador. Los nombres y fechas de la familia NUNCA se envían. */
(() => {
  const C = window.PS_CONFIG || {}, $ = s => document.querySelector(s);
  const VINO = "#3d0c16", GRANATE = "#7d1f2a", ORO = "#b8892b", OROS = "#8a6a22", MARFIL = "#faf6ee", TINTA = "#231a17", SUAVE = "#6a5c53", LINEA = "#e4d6bb";
  const hoy = new Date(), Y = hoy.getMonth() >= 9 ? hoy.getFullYear() + 1 : hoy.getFullYear();
  const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  // Devociones tradicionales de cada mes
  const PROT = [
    ["El Santo Nombre de Jesús", "Jesús, tu nombre es nuestra fuerza. Que en esta casa se pronuncie con cariño y nunca en vano, y que todo lo que empecemos este año lo hagamos en tu nombre."],
    ["La Sagrada Familia", "Jesús, María y José, miren a nuestra familia. Enséñennos a cuidarnos como ustedes en Nazaret: con trabajo, con paciencia y con oración."],
    ["San José", "San José, custodio de la Sagrada Familia, cuida de nuestra casa y de nuestro trabajo. Que no nos falte el pan ni la paz."],
    ["La Eucaristía", "Señor Jesús, presente en la Eucaristía, que esta familia no se aleje de tu mesa. Que cada domingo nos encuentres juntos."],
    ["La Virgen María", "Madre nuestra, este mes es tuyo. Cubre con tu manto a cada uno de los nuestros, a los que están cerca y a los que están lejos."],
    ["El Sagrado Corazón de Jesús", "Sagrado Corazón de Jesús, en ti confiamos. Reina en esta casa y haz nuestro corazón semejante al tuyo."],
    ["La Preciosa Sangre de Cristo", "Señor, por tu Sangre preciosa, protege a esta familia de todo mal y danos la paz que solo tú sabes dar."],
    ["El Inmaculado Corazón de María", "Corazón Inmaculado de María, guarda a nuestros hijos y a nuestros mayores. Que en esta casa aprendamos a amar como tú."],
    ["La Virgen de los Dolores", "Madre de los Dolores, que estuviste al pie de la cruz, acompaña a los que sufren en nuestra familia y no los dejes solos."],
    ["El Santo Rosario", "Virgen del Rosario, que este mes recemos juntos al menos un misterio cada día, y que esa oración sea la muralla de nuestra casa."],
    ["Las almas del Purgatorio", "Señor, te encomendamos a nuestros difuntos. Dales el descanso eterno, y que un día nos volvamos a encontrar en tu casa."],
    ["La Inmaculada y el Adviento", "Virgen Inmaculada, prepara nuestra casa para recibir a Jesús. Que esta Navidad no falte nadie en la mesa del corazón."],
  ];
  // Fiestas fijas (mes 1-12, día)
  const FIJAS = [[1, 1, "Santa María, Madre de Dios"], [1, 6, "Epifanía · Reyes"], [2, 2, "La Candelaria"], [3, 19, "San José"], [5, 13, "Virgen de Fátima"], [6, 29, "San Pedro y San Pablo"], [7, 16, "Virgen del Carmen"], [8, 15, "La Asunción"], [9, 8, "Natividad de María"], [9, 29, "Arcángeles Miguel, Gabriel y Rafael"], [10, 2, "Ángeles custodios"], [10, 4, "San Francisco de Asís"], [10, 7, "Virgen del Rosario"], [11, 1, "Todos los Santos"], [11, 2, "Fieles difuntos"], [12, 8, "La Inmaculada"], [12, 12, "Virgen de Guadalupe"], [12, 25, "Navidad"]];
  // Fechas del Papa León XIV (elegido el 8-5-2025; nació el 14-9-1955)
  const PAPA = [[5, 8, "Elección del Papa León XIV"], [9, 14, "Cumpleaños del Papa León XIV"]];
  function pascua(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1; return new Date(y, mes - 1, dia); }
  function moviles(y) {
    const p = pascua(y), mas = (n, t) => { const d = new Date(p); d.setDate(d.getDate() + n); return [d.getMonth() + 1, d.getDate(), t]; };
    const nav = new Date(y, 11, 25), adv = new Date(nav); adv.setDate(25 - (nav.getDay() || 7) - 21); const rey = new Date(adv); rey.setDate(adv.getDate() - 7);
    return [mas(-46, "Miércoles de Ceniza"), mas(-7, "Domingo de Ramos"), mas(-3, "Jueves Santo"), mas(-2, "Viernes Santo"), mas(0, "Pascua de Resurrección"), mas(7, "Divina Misericordia"), mas(49, "Pentecostés"), mas(68, "Sagrado Corazón de Jesús"), [rey.getMonth() + 1, rey.getDate(), "Cristo Rey"], [adv.getMonth() + 1, adv.getDate(), "Primer domingo de Adviento"]];
  }
  const TIPOS = [
    { id: "cumple", t: "Cumpleaños", s: "♥", o: "Señor, gracias por la vida de {N}. En este nuevo año, guárdale de todo mal, bendice sus pasos y que nunca le falte tu alegría. Amén." },
    { id: "boda", t: "Aniversario de boda", s: "♥", o: "Señor, gracias por el amor de {N}. Renueva hoy su promesa, dales paciencia en lo difícil y alegría en lo sencillo. Amén." },
    { id: "bautizo", t: "Bautizo", s: "✚", o: "Señor, en este día {N} se hizo hijo tuyo. Que nunca olvide de quién es, y que su ángel de la guarda le acompañe siempre. Amén." },
    { id: "santo", t: "Día de su santo", s: "✚", o: "Señor, que el santo de {N} interceda hoy por su vida y le enseñe el camino del cielo. Amén." },
    { id: "difunto", t: "En su memoria", s: "✝", o: "Señor, hoy recordamos a {N}. Dale el descanso eterno, que brille para su alma la luz que no se apaga, y a nosotros consuélanos. Amén." },
    { id: "otra", t: "Otra fecha", s: "★", o: "Señor, en esta fecha tan importante para nuestra familia, te pedimos por {N}: protégele, guíale y bendice todo lo que vive. Amén." },
  ];
  const tipo = id => TIPOS.find(x => x.id === id) || TIPOS[0];
  const EJ = [{ n: "Rosa", d: 14, m: 5, t: "cumple" }, { n: "Manuel y Carmen", d: 22, m: 5, t: "boda" }, { n: "el abuelo Pedro", d: 3, m: 5, t: "difunto" }];
  const st = { fechas: [{ n: "", d: "", m: "", t: "cumple" }, { n: "", d: "", m: "", t: "cumple" }, { n: "", d: "", m: "", t: "boda" }], pag: 0, tu: "" };
  const PAISES = [["México", "52"], ["Colombia", "57"], ["Argentina", "54"], ["Perú", "51"], ["Venezuela", "58"], ["Chile", "56"], ["Ecuador", "593"], ["Guatemala", "502"], ["Cuba", "53"], ["Bolivia", "591"], ["República Dominicana", "1"], ["Honduras", "504"], ["Paraguay", "595"], ["El Salvador", "503"], ["Nicaragua", "505"], ["Costa Rica", "506"], ["Panamá", "507"], ["Uruguay", "598"], ["Puerto Rico", "1"], ["Estados Unidos", "1"], ["España", "34"], ["Otro país", ""]];

  const limpia = t => (t || "").replace(/\s+/g, " ").trim();
  const nombra = (t, n) => t.split("{N}").join(n).replace(/\ba el /g, "al ").replace(/\bde el /g, "del ");
  const validas = () => st.fechas.filter(f => limpia(f.n) && +f.d && +f.m).map(f => ({ n: limpia(f.n), d: +f.d, m: +f.m, t: f.t }));
  const familia = () => { const v = validas(); return v.length ? v : EJ; };
  function lineas(ctx, txt, maxW) { const out = []; let l = ""; for (const w of txt.split(" ")) { const t = l ? l + " " + w : w; if (ctx.measureText(t).width > maxW && l) { out.push(l); l = w; } else l = t; } if (l) out.push(l); return out; }
  function ajusta(ctx, txt, font, s, maxW) { ctx.font = font.replace("{s}", s); while (ctx.measureText(txt).width > maxW && s > 8) { s--; ctx.font = font.replace("{s}", s); } return s; }
  function fondo(ctx, W, H) {
    ctx.fillStyle = MARFIL; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = ORO; ctx.lineWidth = W * .004; ctx.strokeRect(W * .04, H * .028, W * .92, H * .944);
    ctx.lineWidth = W * .0015; ctx.strokeRect(W * .052, H * .037, W * .896, H * .926);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
  }
  function llaves(ctx, x, y, s) { ctx.save(); ctx.strokeStyle = ORO; ctx.lineWidth = s * .09; ctx.lineCap = "round"; for (const a of [-.6, .6]) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.arc(0, -s * .55, s * .22, 0, Math.PI * 2); ctx.moveTo(0, -s * .33); ctx.lineTo(0, s * .7); ctx.moveTo(0, s * .45); ctx.lineTo(s * .2, s * .45); ctx.moveTo(0, s * .62); ctx.lineTo(s * .2, s * .62); ctx.stroke(); ctx.restore(); } ctx.restore(); }
  const pie = (ctx, W, H) => { ctx.font = `600 ${W * .016}px Cinzel`; ctx.fillStyle = ORO; ctx.fillText("JUNTO AL PAPA  ·  ORACIONES DEL PADRE SAMUEL", W / 2, H * .955); };

  function portada(ctx, W, H) {
    fondo(ctx, W, H); llaves(ctx, W / 2, H * .2, W * .07);
    ctx.fillStyle = OROS; ctx.font = `600 ${W * .024}px Cinzel`; ctx.fillText("CALENDARIO DE PROTECCIÓN", W / 2, H * .33);
    ctx.fillStyle = VINO; ctx.font = `700 ${W * .075}px Cinzel`; ctx.fillText("de la familia", W / 2, H * .41);
    ctx.font = `700 ${W * .16}px Cinzel`; ctx.fillStyle = GRANATE; ctx.fillText(String(Y), W / 2, H * .56);
    ctx.font = `italic 500 ${W * .034}px "Cormorant Garamond"`; ctx.fillStyle = TINTA;
    const ns = [...new Set(familia().map(f => f.n))]; const txt = "Bajo la protección de Dios: " + (ns.length === 1 ? ns[0] : ns.slice(0, -1).join(", ") + " y " + ns[ns.length - 1]);
    lineas(ctx, txt, W * .72).slice(0, 5).forEach((l, i) => ctx.fillText(l, W / 2, H * .66 + i * W * .05));
    if (limpia(st.tu)) { ctx.font = `italic 500 ${W * .028}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("Preparado con cariño por " + limpia(st.tu), W / 2, H * .89); }
    pie(ctx, W, H);
  }
  function fechasFam(ctx, W, H) {
    fondo(ctx, W, H); ctx.fillStyle = VINO; ctx.font = `700 ${W * .05}px Cinzel`; ctx.fillText("Las fechas de nuestra familia", W / 2, H * .1);
    const v = familia().slice().sort((a, b) => a.m - b.m || a.d - b.d);
    let fs = W * .04, y; const alto = () => { let h = 0; ctx.font = `500 ${fs}px "Cormorant Garamond"`; v.forEach(f => { h += fs * 3 + lineas(ctx, nombra(tipo(f.t).o, f.n), W * .78).length * fs * 1.32 + fs * .9; }); return h; };
    while (alto() > H * .76 && fs > W * .017) fs -= 1;
    y = H * .17; ctx.textAlign = "left";
    v.forEach(f => {
      const tp = tipo(f.t);
      ctx.font = `700 ${fs * 1.02}px Cinzel`; ctx.fillStyle = GRANATE; lineas(ctx, `${tp.s}  ${f.d} de ${MESES[f.m - 1].toLowerCase()} · ${tp.t}: ${f.n}`, W * .78).forEach(l => { ctx.fillText(l, W * .11, y); y += fs * 1.35; }); y += fs * .25;
      ctx.font = `italic 500 ${fs}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; lineas(ctx, nombra(tp.o, f.n), W * .78).forEach(l => { ctx.fillText(l, W * .11, y); y += fs * 1.32; }); y += fs * .9;
    });
    ctx.textAlign = "center"; pie(ctx, W, H);
  }
  function mes(ctx, W, H, mi) {
    fondo(ctx, W, H); const [pn, po] = PROT[mi];
    ctx.fillStyle = VINO; ctx.font = `700 ${W * .075}px Cinzel`; ctx.fillText(MESES[mi], W / 2, H * .095);
    ctx.font = `600 ${W * .022}px Cinzel`; ctx.fillStyle = OROS; ctx.fillText(`${Y}  ·  PROTECTOR DEL MES: ${pn.toUpperCase()}`, W / 2, H * .127);
    ctx.font = `italic 500 ${W * .026}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; lineas(ctx, "«" + po + "»", W * .8).forEach((l, i) => ctx.fillText(l, W / 2, H * .158 + i * W * .032));
    const x0 = W * .07, x1 = W * .93, gy = H * .225, cw = (x1 - x0) / 7;
    ctx.font = `700 ${W * .02}px Figtree, sans-serif`; ctx.fillStyle = OROS; DIAS.forEach((d, i) => ctx.fillText(d.toUpperCase(), x0 + cw * (i + .5), gy));
    const primero = new Date(Y, mi, 1).getDay(), nd = new Date(Y, mi + 1, 0).getDate(), filas = Math.ceil((primero + nd) / 7);
    const top = gy + W * .018, ch = (H * .92 - top) / filas;
    const ev = {}; const add = (d, txt, k) => (ev[d] = ev[d] || []).push([txt, k]);
    FIJAS.concat(moviles(Y)).forEach(([m, d, t]) => { if (m === mi + 1) add(d, t, "f"); });
    PAPA.forEach(([m, d, t]) => { if (m === mi + 1) add(d, t, "p"); });
    familia().forEach(f => { if (f.m === mi + 1 && f.d <= nd) add(f.d, `${tipo(f.t).s} ${f.n}`, "m"); });
    ctx.strokeStyle = LINEA; ctx.lineWidth = 2;
    for (let d = 1; d <= nd; d++) {
      const k = primero + d - 1, cx = x0 + cw * (k % 7), cy = top + ch * Math.floor(k / 7), es = ev[d] || [];
      const fam = es.some(e => e[1] === "m");
      ctx.fillStyle = fam ? "rgba(125,31,42,.09)" : (k % 7 === 0 ? "rgba(201,162,74,.08)" : "#fffdf9"); ctx.fillRect(cx + 3, cy + 3, cw - 6, ch - 6); ctx.strokeRect(cx + 3, cy + 3, cw - 6, ch - 6);
      ctx.textAlign = "left"; ctx.font = `700 ${W * .03}px Cinzel`; ctx.fillStyle = k % 7 === 0 ? GRANATE : TINTA; ctx.fillText(String(d), cx + cw * .1, cy + W * .038);
      let ly = cy + W * .068; const fs = W * .0205;
      for (const [t, tp] of es.sort((a, b) => (a[1] === "m" ? -1 : 1))) {
        ctx.font = (tp === "m" ? `700 ${fs * 1.08}px Figtree, sans-serif` : `600 ${fs}px Figtree, sans-serif`); ctx.fillStyle = tp === "m" ? GRANATE : tp === "p" ? VINO : OROS;
        for (const l of lineas(ctx, t, cw * .88)) { if (ly > cy + ch - 8) break; ctx.fillText(l, cx + cw * .07, ly); ly += fs * 1.18; }
        ly += fs * .25;
      }
    }
    ctx.textAlign = "center"; pie(ctx, W, H);
  }
  function cierre(ctx, W, H) {
    fondo(ctx, W, H); llaves(ctx, W / 2, H * .14, W * .05);
    ctx.fillStyle = VINO; ctx.font = `700 ${W * .048}px Cinzel`; ctx.fillText("Oración de protección", W / 2, H * .26);
    ctx.font = `italic 600 ${W * .03}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE; ctx.fillText("para rezar en familia al empezar cada mes", W / 2, H * .3);
    const t = "Señor, ponemos en tus manos este mes y a cada uno de los nuestros. Guarda nuestra casa de todo mal, a los que salen y a los que vuelven, a los que están sanos y a los que están enfermos. San Miguel Arcángel, defiéndenos; ángeles de la guarda, acompáñennos; María, Madre nuestra, cúbrenos con tu manto. Y bendice al Papa León XIV, que reza por todas las familias del mundo. Amén.";
    ctx.font = `500 ${W * .038}px "Cormorant Garamond"`; ctx.fillStyle = TINTA; let y = H * .38; lineas(ctx, t, W * .74).forEach(l => { ctx.fillText(l, W / 2, y); y += W * .056; });
    ctx.font = `italic 500 ${W * .026}px "Cormorant Garamond"`; ctx.fillStyle = SUAVE;
    lineas(ctx, "Cada mañana, una oración breve en el canal de WhatsApp del Padre Samuel y Junto al Papa. Más oraciones en padresamuel.github.io", W * .7).forEach((l, i) => ctx.fillText(l, W / 2, H * .86 + i * W * .036));
    pie(ctx, W, H);
  }
  const paginas = () => [["Portada", portada], ["Tus fechas", fechasFam], ...MESES.map((m, i) => [m, (c, W, H) => mes(c, W, H, i)]), ["Oración de protección", cierre]];

  function pinta() { const ps = paginas(); st.pag = Math.min(st.pag, ps.length - 1); const cv = $("#cvPag"); ps[st.pag][1](cv.getContext("2d"), cv.width, cv.height); $("#numPag").textContent = `${ps[st.pag][0]} · ${st.pag + 1} de ${ps.length}`; }
  const irMes = m => { if (+m) { st.pag = 1 + +m; pinta(); } };
  function filas() {
    const cont = $("#fechas"); cont.innerHTML = "";
    st.fechas.forEach((f, i) => {
      const r = document.createElement("div"); r.className = "fecha";
      r.innerHTML = `<input class="campo" maxlength="30" placeholder="${i ? "Otro nombre" : "Nombre, por ejemplo: Rosa"}" aria-label="Nombre"><select class="campo tipo" aria-label="Qué se celebra">${TIPOS.map(t => `<option value="${t.id}">${t.t}</option>`).join("")}</select><select class="campo dia" aria-label="Día"><option value="">Día</option>${Array.from({ length: 31 }, (_, k) => `<option>${k + 1}</option>`).join("")}</select><select class="campo mesel" aria-label="Mes"><option value="">Mes</option>${MESES.map((m, k) => `<option value="${k + 1}">${m}</option>`).join("")}</select>${i ? '<button type="button" class="quita" aria-label="Quitar">×</button>' : ""}`;
      const [inp, tp, dd, mm] = r.querySelectorAll("input,select"); inp.value = f.n; tp.value = f.t; dd.value = f.d; mm.value = f.m;
      inp.oninput = () => { f.n = inp.value; st.pag = f.m ? 1 + +f.m : 1; pinta(); };
      tp.onchange = () => { f.t = tp.value; pinta(); };
      dd.onchange = () => { f.d = dd.value; irMes(f.m); };
      mm.onchange = () => { f.m = mm.value; irMes(f.m); };
      const q = r.querySelector(".quita"); if (q) q.onclick = () => { st.fechas.splice(i, 1); filas(); pinta(); };
      cont.appendChild(r);
    });
    $("#mas").hidden = st.fechas.length >= 20;
  }
  function pdf() {
    const { jsPDF } = window.jspdf, d = new jsPDF({ unit: "mm", format: "a4", compress: true });
    paginas().forEach(([, f], i) => { const c = document.createElement("canvas"); c.width = 1654; c.height = 2339; f(c.getContext("2d"), c.width, c.height); if (i) d.addPage(); d.addImage(c.toDataURL("image/jpeg", .88), "JPEG", 0, 0, 210, 297); });
    d.setProperties({ title: "Calendario de protección de la familia " + Y, creator: "Junto al Papa" });
    d.save(`Calendario de protección de la familia ${Y}.pdf`);
  }
  function envia(ev) {
    ev.preventDefault(); const av = $("#aviso");
    const nombre = limpia($("#nombre").value), tel = $("#tel").value.replace(/[^\d]/g, ""), pais = $("#pais").value;
    const incompleta = st.fechas.find(f => limpia(f.n) && !(+f.d && +f.m));
    if (!validas().length) { av.textContent = "Escribe al menos un nombre con su día y su mes en el paso 1."; document.querySelector("#fechas input").focus(); return; }
    if (incompleta) { av.textContent = `Falta el día o el mes de ${limpia(incompleta.n)}.`; return; }
    if (!nombre) { av.textContent = "Escribe tu nombre."; $("#nombre").focus(); return; }
    if (tel.length < 7) { av.textContent = "Revisa tu número de WhatsApp: parece que falta algo."; $("#tel").focus(); return; }
    av.textContent = ""; st.tu = nombre; st.pag = 0; pinta();
    const pre = (PAISES.find(x => x[0] === pais) || [, ""])[1];
    // Solo viajan nombre, WhatsApp y país. Los nombres y fechas de la familia NO se envían.
    const datos = new URLSearchParams({ nombre, whatsapp: (pre ? "+" + pre + " " : "") + tel, pais, regalo: "Calendario de protección", acepta: "si", avisos: "si", web: $("#web").value });
    const clave = "ps_enviado_cal_" + tel; let ya = false; try { ya = !!sessionStorage.getItem(clave); sessionStorage.setItem(clave, "1"); } catch (e) {}
    if (C.COMUNIDAD_ENDPOINT && !ya) { try { fetch(C.COMUNIDAD_ENDPOINT, { method: "POST", mode: "no-cors", body: datos, keepalive: true }); } catch (e) {} }
    try { pdf(); } catch (e) {}
    $("#fNombre").textContent = nombre.split(" ")[0]; $("#finCanal").href = C.WHATSAPP || "../../";
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
    $("#mas").onclick = () => { st.fechas.push({ n: "", d: "", m: "", t: "cumple" }); filas(); const ins = document.querySelectorAll("#fechas input"); ins[ins.length - 1].focus(); };
    $("#ant").onclick = () => { st.pag = Math.max(0, st.pag - 1); pinta(); };
    $("#sig").onclick = () => { st.pag = Math.min(paginas().length - 1, st.pag + 1); pinta(); };
    $("#nombre").oninput = e => { st.tu = e.target.value; st.pag = 0; pinta(); };
    $("#form").addEventListener("submit", envia); $("#bajaPDF").onclick = pdf;
    await Promise.all(['700 40px Cinzel', '600 40px Cinzel', '500 40px "Cormorant Garamond"', 'italic 600 40px "Cormorant Garamond"', 'italic 500 40px "Cormorant Garamond"', '700 20px Figtree', '600 20px Figtree'].map(f => document.fonts.load(f)));
    const h = $("#cvHeroe"); mes(h.getContext("2d"), h.width, h.height, 4);
    st.pag = 0; pinta();
  }
  inicia();
})();
