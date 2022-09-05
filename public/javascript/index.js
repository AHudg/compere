const effect = document.getElementById("cursor-effect");

async function mouseMoved(event) {
  effect.style.left = event.pageX + "px";
  effect.style.top = event.pageY + "px";
}

document.querySelector("body").addEventListener("mousemove", mouseMoved);
