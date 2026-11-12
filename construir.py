#!/usr/bin/env python3
"""Genera la biblioteca de oraciones (oraciones/ y oraciones/<slug>/) a partir de oraciones.json.
Uso: python3 construir.py   (después: git add -A && git commit)"""
import json, html, os
R = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(R, "oraciones.json"), encoding="utf-8"))
BASE_URL = "https://padresamuel.github.io/"   # cambiar al dominio real

def cabeza(titulo, desc, raiz, og="fotos/retrato_patio_ancha.jpg"):
    return f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(titulo)} · Oraciones del Padre Samuel</title>
<meta name="description" content="{html.escape(desc)}">
<meta property="og:title" content="{html.escape(titulo)}"><meta property="og:description" content="{html.escape(desc)}"><meta property="og:image" content="{raiz}{og}">
<meta name="theme-color" content="#3d0c16">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{raiz}estilos.css"></head>"""

def parrafos(t):
    return "".join(f"<span>{html.escape(l)}</span><br>" for l in t.split("\n"))

def pagina(o):
    raiz = "../../"
    trad = o.get("tradicional"); cita = o.get("cita")
    cuerpo = ""
    if o.get("texto"):
        cuerpo += f'<section class="rezo"><p class="antetitulo">Recemos</p><div class="rezo-texto">{parrafos(o["texto"])}</div></section>'
    if trad:
        cuerpo += f'<section class="rezo trad"><p class="antetitulo">{"Oración tradicional" if o.get("texto") else "La oración"}</p><h2>{html.escape(trad["titulo"])}</h2><div class="rezo-texto">{parrafos(trad["texto"])}</div></section>'
    if cita:
        cuerpo += f'<blockquote class="cita-biblia">«{html.escape(cita["texto"])}»<cite>{html.escape(cita["ref"])}</cite></blockquote>'
    otras = [x for x in D if x["slug"] != o["slug"]][:3]
    comp = html.escape(f'{o["titulo"]} — rézala aquí: {BASE_URL}oraciones/{o["slug"]}/')
    return cabeza(o["titulo"], o["intro"], raiz, o["foto"]) + f"""
<body data-raiz="{raiz}" data-seccion="oraciones">
<div id="cabecera"></div>
<main class="oracion-pag">
  <header class="oracion-cab">
    <img class="oracion-foto" src="{raiz}{o['foto']}" alt="El Padre Samuel" width="400" height="500">
    <div>
      <p class="antetitulo"><a href="{raiz}oraciones/">Oraciones</a> · {html.escape(o['necesidad'])}</p>
      <h1>{html.escape(o['titulo'])}</h1>
      <p class="entrada">{html.escape(o['intro'])}</p>
      <a class="boton claro" href="https://wa.me/?text={comp}" rel="noopener">💬 Enviarla por WhatsApp</a>
    </div>
  </header>
  {cuerpo}
  <section class="relacionadas"><p class="antetitulo">Otras oraciones</p>
    <div class="necesidades">{''.join(f'<a class="nec" href="{raiz}oraciones/{x["slug"]}/"><span>{x["icono"]}</span><b>{html.escape(x["titulo"])}</b><small>{html.escape(x["necesidad"])}</small></a>' for x in otras)}</div>
  </section>
  <section class="regalo-mini"><div><p class="antetitulo">Un regalo para tu casa</p><h2>El escudo de tu familia, gratis</h2><p>Con tu apellido, el santo protector y la bendición de la casa.</p></div><a class="boton" href="{raiz}escudo/">Crear el mío</a></section>
</main>
<div id="pie"></div>
<script src="{raiz}config.js"></script><script src="{raiz}partes.js"></script>
</body></html>"""

def indice():
    raiz = "../"
    tarjetas = "".join(f'<a class="nec grande" href="{x["slug"]}/"><span>{x["icono"]}</span><b>{html.escape(x["titulo"])}</b><small>{html.escape(x["necesidad"])}</small></a>' for x in D)
    return cabeza("Oraciones para cada momento", "Oraciones católicas para la mañana, la noche, la protección, los enfermos, la familia y los difuntos.", raiz) + f"""
<body data-raiz="{raiz}" data-seccion="oraciones">
<div id="cabecera"></div>
<main class="biblioteca">
  <p class="antetitulo">Biblioteca</p>
  <h1>¿Qué necesitas rezar hoy?</h1>
  <p class="entrada">Oraciones para cada momento de la vida. Puedes leerlas aquí o enviárselas a quien las necesite.</p>
  <div class="necesidades">{tarjetas}</div>
</main>
<div id="pie"></div>
<script src="{raiz}config.js"></script><script src="{raiz}partes.js"></script>
</body></html>"""

os.makedirs(os.path.join(R, "oraciones"), exist_ok=True)
open(os.path.join(R, "oraciones", "index.html"), "w", encoding="utf-8").write(indice())
for o in D:
    d = os.path.join(R, "oraciones", o["slug"]); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(pagina(o))
print("oraciones:", len(D))
