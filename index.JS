function buscarFruta() {
  let fruta = document.getElementById("fruta").value.toLowerCase();
  let resultado = document.getElementById("resultado");

  // Quitar iluminación
  document.querySelectorAll(".fruta").forEach(f => {
    f.classList.remove("activa");
  });

  if (document.getElementById(fruta)) {
    document.getElementById(fruta).classList.add("activa");
    resultado.textContent = "✅ Fruta encontrada: " + fruta;
  } else {
    resultado.textContent = "❌ Fruta no encontrada.";
