
// steroids.view.navigationBar.show("Hello World");
function showModal(modal) {
  var webView = new steroids.views.WebView(modal);
  steroids.modal.show(webView);
}

function previewDolanImage() {
  var fileView = new steroids.views.PreviewFileView("images/dolan.png");
  steroids.modal.show(fileView);
}