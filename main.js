const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.getElementById('skor');
const pop = document.getElementById('pop');

let selesai;
let skor;
let tanahSebelumnya;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya == tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(200, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function start() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, 10000);
}

function pukulTikus() {
  if (!selesai) {
    skor++;
  } else {
    skor = '0';
    Swal.fire({
      text: `Waktu Kamu Sudah habis`,
      showDenyButton: true,
      confirmButtonText: 'Mantap! ',
      denyButtonText: `Ok`,
    }).then((result) => {
      // disable button
      for (const btn of this.gamePlayEL.children) {
        btn.disabled = true;
      }
      if (result.isDenied) {
        Swal.fire('Permainan Sudah direset ayo main lagi ', '', 'info');
      }
    });
  }
  papanSkor.textContent = skor;
  this.parentNode.classList.remove('muncul');
  pop.play();
}

tikus.forEach(function (t) {
  t.addEventListener('click', pukulTikus);
});
