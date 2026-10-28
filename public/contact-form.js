document.querySelector("form")?.addEventListener("submit", function () {
  var checked = Array.from(document.querySelectorAll("[data-project-type]:checked")).map(function (e) { return e.value; });
  document.getElementById("project-type-combined").value = checked.join(", ");
});
// Show the message for /api/contact's ?status= redirect (the page is prerendered)
(function () {
  var formStatus = new URLSearchParams(window.location.search).get("status");
  var message = formStatus && document.querySelector('[data-status-message="' + CSS.escape(formStatus) + '"]');
  if (message) message.hidden = false;
})();
