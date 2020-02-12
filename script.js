"use strict";

$(document).ready(() => {
  $(".color_buttons").append(
    "<button id='red'> Red</button >" +
      "<button id='orange'>Orange</button>" +
      "<button id='yellow'>Yellow</button>" +
      "<button id='green'>Green</button>" +
      "<button id='cyan'>Cyan</button>" +
      "<button id='blue'>Blue</button>" +
      "<button id='purple'>Purple</button></div >"
  );
  $(".control_buttons").append(
    "<button class='add_task'> Add</button >" +
      "<button class='delete_task'>Delete</button>" +
      "<button class='edit_task'>Edit</button>"
  );
  $(".radio_group").append(
    "<input type='radio' name='categories' id='all' checked>All</input>" +
      "<input type='radio' name='categories' id='active'>Active</input>" +
      "<input type='radio' name='categories' id='completed'>Completed</input>"
  );

  $("#all").on("change", () => {
    $("input:checkbox[name=items]").each((index, item) => {
      $("div." + item.id).attr("hidden", false);
    });
  });
  $("#active").on("change", () => {
    $("input:checkbox[name=items]").each((index, item) => {
      if (item.checked) $("div." + item.id).attr("hidden", true);
      else $("div." + item.id).attr("hidden", false);
    });
  });
  $("#completed").on("change", () => {
    $("input:checkbox[name=items]").each((index, item) => {
      if (item.checked) $("div." + item.id).attr("hidden", false);
      else $("div." + item.id).attr("hidden", true);
    });
  });

  class Task {
    constructor(title, id) {
      this.title = title;
      this.color = colors[Math.round(Math.random() * 6)];
      this.checked = false;
      this.id = "item" + id;
      $(".tasks").append(
        "<div style='background-color:" +
          this.color +
          "' class=" +
          this.id +
          "><input type='checkbox' name='items' onchange='onCheck(this.id)' id=" +
          this.id +
          "><span id=" +
          this.id +
          ">" +
          title +
          "</span></input></div>"
      );
      taskNumber++;
      $(".task_title").val("");
      $(".radio_group").attr("hidden", false);
    }
  }

  function onCheck(id) {
    for (let i = 0; i < task.length; i++)
      if (id == task[i].id)
        if (task[i].checked == true) task[i].checked = false;
        else task[i].checked = true;
  }

  function changeColors(color) {
    $(".color_buttons #" + color).on("click", () => {
      $("input:checkbox[name=items]:checked").each(() => {
        for (let i = 0; i < task.length; i++)
          if (task[i].id == $(this).attr("id") && (task[i].checked = true)) {
            $("div." + $(this).attr("id")).css("background-color", color);
            task[i].color = color;
          }
      });
    });
  }

  let task = [];
  let taskNumber = 0;
  let count = 0;
  let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];

  $(".add_task").on("click", () => {
    if ($(".task_title").val() != "")
      task[task.length] = new Task($(".task_title").val(), taskNumber);
    else alert("Enter title");
  });

  $(".delete_task").on("click", () => {
    $("input:checkbox[name=items]:checked").each(function() {
      for (let i = 0; i < task.length; i++)
        if (task[i].id == $(this).attr("id")) {
          $("div." + $(this).attr("id")).remove();
          task.splice(i, 1);
        }
    });

    if (!task[0]) $(".radio_group").attr("hidden", true);
  });

  $(".edit_task").on("click", () => {
    count = 0;
    $("input:checkbox[name=items]:checked").each(() => {
      count++;
    });
    if (count > 1) alert("Select no more than one item");
    else if (count == 0) alert("Select item");
    else {
      $("input:checkbox[name=items]:checked").each(() => {
        let item = $(
          "div span#" + $("input:checkbox[name=items]:checked").attr("id")
        );
        if ($(".task_title").val() != "") {
          item.text($(".task_title").val());
          for (let i = 0; i < task.length; i++)
            if (task[i].id == item.attr("id"))
              task[i].title = $(".task_title").val();
        } else alert("Enter title");
      });
    }
  });

  changeColors(colors[0]);
  changeColors(colors[1]);
  changeColors(colors[2]);
  changeColors(colors[3]);
  changeColors(colors[4]);
  changeColors(colors[5]);
  changeColors(colors[6]);
});
