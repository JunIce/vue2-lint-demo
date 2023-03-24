<template>
  <div>
    <!-- <audio ref="audioRef"></audio> -->
    <button @click="play">play</button>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DemoInput",
  setup() {
    const audioRef = ref(document.createElement("audio"));

    const mediaSource = new MediaSource();
    let mimeCodec = `audio/mpeg`;

    onMounted(() => {
      audioRef.value.muted = true;
      audioRef.value.autoplay = true;
      audioRef.value.controls = true;
      audioRef.value.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", onSourceOpen);
    });

    const getRemoteFile = () => {
      const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

      fetch("http://127.0.0.1:8081/1111.mp3", {})
        .then((res) => res.arrayBuffer())
        .then((res) => {
          console.log("res", res);
          sourceBuffer.addEventListener("updateend", function (_) {
            mediaSource.endOfStream();

            audioRef.value.play();
            audioRef.value.muted = false;

            console.log(mediaSource.readyState); // ended
          });
          sourceBuffer.addEventListener("error", function (error) {
            console.log(error);
          });

          sourceBuffer.appendBuffer(res);
        });
    };

    function play() {
      getRemoteFile();
    }

    function onSourceOpen() {
      //
    }

    return {
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
