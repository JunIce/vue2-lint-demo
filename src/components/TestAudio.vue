<template>
  <div>
    <!-- <audio ref="audioRef"></audio> -->
    <input type="file" ref="fileRef">
    <button @click="play">play</button>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DemoInput",
  setup() {
    const fileRef = ref(null)
    const audioRef = ref(document.createElement("audio"));

    const mediaSource = new MediaSource();
    let mimeCodec = `audio/mpeg`;
    let sourceBuffer

    onMounted(() => {
      audioRef.value.muted = true;
      audioRef.value.autoplay = true;
      audioRef.value.controls = true;
      audioRef.value.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", onSourceOpen);
    });

    const getRemoteFile = () => {
      fetch("http://127.0.0.1:8081/1111.mp3", {})
        .then((res) => res.arrayBuffer())
        .then((res) => {
          console.log("res", res);

          sourceBuffer.appendBuffer(res);
        });
    };

    function play() {
      // remote
      getRemoteFile();
      // local read
      // readFile();
    }

    function readFile() {
      const file = fileRef.value.files[0];

      const reader = new FileReader();

      reader.onloadend = function(e) {
        sourceBuffer.appendBuffer(e.target.result);
      }

      reader.readAsArrayBuffer(file)
    }

    function onSourceOpen() {
      //
      if (MediaSource.isTypeSupported(mimeCodec) === false) {
        throw Error("mimeCodec not support")
      }
      sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
      sourceBuffer.addEventListener("updateend", function (_) {
        mediaSource.endOfStream();

        audioRef.value.play();
        audioRef.value.muted = false;

        console.log(mediaSource.readyState); // ended
      });
      sourceBuffer.addEventListener("error", function (error) {
        console.log(error);
      });
    }

    return {
      fileRef,
      audioRef,
      play,
    };
  },
});
</script>

<style>
audio {
  height: 100px;
}
</style>
