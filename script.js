const tanggalNikah = new Date("2026-11-08T00:00:00").getTime();

function updateCountdown() {
    const sekarang = new Date().getTime();
    const selisih = tanggalNikah - sekarang;

    const elemenWaktu = {
        hari: document.getElementById("hari"),
        jam: document.getElementById("jam"),
        menit: document.getElementById("menit"),
        detik: document.getElementById("detik")
    };

    if (selisih <= 0) {
        Object.values(elemenWaktu).forEach(function (elemen) {
            elemen.textContent = "00";
        });
        return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    elemenWaktu.hari.textContent = hari;
    elemenWaktu.jam.textContent = String(jam).padStart(2, "0");
    elemenWaktu.menit.textContent = String(menit).padStart(2, "0");
    elemenWaktu.detik.textContent = String(detik).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const formRSVP = document.getElementById("formRSVP");

if (formRSVP) {
    const namaRSVP = document.getElementById("namaRSVP");
    const modalRSVPElemen = document.getElementById("modalRSVP");
    const modalBerhasilElemen = document.getElementById("modalBerhasil");

    const modalRSVP = new bootstrap.Modal(modalRSVPElemen);
    const modalBerhasil = new bootstrap.Modal(modalBerhasilElemen);

    const sapaanRSVP = document.getElementById("sapaanRSVP");
    const pesanErrorRSVP = document.getElementById("pesanErrorRSVP");
    const tombolKonfirmasi = document.getElementById("tombolKonfirmasi");
    const detailBerhasil = document.getElementById("detailBerhasil");

    let namaTamu = "";

    formRSVP.addEventListener("submit", function (event) {
        event.preventDefault();

        namaTamu = namaRSVP.value.trim();

        if (namaTamu === "") {
            namaRSVP.focus();
            return;
        }

        sapaanRSVP.textContent =
            "Halo, " + namaTamu +
            "! Silakan pilih acara yang akan Anda hadiri.";

        pesanErrorRSVP.classList.remove("tampil");

        document.querySelectorAll('input[name="pilihanAcara"]')
            .forEach(function (pilihan) {
                pilihan.checked = false;
            });

        modalRSVP.show();
    });

    tombolKonfirmasi.addEventListener("click", function () {
        const pilihan = document.querySelector(
            'input[name="pilihanAcara"]:checked'
        );

        if (!pilihan) {
            pesanErrorRSVP.classList.add("tampil");
            return;
        }

        detailBerhasil.textContent =
            "Terima kasih, " + namaTamu +
            "! Konfirmasi kehadiran Anda untuk " +
            pilihan.value + " berhasil.";

        modalRSVPElemen.addEventListener(
            "hidden.bs.modal",
            function tampilkanModalBerhasil() {
                modalBerhasil.show();
            },
            { once: true }
        );

        modalRSVP.hide();
    });
}

const musikUndangan = document.getElementById("musikUndangan");
const tombolMusik = document.getElementById("tombolMusik");
const ikonMusik = document.getElementById("ikonMusik");

if (musikUndangan && tombolMusik && ikonMusik) {
    tombolMusik.addEventListener("click", function () {
        if (musikUndangan.paused) {
            musikUndangan.play()
                .then(function () {
                    ikonMusik.textContent = "❚❚";
                    tombolMusik.setAttribute("aria-label", "Jeda musik");
                    tombolMusik.setAttribute("aria-pressed", "true");
                })
                .catch(function () {
                    alert("Musik belum bisa diputar. Coba periksa file audionya.");
                });
        } else {
            musikUndangan.pause();
            ikonMusik.textContent = "▶";
            tombolMusik.setAttribute("aria-label", "Putar musik");
            tombolMusik.setAttribute("aria-pressed", "false");
        }
    });
}