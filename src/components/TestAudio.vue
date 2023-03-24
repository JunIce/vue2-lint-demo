<template>
  <div>
    <input type="file" ref="file" @change="getFileBlob" />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DemoInput",
  setup() {
    const file = ref(null);

    const source = ref(document.createElement("audio"));

    const mediaSource = new MediaSource();
    const mimeCodec = `audio/mp4;`;

    source.value.src = URL.createObjectURL(mediaSource);

    onMounted(() => {
      mediaSource.addEventListener("sourceopen", onSourceOpen);
    });

    function getFileBlob() {
      const blob = URL.createObjectURL(file.value.files[0]);
      source.value.src = blob;
      source.value.play();
    }

    function _getFileBlob() {
      const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

      fileToBlob(file.value.files[0], async (blob) => {
        var buffer = await blob.arrayBuffer();
        console.log(buffer);
        sourceBuffer.appendBuffer(buffer);
        source.value.play();

        sourceBuffer.addEventListener("updateend", function (_) {
          mediaSource.endOfStream();
          //   video.play();
          //console.log(mediaSource.readyState); // ended
        });
      });
    }

    function fileToBlob(file, cb) {
      let reader = new FileReader();
      reader.addEventListener("load", (e) => {
        let base64 = e.target.result;
        let blob = new Blob([base64], { type: file.type });
        console.log("Blob对象", blob);
        cb(blob);
      });
      reader.readAsDataURL(file);
    }

    function onSourceOpen(e) {
      console.log(e);
    }

    return {
      file,
      getFileBlob,
    };
  },
});
</script>

<style></style>
