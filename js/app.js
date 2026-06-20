let tasks = getTasks();
let condition = getCondition();

document.addEventListener("DOMContentLoaded", () => {

  renderRoutines();

  loadCondition();

  renderAllTasks();

  renderDashboard();

  renderPriorities(
    tasks,
    condition
  );

});

// =====================
// KONDISI HARIAN
// =====================

function loadCondition() {

  document.getElementById(
    "energy"
  ).value =
    condition.energy;

  document.getElementById(
    "availableTime"
  ).value =
    condition.availableTime;

  document.getElementById(
    "dailyFocus"
  ).value =
    condition.focus;

}

function saveCondition() {

  condition = {

    energy:
      document.getElementById(
        "energy"
      ).value,

    availableTime:
      document.getElementById(
        "availableTime"
      ).value,

    focus:
      document.getElementById(
        "dailyFocus"
      ).value

  };

  saveConditionData(
    condition
  );

  renderPriorities(
    tasks,
    condition
  );

  alert(
    "Kondisi hari ini disimpan"
  );

}

// =====================
// TAMBAH TUGAS
// =====================

function addTask() {

  const name =
    document.getElementById(
      "taskName"
    ).value.trim();

  const category =
    document.getElementById(
      "taskCategory"
    ).value;

  const impact =
    Number(
      document.getElementById(
        "taskImpact"
      ).value
    );

  const deadline =
    Number(
      document.getElementById(
        "taskDeadline"
      ).value
    );

  if (!name) {

    alert(
      "Masukkan kegiatan terlebih dahulu"
    );

    return;

  }

  const task = {

    id:
      Date.now(),

    name,

    category,

    impact,

    deadline,

    completed:
      false,

    createdAt:
      new Date()
      .toISOString()

  };

  tasks.push(task);

  saveTasks(tasks);

  document.getElementById(
    "taskName"
  ).value = "";

  renderAllTasks();

  renderDashboard();

  renderPriorities(
    tasks,
    condition
  );

}

// =====================
// TAMPILKAN TASK
// =====================

function renderAllTasks() {

  const container =
    document.getElementById(
      "taskContainer"
    );

  if (!container)
    return;

  container.innerHTML =
    "";

  if (
    tasks.length === 0
  ) {

    container.innerHTML =
      `
      <p>
      Belum ada kegiatan.
      </p>
    `;

    return;

  }

  tasks
    .sort(
      (a, b) =>
      calculateTaskScore(
        b,
        condition
      ) -
      calculateTaskScore(
        a,
        condition
      )
    )
    .forEach(task => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "task-card";

      div.innerHTML = `
        <div class="task-header">
          <strong>
            ${task.name}
          </strong>
        </div>

        <small>
          ${task.category}
        </small>

        <br>

        <small>
          Dampak:
          ${task.impact}
          |
          Deadline:
          ${task.deadline}
        </small>

        <br><br>

        <button
          onclick="
          toggleTask(
          ${task.id}
          )">
          ${
            task.completed
            ? "Batalkan"
            : "Selesai"
          }
        </button>

        <button
          onclick="
          deleteTask(
          ${task.id}
          )">
          Hapus
        </button>
      `;

      if (
        task.completed
      ) {

        div.style.opacity =
          "0.5";

      }

      container.appendChild(
        div
      );

    });

}

// =====================
// SELESAIKAN TASK
// =====================

function toggleTask(id) {

  tasks = tasks.map(
    task => {

      if (
        task.id === id
      ) {

        task.completed =
          !task.completed;

      }

      return task;

    }
  );

  saveTasks(tasks);

  renderAllTasks();

  renderDashboard();

  renderPriorities(
    tasks,
    condition
  );

}

// =====================
// HAPUS TASK
// =====================

function deleteTask(id) {

  const ok =
    confirm(
      "Hapus kegiatan ini?"
    );

  if (!ok)
    return;

  tasks =
    tasks.filter(
      task =>
      task.id !== id
    );

  saveTasks(tasks);

  renderAllTasks();

  renderDashboard();

  renderPriorities(
    tasks,
    condition
  );

}

// =====================
// DASHBOARD
// =====================

function renderDashboard() {

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      t =>
      t.completed
    ).length;

  const active =
    total -
    completed;

  const score =
    total === 0
    ? 0
    : Math.round(
        (
          completed /
          total
        ) * 100
      );

  document.getElementById(
    "productivityValue"
  ).innerText =
    score + "%";

  document.getElementById(
    "activeTaskCount"
  ).innerText =
    active;

  document.getElementById(
    "completedTaskCount"
  ).innerText =
    completed;

  const streaks =
    getStreaks();

  document.getElementById(
    "streakCount"
  ).innerText =
    streaks.tilawah || 0;

}

// =====================
// RUTINITAS
// =====================

function toggleRoutine(id) {

  const streaks =
    getStreaks();

  if (
    id === "tilawah"
  ) {

    streaks.tilawah += 1;

  }

  if (
    id === "english"
  ) {

    streaks.english += 1;

  }

  if (
    id === "dzikir-pagi" ||
    id === "dzikir-sore"
  ) {

    streaks.dzikir += 1;

  }

  if (
    id === "olahraga"
  ) {

    streaks.olahraga += 1;

  }

  saveStreaks(
    streaks
  );

  renderDashboard();

}

// =====================
// TARGET
// =====================

function loadTargets() {

  const targets =
    getTargets();

  document.getElementById(
    "salesTarget"
  ).innerText =
    `${targets.salesCurrent} / ${targets.salesTarget}`;

  document.getElementById(
    "savingTarget"
  ).innerText =
    `Rp ${targets.savingCurrent.toLocaleString("id-ID")}`;

  const tilawahPercent =
    Math.round(
      (
        targets.tilawahCurrent /
        targets.tilawahTarget
      ) * 100
    ) || 0;

  const englishPercent =
    Math.round(
      (
        targets.englishCurrent /
        targets.englishTarget
      ) * 100
    ) || 0;

  document.getElementById(
    "tilawahTarget"
  ).innerText =
    tilawahPercent + "%";

  document.getElementById(
    "englishTarget"
  ).innerText =
    englishPercent + "%";

}

loadTargets();
