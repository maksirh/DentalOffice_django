
async function getDentists() {
    const response = await fetch("/api/dentists", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const dentists = await response.json();
        const rows = document.querySelector("tbody");
        dentists.forEach(dentist => rows.append(row(dentist)));
    }
}

async function getDentist(id) {
    const response = await fetch(`/api/dentists/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const dentist = await response.json();
        document.getElementById("dentistId").value = dentist._id;
        document.getElementById("dentistName").value = dentist.name;
        document.getElementById("dentistAge").value = dentist.age;
        document.getElementById("dentistExp").value = dentist.experience;
        document.getElementById("dentistPhone").value = dentist.phoneNumber;

    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function createDentist() {
  const dentistName = document.getElementById("dentistName").value.trim();
  const ageRaw      = document.getElementById("dentistAge").value;
  const expRaw      = document.getElementById("dentistExp").value;
  const dentistPhone= document.getElementById("dentistPhone").value.trim();

  const age = Number(ageRaw);
  const exp = Number(expRaw);

  if (!dentistName || Number.isNaN(age) || Number.isNaN(exp) || !dentistPhone) {
    alert("Заповніть усі поля коректно!");
    return;
  }

  const response = await fetch("/api/dentists/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: dentistName,
      age,
      experience: exp,
      phoneNumber: dentistPhone
    })
  });

  if (response.ok) {
    const dentist = await response.json();
    document.querySelector("tbody").append(row(dentist));
  } else {
    const { detail } = await response.json();
    console.error(detail);
    alert("Помилка: " + JSON.stringify(detail));
  }
}
// ---- Редагування ----
async function editDentist(id) {
  const name  = document.getElementById("dentistName").value.trim();
  const age   = Number(document.getElementById("dentistAge").value);
  const exp   = Number(document.getElementById("dentistExp").value);
  const phone = document.getElementById("dentistPhone").value.trim();

  if (!name || Number.isNaN(age) || Number.isNaN(exp) || !phone) {
    alert("Заповніть усі поля коректно!");
    return;
  }

  // 2) Відправляємо PUT /api/dentists/{id}
  const res = await fetch(`/api/dentists/${id}`, {
    method : "PUT",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify({ name, age, experience: exp, phoneNumber: phone })
  });

  // 3) Обробляємо відповідь
  if (res.ok) {
    const updated = await res.json();
    // якщо бекенд повертає to_str_id, id не змінюється
    document.querySelector(`tr[data-rowid='${id}']`)
            ?.replaceWith(row(updated));
    reset();                               // очистити форму
  } else {
    // при 4xx/5xx тіло може бути порожнє, тому try/catch
    let detail = "Unknown error";
    try { ({ detail } = await res.json()); } catch(_) {}
    console.error(detail);
    alert("Не вдалося оновити: " + detail);
  }
}

// Видалення користувача
async function deleteDentist(id) {
    const response = await fetch(`/api/dentists/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const dentist = await response.json();
        document.querySelector(`tr[data-rowid='${dentist.id}']`).remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

function reset() {
    document.getElementById("dentistId").value =
        document.getElementById("dentistName").value =
        document.getElementById("dentistAge").value = "";
}

function row(dentist) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", dentist.id);

    const nameTd = document.createElement("td");
    nameTd.append(dentist.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(dentist.age);
    tr.append(ageTd);

    const expTd = document.createElement("td");
    expTd.append(dentist.experience);
    tr.append(expTd);

    const phoneTd = document.createElement("td");
    phoneTd.append(dentist.phoneNumber);
    tr.append(phoneTd);

    const linksTd = document.createElement("td");
    const editLink = document.createElement("button");
    editLink.append("Змінити");
    editLink.addEventListener("click", async () => await getDentist(dentist._id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Видалити");
    removeLink.addEventListener("click", async () => await deleteDentist(dentist._id));
    linksTd.append(removeLink);

    tr.appendChild(linksTd);
    return tr;
}



document.getElementById("resetBtn").addEventListener("click", () => reset());

document.getElementById("saveBtn").addEventListener("click", async () => {
    const id = document.getElementById("dentistId").value;
    const name = document.getElementById("dentistName").value;
    const age = document.getElementById("dentistAge").value;
    const exp = document.getElementById("dentistExp").value;
    const phone = document.getElementById("dentistPhone").value;

    if (id === "")
        await createDentist(name, age, exp, phone);
    else
        await editDentist(id);

    reset();
});

getDentists();

