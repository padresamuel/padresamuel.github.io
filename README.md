# El escudo de tu familia — Oraciones del Padre Samuel

Web estática y gratis (GitHub Pages). Todo se dibuja en el navegador: no hay servidor ni base de datos.

- `index.html` + `escudo.js` — elegir protector, escribir el apellido, vista previa (escudo / en tu casa / en el móvil), formulario y descargas (PDF A4 con la bendición de la casa, fondo de móvil, estado de WhatsApp, portada de Facebook).
- `protectores.js` — los 8 protectores, su frase y su línea de la bendición.
- `config.js` — `FORM_ENDPOINT` vacío = modo local (no se guarda nada). Al crear la cuenta de correo se pone aquí la URL del formulario.
- `arte/` — arte propio: `<id>.png` 1024x1536, `<id>_mini.jpg`, `mockup_puerta.png`.
- `hoy/` — la oración del día; `hoy.json` lo rellenará el generador diario.
- `privacidad/` — política de privacidad (actualizar al activar los correos).

Probar en local: `python3 -m http.server 8765` en esta carpeta y abrir http://localhost:8765

## Pendiente
- Sección «Junto al Papa · el Vaticano por dentro»: colección de llaves del Vaticano numeradas, con premio para quien la complete.
