document.querySelector("form")?.addEventListener("submit", function () {
  var checked = Array.from(document.querySelectorAll("[data-project-type]:checked")).map(function (e) { return e.value; });
  document.getElementById("project-type-combined").value = checked.join(", ");
});
