// Configuración de la web del regalo. Todo gratis: GitHub Pages + formulario del proveedor de correo.
window.PS_CONFIG = {
  // Al crear la cuenta de correo (Brevo / MailerLite / Kit), aquí va la URL del formulario de alta.
  // Vacío = MODO LOCAL: no se guarda ni se envía nada, la descarga se da directamente.
  FORM_ENDPOINT: "",
  CANAL_YOUTUBE: "https://www.youtube.com/@PadreSamueloraciones",
  CANAL_WHATSAPP: "",   // enlace del canal de WhatsApp cuando exista
  // Todos los canales donde aparece el Padre Samuel.
  CANALES: [
    { nombre: "Oraciones del Padre Samuel", idioma: "Español", que: "Noticias del Papa y de la Iglesia, y una oración al final de cada vídeo", url: "https://www.youtube.com/@PadreSamueloraciones", foto: "fotos/canal_es1.jpg" },
    { nombre: "A Catholic Coffee", idioma: "English", que: "Catholic news and Church teaching, explained honestly, in English", url: "https://www.youtube.com/channel/UC4rCsaEfIYP0Y5ZH5UGnWiw", foto: "fotos/canal_acc.jpg" }
  ],
  // Posición del texto sobre el arte (fracciones del alto/ancho del arte 2:3). Se ajustan al llegar el arte final.
  NOMBRE_Y: 0.700, NOMBRE_ANCHO: 0.60,
  FRASE_Y: 0.857, FRASE_ANCHO: 0.40,
  // Rectángulo blanco del cuadro en arte/mockup_puerta.png (fracciones). Se mide al llegar el arte.
  PUERTA_RECT: { x: 0.62, y: 0.22, w: 0.18, h: 0.40 }
};
