async function getPatients() {
    const response = await fetch("/api/patients", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const patients = await response.json();
        const rows = document.querySelector("tbody");
        patients.forEach(patient => rows.append(row(patient)));
    }
}

async function getPatient(id) {
    const response = await fetch(`/api/patients/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const user = await response.json();
        document.getElementById("patientId").value = user._id;
        document.getElementById("patientName").value = user.name;
        document.getElementById("patientAge").value = user.age;
        document.getElementById("patientPhone").value = user.phoneNumber;
    } else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function createPatient() {
  const patientName = document.getElementById("patientName").value.trim();
  const ageRaw = document.getElementById("patientAge").value;
  const patientPhone = document.getElementById("patientPhone").value.trim();

  const age = Number(ageRaw);

  const response = await fetch("/api/patients/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: patientName,
      age,
      phoneNumber: patientPhone
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

async function editDentist(id) {
  const name  = document.getElementById("patientName").value.trim();
  const age   = Number(document.getElementById("patientAge").value);
  const exp   = Number(document.getElementById("patientExp").value);
  const phone = document.getElementById("patientPhone").value.trim();

  if (!name || Number.isNaN(age) || Number.isNaN(exp) || !phone) {
    alert("Заповніть усі поля коректно!");
    return;
  }

  // 2) Відправляємо PUT /api/dentists/{id}
  const res = await fetch(`/api/patients/${id}`, {
    method : "PUT",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify({ name, age, phoneNumber: phone })
  });

  // 3) Обробляємо відповідь
  if (res.ok) {
    const updated = await res.json();
    document.querySelector(`tr[data-rowid='${id}']`)
            ?.replaceWith(row(updated));
    reset();
  } else {
    let detail = "Unknown error";
    try { ({ detail } = await res.json()); } catch(_) {}
    console.error(detail);
    alert("Не вдалося оновити: " + detail);
  }
}

async function deletePatient(id) {
    const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        document.querySelector(`tr[data-rowid='${id}']`).remove();
    } else {
        const error = await response.json();
        console.log(error.message);
    }
}

function reset() {
    document.getElementById("patientId").value = "";
    document.getElementById("patientName").value = "";
    document.getElementById("patientAge").value = "";
    document.getElementById("patientPhone").value = "";
}

function row(user) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user._id);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const phoneTd = document.createElement("td");
    phoneTd.append(user.phoneNumber);
    tr.append(phoneTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("Змінити");
    editLink.addEventListener("click", async () => await getPatient(user._id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Видалити");
    removeLink.addEventListener("click", async () => await deletePatient(user._id));
    linksTd.append(removeLink);

    tr.appendChild(linksTd);
    return tr;
}

document.getElementById("savePat").addEventListener("click", async () => {
    const id = document.getElementById("patientId").value;
    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const phoneNumber = document.getElementById("patientPhone").value;

    if (id === "")
        await createPatient(name, age, phoneNumber);
    else
        await editPatient(id);

    reset();
});

getPatients();
