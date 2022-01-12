const piano = document.querySelector('.piano');

const playAudioClip = (e) => {
  const target = e.target.closest('a');

  if (target) {
    const url = `audio/key-${target.dataset.ind}.mp3`;
    const audioObj = new Audio(url);
    audioObj.play();
  }
};

piano.addEventListener('click', playAudioClip);
