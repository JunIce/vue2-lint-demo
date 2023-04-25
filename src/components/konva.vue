<template>
  <div>
    <div id="container"></div>
    <textarea id="textarea"></textarea>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import Konva from "konva";
export default {
  name: "KonvaDemo",
  setup() {
    onMounted(() => {
      const textarea = document.querySelector("#textarea");
      var stage = new Konva.Stage({
        container: "container",
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // add canvas element
      var layer = new Konva.Layer();
      stage.add(layer);

      // create shape
      // var box = new Konva.Rect({
      //   x: 50,
      //   y: 50,
      //   width: 100,
      //   height: 50,
      //   fill: "#00D2FF",
      //   stroke: "black",
      //   strokeWidth: 4,
      //   draggable: true,
      // });
      // layer.add(box);

      // var circle = new Konva.Circle({
      //   x: 200,
      //   y: 200,
      //   radius: 70,
      //   fill: "red",
      //   stroke: "black",
      //   strokeWidth: 4,
      //   draggable: true,
      // });
      // layer.add(circle);

      // var complexText = new Konva.Text({
      //   x: 30,
      //   y: 20,
      //   text: "COMPLEX TEXT\n\nAll the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
      //   fontSize: 18,
      //   fontFamily: "Calibri",
      //   fill: "#555",
      //   width: 300,
      //   padding: 20,
      //   align: "center",
      // });

      // layer.add(complexText);

      // // add cursor styling
      // box.on("mouseover", function () {
      //   document.body.style.cursor = "pointer";
      // });
      // box.on("mouseout", function () {
      //   document.body.style.cursor = "default";
      // });

      // layer.on("click", function (e) {
      //   console.log("you clicked/touched me!");
      //   console.log(e);
      // });

      const textNode = new Konva.Text({
        x: 20,
        y: 20,
        width: window.innerWidth - 40,
        fontSize: 30,
        fontFamily: "Calibri",
        fill: "green",
      });

      layer.add(textNode);

      textarea.addEventListener("input", (e) => {
        console.log(e.target.value);
        textNode.text(e.target.value);
      });
    });
  },
};
</script>

<style scoped>
textarea {
  position: absolute;
  top: 200px;
  left: 100px;
  width: 100px;
}
</style>
