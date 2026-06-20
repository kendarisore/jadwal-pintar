const STORAGE_KEYS = {
  TASKS: "jadwal_pintar_tasks",
  CONDITION: "jadwal_pintar_condition",
  TARGETS: "jadwal_pintar_targets",
  STREAKS: "jadwal_pintar_streaks",
  HISTORY: "jadwal_pintar_history"
};

// =========================
// TASKS
// =========================

function getTasks() {

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEYS.TASKS
    )
  ) || [];

}

function saveTasks(tasks) {

  localStorage.setItem(
    STORAGE_KEYS.TASKS,
    JSON.stringify(tasks)
  );

}

// =========================
// KONDISI HARIAN
// =========================

function getCondition() {

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEYS.CONDITION
    )
  ) || {
    energy: "sedang",
    availableTime: "4",
    focus: "campuran"
  };

}

function saveConditionData(data) {

  localStorage.setItem(
    STORAGE_KEYS.CONDITION,
    JSON.stringify(data)
  );

}

// =========================
// TARGET BULANAN
// =========================

function getTargets() {

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEYS.TARGETS
    )
  ) || {
    salesTarget: 5,
    salesCurrent: 0,

    savingTarget: 500000,
    savingCurrent: 0,

    tilawahTarget: 30,
    tilawahCurrent: 0,

    englishTarget: 30,
    englishCurrent: 0
  };

}

function saveTargets(data) {

  localStorage.setItem(
    STORAGE_KEYS.TARGETS,
    JSON.stringify(data)
  );

}

// =========================
// STREAK
// =========================

function getStreaks() {

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEYS.STREAKS
    )
  ) || {
    tilawah: 0,
    english: 0,
    dzikir: 0,
    olahraga: 0
  };

}

function saveStreaks(data) {

  localStorage.setItem(
    STORAGE_KEYS.STREAKS,
    JSON.stringify(data)
  );

}

// =========================
// HISTORI HARIAN
// =========================

function getHistory() {

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEYS.HISTORY
    )
  ) || [];

}

function saveHistory(data) {

  localStorage.setItem(
    STORAGE_KEYS.HISTORY,
    JSON.stringify(data)
  );

}

// =========================
// RESET DATA
// =========================

function resetAllData() {

  const confirmReset =
    confirm(
      "Yakin ingin menghapus seluruh data?"
    );

  if (!confirmReset) return;

  localStorage.removeItem(
    STORAGE_KEYS.TASKS
  );

  localStorage.removeItem(
    STORAGE_KEYS.CONDITION
  );

  localStorage.removeItem(
    STORAGE_KEYS.TARGETS
  );

  localStorage.removeItem(
    STORAGE_KEYS.STREAKS
  );

  localStorage.removeItem(
    STORAGE_KEYS.HISTORY
  );

  location.reload();

}

// =========================
// BACKUP DATA
// =========================

function exportBackup() {

  const backup = {

    tasks: getTasks(),

    condition: getCondition(),

    targets: getTargets(),

    streaks: getStreaks(),

    history: getHistory(),

    exportedAt:
      new Date().toISOString()

  };

  const blob = new Blob(
    [
      JSON.stringify(
        backup,
        null,
        2
      )
    ],
    {
      type:
      "application/json"
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    "jadwal-pintar-backup.json";

  a.click();

  URL.revokeObjectURL(url);

}

// =========================
// RESTORE DATA
// =========================

function importBackup(file) {

  const reader =
    new FileReader();

  reader.onload = function(e) {

    const data =
      JSON.parse(
        e.target.result
      );

    if (data.tasks)
      saveTasks(data.tasks);

    if (data.condition)
      saveConditionData(
        data.condition
      );

    if (data.targets)
      saveTargets(
        data.targets
      );

    if (data.streaks)
      saveStreaks(
        data.streaks
      );

    if (data.history)
      saveHistory(
        data.history
      );

    alert(
      "Backup berhasil dipulihkan"
    );

    location.reload();

  };

  reader.readAsText(file);

}
