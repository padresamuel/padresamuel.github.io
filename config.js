// Configuración de la web del regalo. Todo gratis: GitHub Pages + formulario del proveedor de correo.
window.PS_CONFIG = {
  // Al crear la cuenta de correo (Brevo / MailerLite / Kit), aquí va la URL del formulario de alta.
  // Vacío = MODO LOCAL: no se guarda ni se envía nada, la descarga se da directamente.
  FORM_ENDPOINT: "",
  // Receptor propio (Google Apps Script en la cuenta del proyecto): guarda nombre, WhatsApp, país y consentimiento en una hoja PRIVADA.
  COMUNIDAD_ENDPOINT: "https://script.google.com/macros/s/AKfycbzklIGgCmCXzkacSfwlZ5_2oP31xLctq9tVhXZy2nz1wiyj_BgoitP4Py76jppkZu8L3Q/exec",
  // Número de WhatsApp Business del Padre Samuel, solo dígitos con prefijo (ej. "34600111222"). Vacío = botón oculto.
  WA_NEGOCIO: "",
  CANAL_YOUTUBE: "https://www.youtube.com/@PadreSamueloraciones",
  CANAL_WHATSAPP: "",   // enlace del canal de WhatsApp cuando exista
  // Todos los canales donde aparece el Padre Samuel.
  WHATSAPP: "https://whatsapp.com/channel/0029Vb9DT8B7z4kWSmZ1iD2T",
  CANALES: [
    { nombre: "Canal de WhatsApp", idioma: "WhatsApp", que: "Una oración corta cada mañana en tu celular, gratis y sin cadenas", url: "https://whatsapp.com/channel/0029Vb9DT8B7z4kWSmZ1iD2T", foto: "fotos/canal_whatsapp.jpg" },
    { nombre: "Oraciones del Padre Samuel", idioma: "Español", que: "Noticias del Papa y de la Iglesia, y una oración al final de cada vídeo", url: "https://www.youtube.com/@PadreSamueloraciones", foto: "fotos/canal_es1.jpg" },
    { nombre: "Junto al Papa", idioma: "Español", que: "El Vaticano por dentro: la vida, la casa y las personas cercanas al Papa León XIV", url: "https://www.youtube.com/@JuntoAlPapa", foto: "fotos/canal_junto.jpg" }
  ],
  // Posición del texto sobre el arte (fracciones del alto/ancho del arte 2:3). Se ajustan al llegar el arte final.
  NOMBRE_Y: 0.700, NOMBRE_ANCHO: 0.60,
  FRASE_Y: 0.857, FRASE_ANCHO: 0.40,
  // Rectángulo blanco del cuadro en arte/mockup_puerta.png (fracciones). Se mide al llegar el arte.
  PUERTA_RECT: { x: 0.62, y: 0.22, w: 0.18, h: 0.40 }
};
