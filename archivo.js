// 1. Año automático
document.getElementById("anio").textContent = new Date().getFullYear();

// 2. Menú hamburguesa (móvil)
const btnMenu = document.getElementById("btnMenu");
const listaMenu = document.getElementById("listaMenu");
btnMenu.addEventListener("click", () => {
  const abierto = listaMenu.classList.toggle("abierto");
  btnMenu.setAttribute("aria-expanded", abierto);
});
listaMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => listaMenu.classList.remove("abierto"))
);

// 3. Tema claro / oscuro (se recuerda si el navegador lo permite)
const btnTema = document.getElementById("btnTema");
const ICONO_LUNA = "\uD83C\uDF19";
const ICONO_SOL = "\u2600\uFE0F";
function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  btnTema.textContent = oscuro ? ICONO_SOL + " Claro" : ICONO_LUNA + " Oscuro";
}
try { aplicarTema(localStorage.getItem("tema") === "oscuro"); } catch (e) {}
btnTema.addEventListener("click", () => {
  const oscuro = !document.body.classList.contains("oscuro");
  aplicarTema(oscuro);
  try { localStorage.setItem("tema", oscuro ? "oscuro" : "claro"); } catch (e) {}
});

// 4. Botón "Leer más"
const btnMas = document.getElementById("btnMas");
const masInfo = document.getElementById("masInfo");
btnMas.addEventListener("click", () => {
  const oculto = masInfo.classList.toggle("oculto");
  btnMas.textContent = oculto ? "Leer más" : "Leer menos";
});

// 5. Filtros de la tabla de habilidades
const filtros = document.querySelectorAll(".filtro");
const filas = document.querySelectorAll("#tablaHabilidades tbody tr");
filtros.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtros.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    const f = btn.dataset.filtro;
    filas.forEach((fila) => {
      fila.style.display = f === "todas" || fila.dataset.tipo === f ? "" : "none";
    });
  });
});

// 6. Barras de nivel animadas al aparecer
const barras = document.querySelectorAll(".barra");
function llenarBarras() {
  barras.forEach((b) => (b.firstElementChild.style.width = b.dataset.nivel + "%"));
}
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entradas) => {
    if (entradas.some((e) => e.isIntersecting)) { llenarBarras(); obs.disconnect(); }
  });
  obs.observe(document.getElementById("habilidades"));
} else {
  llenarBarras();
}

// 7. Copiar teléfono
const aviso = document.getElementById("avisoCopiar");
document.getElementById("btnCopiar").addEventListener("click", async () => {
  const tel = document.getElementById("telefono").textContent;
  try {
    await navigator.clipboard.writeText(tel);
    aviso.textContent = "Teléfono copiado: " + tel;
  } catch (e) {
    aviso.textContent = "No se pudo copiar. El número es " + tel;
  }
  setTimeout(() => (aviso.textContent = ""), 3000);
});

// 8. Imprimir / guardar como PDF
document.getElementById("btnImprimir").addEventListener("click", () => window.print());

// 9. Formulario: abre WhatsApp con el mensaje escrito
const form = document.getElementById("formContacto");
const respuesta = document.getElementById("respuesta");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  if (!nombre || !mensaje) {
    respuesta.textContent = "Escribe tu nombre y tu mensaje.";
    respuesta.className = "error";
    return;
  }
  const texto = encodeURIComponent("Hola Marbel, soy " + nombre + ". " + mensaje);
  window.open("https://wa.me/18094531128?text=" + texto, "_blank", "noopener");
  respuesta.textContent = "¡Gracias, " + nombre + "! Se abrió WhatsApp para enviar tu mensaje.";
  respuesta.className = "ok";
  form.reset();
});

// 10. Mostrar solo la sección elegida en el menú
const enlaces = document.querySelectorAll(".menu a");
const paneles = document.querySelectorAll(".panel");
function mostrar(id) {
  paneles.forEach((p) => p.classList.toggle("visible", p.id === id));
  enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
enlaces.forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    mostrar(a.getAttribute("href").slice(1));
  })
);
mostrar("portada");

// 11. Botón volver arriba
const btnArriba = document.getElementById("btnArriba");
window.addEventListener("scroll", () => {
  btnArriba.classList.toggle("visible", window.scrollY > 400);
});
btnArriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));