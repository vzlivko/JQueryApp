"use strict";

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
        "><input type='checkbox' id=" +
        this.id +
        "><span id=" +
        this.id +
        ">" +
        title +
        "</span></input></div>"
    );
    taskNumber++;
    $(".task_title").val("");
  }
}

function changeColors(color) {
  $(".color_buttons #" + color).on("click", () => {
    $("input:checkbox:checked").each(function() {
      for (let i = 0; i < task.length; i++)
        if (task[i].id == $(this).attr("id") && (task[i].checked = true)) {
          $("div." + $(this).attr("id")).css("background-color", color);
        }
    });
  });
}

let task = [];
let taskNumber = 0;
let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];

$(".add_task").on("click", function() {
  if ($(".task_title").val() != "")
    task[task.length] = new Task($(".task_title").val(), taskNumber);
});

$(".delete_task").on("click", function() {
  $("input:checkbox:checked").each(function() {
    for (let i = 0; i < task.length; i++)
      if (task[i].id == $(this).attr("id") && (task[i].checked = true)) {
        $("div." + $(this).attr("id")).remove();
        task.splice(i, 1);
      }
  });
});
//

$(".edit_task").on("click", function() {});

changeColors(colors[0]);
changeColors(colors[1]);
changeColors(colors[2]);
changeColors(colors[3]);
changeColors(colors[4]);
changeColors(colors[5]);
changeColors(colors[6]);
