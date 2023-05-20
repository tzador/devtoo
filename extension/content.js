console.log("content.js");
if (location.href.match(/^https:\/\/dev.to\/[^\/]+\/[^\/]+$/)) {
  const a = document.createElement("a");
  a.innerText = "Related Articles";
  a.href = location.href.replace(/https:\/\/dev.to\//, "https://devtoo.dev/");
  a.style.marginRight = "1rem";
  document.querySelector(".flex.items-center.h-100").prepend(a);
}
