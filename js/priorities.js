function calculateTaskScore(
  task,
  condition
) {

  let score = 0;

  score += Number(task.impact || 0) * 40;

  score += Number(task.deadline || 0) * 30;

  if (
    task.category === "bisnis"
  ) {
    score += 50;
  }

  if (
    condition &&
    condition.focus === task.category
  ) {
    score += 75;
  }

  if (
    condition &&
    condition.energy === "rendah"
  ) {

    if (
      task.name
      .toLowerCase()
      .includes("meeting")
    ) {
      score -= 40;
    }

    if (
      task.name
      .toLowerCase()
      .includes("survey")
    ) {
      score -= 40;
    }

  }

  if (
    condition &&
    condition.energy === "tinggi"
  ) {

    if (
      task.category === "bisnis"
    ) {
      score += 30;
    }

  }

  return score;

}

function getTopPriorities(
  tasks,
  condition
) {

  return tasks
    .filter(t => !t.completed)
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
    .slice(0, 3);

}

function renderPriorities(
  tasks,
  condition
) {

  const container =
    document.getElementById(
      "topPriorities"
    );

  if (!container) return;

  container.innerHTML = "";

  const topTasks =
    getTopPriorities(
      tasks,
      condition
    );

  if (topTasks.length === 0) {

    container.innerHTML = `
      <p>
        Belum ada kegiatan.
      </p>
    `;

    return;

  }

  topTasks.forEach(
    (task, index) => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "priority-card";

      item.innerHTML = `
        <strong>
          #${index + 1}
          ${task.name}
        </strong>
        <br>
        <small>
          ${task.category}
        </small>
      `;

      container.appendChild(
        item
      );

    }
  );

}
