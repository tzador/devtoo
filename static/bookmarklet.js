(function () {
  if (location.href.match(/^https:\/\/dev.to\/[^\/]+\/[^\/]+$/)) {
    location.href = location.href.replace(/https:\/\/dev.to\//, "https://devtoo.dev/");
  } else {
    var ogTitle = document.querySelector(`meta[property='og:title']`);
    var title = (ogTitle && ogTitle.getAttribute("content")) || document.title;
    var ogDescription = document.querySelector(`meta[property='og:description']`);
    var description = (ogDescription && ogDescription.getAttribute("content")) || "";
    console.log(description);
    var q = title + "." + description;
    var url = "https://devtoo.dev/search?q=" + encodeURIComponent(q.trim());
    location.href = url;
  }
})();
