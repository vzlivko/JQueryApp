"use strict";

$(document).ready(() => {
  let task = [];
  let taskNumber = 0;
  const COLORS = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];

  $(".color_buttons").append(
    `<button id='red'> Red</button >
      <button id='orange'>Orange</button>
      <button id='yellow'>Yellow</button>
      <button id='green'>Green</button> 
      <button id='cyan'>Cyan</button>
      <button id='blue'>Blue</button>
      <button id='purple'>Purple</button></div >`
  );
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
    task.push({
      title: title,
      color: COLORS[Math.round(Math.random() * 6)],
      checked: false,
      id: "item" + taskNumber++,
      createDOM() {
        $(".tasks").append(
          `<div style='background-color:${this.color}' class='${this.id}'><input type='checkbox' name='items' id='${this.id}'><span id='${this.id}'>${this.title}</span><button id='delete${this.id}'>X</div>`
        );
        $(`#delete${this.id}`).on("click", () => {
          task = task.filter(item => {
            if (item.id == this.id) item.deleteDOM();
            else return item;
          });
          if (!task.length) $(`.radio_group`).attr("hidden", true);
        });
        if ($("#completed").attr("checked"))
          $(`div.${this.id}`).attr("hidden", true);
        $(`#${this.id}`).on("change", () => {
          this.checked = !this.checked;
          if (this.checked) this.lineThroughTextAndFilter("line-through", true);
          else this.lineThroughTextAndFilter("none", false);
        });
        $(".task_title").val("");
        $(".radio_group").attr("hidden", false);
      },
      deleteDOM() {
        $(`div.${this.id}`).remove();
      },
      changeTitle(title) {
        this.title = title;
        $(`span#${this.id}`).text(title);
      },
      changeColor(color) {
        this.color = color;
        $(`div.${this.id}`).css("background-color", color);
      },
      lineThroughTextAndFilter(textDecoration, hidden) {
        $(`span#${this.id}`).css("text-decoration", textDecoration);
        if ($(`#active`).attr("checked"))
          $(`div.${this.id}`).attr("hidden", hidden);
        if ($(`#completed`).attr("checked"))
          $(`div.${this.id}`).attr("hidden", !hidden);
      }
    });
    task[task.length - 1].createDOM();
  };

  function colorButtonClick(color) {
    $(`.color_buttons #${color}`).on("click", () => {
      task = task.map(item => {
        if (item.checked) item.changeColor(color);
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
    if (key.which == 13) addTask();
  });

  $(".add_task").on("click", () => addTask());

  $(".delete_task").on("click", () => {
    let count = 0;
    task = task.filter(item => {
      if (item.checked) {
        item.deleteDOM();
        count += 1;
      } else return item;
    });
    if (!count) alert("Choose tasks to delete");
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
          if (item.checked) item.changeTitle($(".task_title").val());
          return item;
        });
      else alert("Enter new title for task");
    }
    $(".task_title").val("");
  });
});
