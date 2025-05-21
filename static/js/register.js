async function createUser(userName, userPassword) {
    const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: userName,
            password: userPassword
        })
    });
}

function reset() {
    document.getElementById("userId").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("userPassword").value = "";
}

document.getElementById("saveUser").addEventListener("click", async () => {
    const id = document.getElementById("userId").value;
    const name = document.getElementById("userName").value;
    const password = document.getElementById("userPassword").value;

    if (id === "")
        await createUser(name, password);
    //else
        //await editPatient(id, name, age);

    reset();
});