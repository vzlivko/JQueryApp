"use strict";

$(document).ready(() => {
  let task = [];
  let taskNumber,
    uncheckedItems = 0;
  const ENTER_KEY = 13;
  const COLORS = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];

  $(".color_buttons").append(creatingColorButtons());
  $(".control_buttons").append(
    `<button class='add_task'> Add</button >
      <button class='delete_task'>Delete</button>
      <button class='select_all'>Select all tasks</button>
      <button class='unselect_all'>Unselect all tasks</button>`
  );
  $(".radio_group").append(
    `<input type='radio' name='categories' id='all' checked>All</input>
      <input type='radio' name='categories' id='active'>Active</input>
      <input type='radio' name='categories' id='completed'>Completed</input>`
  );
  $("body").append(`<div class="items_left" hidden></div>`);

  if (localStorage.getItem("taskNumber") != null) {
    taskNumber = localStorage.getItem("taskNumber");
    for (let i = 0; i < taskNumber; i++) {
      if (localStorage.getItem(`item${i}`)) {
        task.push(JSON.parse(localStorage.getItem(`item${i}`)));
        createDOM(task[task.length - 1]);
      }
    }
    task.forEach(item => {
      if (item.checked == false) uncheckedItems += 1;
    });
    if (task.length) changeItemsLeftCount();
  } else {
    taskNumber = 0;
    localStorage.setItem("taskNumber", 0);
  }

  function tasks(title) {
    task.push({
      title: title,
      color: COLORS[Math.round(Math.random() * 6)],
      checked: false,
      id: "item" + taskNumber++
    });
    localStorage.setItem("taskNumber", taskNumber);
    createDOM(task[task.length - 1]);
    localStorage.setItem(
      `${task[task.length - 1].id}`,
      JSON.stringify(task[task.length - 1])
    );
  }

  function changeItemsLeftCount() {
    $(".items_left")
      .attr("hidden", false)
      .text(`${uncheckedItems} items left`);
  }

  function lineThrough(item) {
    if (item.checked) lineThroughTextAndFilter(item.id, "line-through", true);
    else lineThroughTextAndFilter(item.id, "none", false);
  }

  function saveTitle(id) {
    let title = $(`input[type=text]#${id}`).val();
    $(`input[type=text]#${id}`).replaceWith(`<span id='${id}'></span>`);
    let taskItem = task.find(element => {
      if (element.id == id) return element;
    });
    changeTitle(taskItem, title);
    lineThrough(taskItem);
  }

  function createDOM(newItem) {
    $(".tasks").append(
      `<div style='background-color:${newItem.color}' class='${newItem.id}'><input type='checkbox' name='items' id='${newItem.id}'><span id='${newItem.id}'>${newItem.title}</span><button id='delete${newItem.id}'>X</div>`
    );
    $(".tasks").on("dblclick", `span#${newItem.id}`, item => {
      let id = item.target.id;
      let text = $(`span#${id}`).text();
      $(`span#${id}`).replaceWith(
        `<input type='text' id='${id}' value=${text}>`
      );
      $(`input[type=text]#${id}`).focus();
      $(`input[type=text]#${id}`).on("focusout", () => saveTitle(id));
      $(`input[type=text]#${id}`).on("keydown", key => {
        if (key.which == ENTER_KEY) saveTitle(id);
      });
    });
    $(`#${newItem.id}`).prop("checked", newItem.checked);
    lineThrough(newItem);
    $(`#delete${newItem.id}`).on("click", () => {
      if (!newItem.checked) {
        uncheckedItems -= 1;
        changeItemsLeftCount();
      }
      task = task.filter(item => {
        if (item.id == newItem.id) deleteDOM(newItem.id);
        else return item;
      });
      if (!task.length) {
        $(`.radio_group`).attr("hidden", true);
        $(`.items_left`).attr("hidden", true);
      }
    });
    if ($("#completed").attr("checked"))
      $(`div.${newItem.id}`).attr("hidden", true);
    $(`#${newItem.id}`).on("change", () => {
      newItem.checked = !newItem.checked;
      if (newItem.checked) uncheckedItems -= 1;
      else uncheckedItems += 1;
      changeItemsLeftCount();
      $(`#${newItem.id}`).prop("checked", newItem.checked);
      lineThrough(newItem);
      localStorage.setItem(`${newItem.id}`, JSON.stringify(newItem));
    });
    $(".task_title").val("");
    $(".radio_group").attr("hidden", false);
    $(".items_left").attr("hidden", false);
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

  function addTask() {
    if ($(`.task_title`).val()) {
      tasks($(`.task_title`).val());
      uncheckedItems += 1;
      changeItemsLeftCount();
    } else alert("Enter title");
  }

  function changeFilter(item, hidden) {
    if (item.checked) $(`div.${item.id}`).attr("hidden", hidden);
    else $(`div.${item.id}`).attr("hidden", !hidden);
  }

  function changeAllChecks(checked) {
    task.map(item => {
      item.checked = checked;
      $(`#${item.id}`).prop("checked", checked);
      lineThrough(item);
      localStorage.setItem(`${item.id}`, JSON.stringify(item));
      return item;
    });
    if (checked) uncheckedItems = 0;
    else uncheckedItems = task.length;
    changeItemsLeftCount();
  }

  COLORS.forEach(color => {
    $(`.color_buttons #${color}`).on("click", () => {
      task = task.map(item => {
        if (item.checked) changeColor(item, color);
        return item;
      });
    });
  });

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
    if (!task.length) {
      $(`.radio_group`).attr("hidden", true);
      $(`.items_left`).attr("hidden", true);
    }
  });

  $(".select_all").on("click", () => changeAllChecks(true));

  $(".unselect_all").on("click", () => changeAllChecks(false));
});
