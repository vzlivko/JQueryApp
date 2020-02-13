"use strict";

$(document).ready(() => {
  let task = [];
  let taskNumber;
  const ENTER_KEY = 13;
  const COLORS = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];
  //localStorage.clear();

  if (localStorage.getItem("taskNumber") != null)
    taskNumber = localStorage.getItem("taskNumber");
  else {
    taskNumber = 0;
    localStorage.setItem("taskNumber", 0);
  }

  for (let i = 0; i <= taskNumber; i++) {
    if (localStorage.getItem(`item${i}`)) {
      task.push(JSON.parse(localStorage.getItem(`item${i}`)));
      createDOM(task[task.length - 1]);
    }
  }

  $(".color_buttons").append(creatingColorButtons());
  $(".control_buttons").append(
    `<button class='add_task'> Add</button >
      <button class='delete_task'>Delete</button>
      <button class='edit_task'>Edit</button>`
  );
  $(".radio_group").append(
    `<input type='radio' name='categories' id='all' checked>All</input>
      <input type='radio' name='categories' id='active'>Active</input>
      <input type='radio' name='categories' id='completed'>Completed</input>`
  );

  const tasks = function createNewTask(title) {
    localStorage.setItem("taskNumber", taskNumber);
    task.push({
      title: title,
      color: COLORS[Math.round(Math.random() * 6)],
      checked: false,
      id: "item" + taskNumber++
    });
    createDOM(task[task.length - 1]);
    localStorage.setItem(
      `item${taskNumber - 1}`,
      JSON.stringify(task[task.length - 1])
    );
  };

  function createDOM(newItem) {
    $(".tasks").append(
      `<div style='background-color:${newItem.color}' class='${newItem.id}'><input type='checkbox' checked=${newItem.checked} name='items' id='${newItem.id}'><span id='${newItem.id}'>${newItem.title}</span><button id='delete${newItem.id}'>X</div>`
    );
    $(`#delete${newItem.id}`).on("click", () => {
      task = task.filter(item => {
        if (item.id == newItem.id) deleteDOM(newItem.id);
        else return item;
      });
      if (!task.length) $(`.radio_group`).attr("hidden", true);
    });
    if ($("#completed").attr("checked"))
      $(`div.${newItem.id}`).attr("hidden", true);
    $(`#${newItem.id}`).on("change", () => {
      newItem.checked = !newItem.checked;
      if (newItem.checked)
        lineThroughTextAndFilter(newItem.id, "line-through", true);
      else lineThroughTextAndFilter(newItem.id, "none", false);
      localStorage.setItem(`${newItem.id}`, JSON.stringify(newItem));
    });
    $(".task_title").val("");
    $(".radio_group").attr("hidden", false);
  }

  function deleteDOM(id) {
    $(`div.${id}`).remove();
    localStorage.removeItem(id);
  }

  function changeTitle(item, title) {
    item.title = title;
    $(`span#${item.id}`).text(title);
    localStorage.setItem(`${item.id}`, JSON.stringify(item));
  }

  function changeColor(item, color) {
    item.color = color;
    $(`div.${item.id}`).css("background-color", color);
    localStorage.setItem(`${item.id}`, JSON.stringify(item));
  }

  function lineThroughTextAndFilter(id, textDecoration, hidden) {
    $(`span#${id}`).css("text-decoration", textDecoration);
    if ($(`#active`).attr("checked")) $(`div.${id}`).attr("hidden", hidden);
    if ($(`#completed`).attr("checked")) $(`div.${id}`).attr("hidden", !hidden);
  }

  function creatingColorButtons() {
    let htmlString = ``;
    COLORS.forEach(item => {
      htmlString += `<button id='${item}'>${item}</button >`;
    });
    return htmlString;
  }

  function colorButtonClick(color) {
    $(`.color_buttons #${color}`).on("click", () => {
      task = task.map(item => {
        if (item.checked) changeColor(item, color);
        return item;
      });
    });
  }
  for (let i = 0; i < COLORS.length; i++) colorButtonClick(COLORS[i]);

  function addTask() {
    if ($(`.task_title`).val() != "") tasks($(`.task_title`).val());
    else alert("Enter title");
  }

  function changeFilter(item, hidden) {
    if (item.checked) $(`div.${item.id}`).attr("hidden", hidden);
    else $(`div.${item.id}`).attr("hidden", !hidden);
  }

  $("#all").on("change", () => {
    task.forEach(item => {
      $(`div.${item.id}`).attr("hidden", false);
    });
  });

  $("#active").on("change", () => {
    task.forEach(item => changeFilter(item, true));
  });

  $("#completed").on("change", () => {
    task.forEach(item => changeFilter(item, false));
  });

  $(`.task_title`).on("keydown", key => {
    if (key.which == ENTER_KEY) addTask();
  });

  $(".add_task").on("click", () => addTask());

  $(".delete_task").on("click", () => {
    let selected = false;

    task = task.filter(item => {
      if (item.checked) {
        deleteDOM(item.id);
        selected = true;
      } else return item;
    });
    if (!selected) alert("Choose tasks to delete");
    if (!task.length) $(`.radio_group`).attr("hidden", true);
  });

  $(".edit_task").on("click", () => {
    let count = 0;
    task.forEach(item => {
      if (item.checked) count += 1;
    });
    if (count > 1) alert("Select no more than one item");
    else if (!count) alert("Select item");
    else {
      if ($(".task_title").val())
        task = task.map(item => {
          if (item.checked) changeTitle(item, $(".task_title").val());
          return item;
        });
      else alert("Enter new title for task");
    }
    $(".task_title").val("");
  });
});
