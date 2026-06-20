const DEFAULT_ROUTINES = [
  {
    id: "subuh",
    title: "Sholat Subuh",
    category: "ibadah"
  },
  {
    id: "dzuhur",
    title: "Sholat Dzuhur",
    category: "ibadah"
  },
  {
    id: "ashar",
    title: "Sholat Ashar",
    category: "ibadah"
  },
  {
    id: "maghrib",
    title: "Sholat Maghrib",
    category: "ibadah"
  },
  {
    id: "isya",
    title: "Sholat Isya",
    category: "ibadah"
  },
  {
    id: "tilawah",
    title: "Tilawah Al-Qur'an",
    category: "ibadah"
  },
  {
    id: "dzikir-pagi",
    title: "Dzikir Pagi",
    category: "ibadah"
  },
  {
    id: "dzikir-sore",
    title: "Dzikir Sore",
    category: "ibadah"
  },
  {
    id: "english",
    title: "Belajar Bahasa Inggris",
    category: "pengembangan"
  },
  {
    id: "olahraga",
    title: "Olahraga Ringan",
    category: "kesehatan"
  },
  {
    id: "keluarga",
    title: "Quality Time Keluarga",
    category: "keluarga"
  }
];

function renderRoutines() {

  const container =
    document.getElementById(
      "routineContainer"
    );

  if (!container) return;

  container.innerHTML = "";

  DEFAULT_ROUTINES.forEach(item => {

    const row =
      document.createElement("div");

    row.className = "routine-item";

    row.innerHTML = `
      <label class="routine-row">
        <input
          type="checkbox"
          onchange="toggleRoutine('${item.id}')"
        >
        <span>${item.title}</span>
      </label>
    `;

    container.appendChild(row);

  });

}
