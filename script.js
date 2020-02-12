"use strict";

$(document).ready(() => {
  let task = [];
  let taskNumber = 0;
  let count = 0;
  const colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];

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
  //TODO change every + to ``
  $("#all").on("change", () => {
    $("input:checkbox[name=items]").each((index, item) => {
      $(`div.${item.id}`).attr("hidden", false);
    });
  });
  $("#active").on("change", () => {
    $("input:checkbox[name=items]").each((index, item) => {
      if (item.checked) $(`div.${item.id}`).attr("hidden", true);
      else $(`div.${item.id}`).attr("hidden", false);
    });
  });
  $("#completed").on("change", () => {
    $("input:checkbox[name=items]").each((index, item) => {
      if (item.checked) $(`div.${item.id}`).attr("hidden", false);
      else $(`div.${item.id}`).attr("hidden", true);
    });
  });

  const tasks = function createNewTask(title) {
    task.push({
      title: title,
      color: colors[Math.round(Math.random() * 6)],
      checked: false,
      id: taskNumber++,
      createDOM() {
        $(".tasks").append(
          `<div style='background-color:${this.color}' class='item${
            this.id
          }'><input type='checkbox' name='items' id=${
            this.id
          } onchange=${onCheck(this.id)}>${this.title}</div>`
        );
        $(".task_title").val("");
        $(".radio_group").attr("hidden", false);
      }
    });
    task[task.length - 1].createDOM();
  };
  //${onCheck(this.id)}
  //TODO Fix onCheck fucntion
  function onCheck(id) {
    //TODO Change every for loop in the code to map.filter,forEach e.t.c.
    alert(id);

    /*
    for (let i = 0; i < task.length; i++)
      if (id == task[i].id)
        if (task[i].checked == true) task[i].checked = false;
        else task[i].checked = true;
        */
  }

  function changeColors(color) {
    $(`.color_buttons #${color}`).on("click", () => {
      $(`input:checkbox[name=items]:checked`).each((index, item) => {
        for (let i = 0; i < task.length; i++)
          if (task[i].id == item.id) {
            $(`div.${item.id}`).css("background-color", color);
            task[i].color = color;
          }
      });
    });
  }

  $(".add_task").on("click", () => {
    if ($(`.task_title`).val() != "") tasks($(`.task_title`).val());
    else alert("Enter title");
  });

  $(".delete_task").on("click", () => {
    $(`input:checkbox[name=items]:checked`).each(() => {
      for (let i = 0; i < task.length; i++)
        if (task[i].id == $(this).attr("id")) {
          $(`div.${this.attr("id")}`).remove();
          task.splice(i, 1);
        }
    });

    if (!task[0]) $(`.radio_group`).attr("hidden", true);
  });

  $(".edit_task").on("click", () => {
    count = 0;
    $(`input:checkbox[name=items]:checked`).each(() => {
      count++;
    });
    if (count > 1) alert("Select no more than one item");
    else if (count == 0) alert("Select item");
    else {
      $(`input:checkbox[name=items]:checked`).each(() => {
        let item = $(
          `div span#${$("input:checkbox[name=items]:checked").attr("id")}`
        );
        if ($(`.task_title`).val() != "") {
          item.text($(".task_title").val());
          for (let i = 0; i < task.length; i++)
            if (task[i].id == item.attr("id"))
              task[i].title = $(`.task_title`).val();
        } else alert("Enter title");
      });
    }
  });
  //TODO fix it
  changeColors(colors[0]);
  changeColors(colors[1]);
  changeColors(colors[2]);
  changeColors(colors[3]);
  changeColors(colors[4]);
  changeColors(colors[5]);
  changeColors(colors[6]);
});
