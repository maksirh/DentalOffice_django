async function getAppointments() {
    const response = await fetch("/api/appointments", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const appointments = await response.json();
        const rows = document.querySelector("tbody");
        appointments.forEach(appointment => rows.append(row(appointment)));
    }
}

async function getAppointment(id) {
    const response = await fetch(`/api/appointments/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const appointment = await response.json();
        document.getElementById("appId").value = appointment.id;
        document.getElementById("appName").value = appointment.name;
        document.getElementById("appAge").value = appointment.age;
        document.getElementById("appPhone").value = appointment.phoneNumber;
        document.getElementById("appReason").value = appointment.reason;
    } else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function createAppointment(appName, appAge, appPhone, appReason) {
    const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: appName,
            age: parseInt(appAge, 10),
            phoneNumber: appPhone,
            reason: appReason
        })
    });

    if (response.ok) {
        const appointment = await response.json();
        document.querySelector("tbody").append(row(appointment));
    } else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function editAppointment(appId, appName, appAge, appPhone, appReason) {
    const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: appId,
            name: appName,
            age: parseInt(appAge, 10),
            phoneNumber: appPhone,
            reason: appReason
        })
    });

    if (response.ok) {
        const appointment = await response.json();
        document.querySelector(`tr[data-rowid='${appointment.id}']`).replaceWith(row(appointment));
    } else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function deleteAppointment(id) {
    const response = await fetch(`/api/appointments/${id}`, {
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
    document.getElementById("appId").value = "";
    document.getElementById("appName").value = "";
    document.getElementById("appAge").value = "";
    document.getElementById("appPhone").value = "";
    document.getElementById("appReason").value = "";
}

function row(appointment) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", appointment.id);

    const nameTd = document.createElement("td");
    nameTd.append(appointment.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(appointment.age);
    tr.append(ageTd);

    const phoneTd = document.createElement("td");
    phoneTd.append(appointment.phoneNumber);
    tr.append(phoneTd);

    const reasonTd = document.createElement("td");
    reasonTd.append(appointment.reason);
    tr.append(reasonTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("Змінити");
    editLink.addEventListener("click", async () => await getAppointment(appointment.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("Видалити");
    removeLink.addEventListener("click", async () => await deleteAppointment(appointment.id));
    linksTd.append(removeLink);

    tr.appendChild(linksTd);
    return tr;
}

document.getElementById("saveAppoint").addEventListener("click", async () => {
    const id = document.getElementById("appId").value;
    const name = document.getElementById("appName").value;
    const age = document.getElementById("appAge").value;
    const phoneNumber = document.getElementById("appPhone").value;
    const reason = document.getElementById("appReason").value;

    if (id === "")
        await createAppointment(name, age, phoneNumber, reason);
    else
        await editAppointment(id, name, age, phoneNumber, reason);

    reset();
});

getAppointments();