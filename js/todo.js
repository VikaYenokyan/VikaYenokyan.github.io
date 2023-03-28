document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector("#new-task-form"),
          input = document.querySelector("#new-task-input"),
          listItem = document.querySelector("#tasks");

    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        
        const task = input.value;
        task.trim();

        if (!task){
            alert("Please fill out the task");
            return;
        } 

        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        const taskItemContent = document.createElement("div");
        taskItemContent.classList.add("content");

        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.classList.add("input-checkbox");
        checkbox.name = "ch";
        checkbox.type = "checkbox";

        label.append(checkbox);

        const i = document.createElement("i");
        i.classList.add("checkbox");

        label.append(i);

        taskItemContent.append(label);

        const text = document.createElement("input");
        text.classList.add("text");
        text.type = "text";
        text.value = task;
        text.setAttribute("readonly", "readonly");
        taskItemContent.append(text);


        const actions = document.createElement("div");
        actions.classList.add("actions");
        
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");

        const editImg = document.createElement("img");
        editImg.src = "icons/edit.svg";
        editImg.alt="edit";

        editBtn.append(editImg);
        actions.append(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");

        const deleteImg = document.createElement("img");
        deleteImg.src = "icons/delete.svg";
        deleteImg.alt="delete";

        deleteBtn.append(deleteImg);
        actions.append(deleteBtn);

        taskItemContent.append(actions);

        taskItem.append(taskItemContent);
        listItem.append(taskItem);

        input.value = "";

        checkbox.addEventListener('change', (e) => {
            if (e.currentTarget.checked) {
              text.style.textDecoration = "line-through";
            } else {
                text.style.textDecoration = "none";
            }
        });

        editBtn.addEventListener('click', () => {

            if(!checkbox.checked){
                text.removeAttribute("readonly");
                text.focus();

                const saveBtn = document.createElement("button");
                saveBtn.classList.add("save");

                const saveImg = document.createElement("img");
                saveImg.src = "icons/save.svg";
                saveImg.alt="save";

                saveBtn.append(saveImg);

                editBtn.replaceWith(saveBtn);

                saveBtn.addEventListener('click', () =>{
                    text.setAttribute("readonly", "readonly");
                    saveBtn.replaceWith(editBtn);
                });
            }
        });

        deleteBtn.addEventListener('click', () => {
            listItem.removeChild(taskItem);
        });
    });
});