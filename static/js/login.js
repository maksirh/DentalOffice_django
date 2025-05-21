async function authUser(userName, userPassword) {
    const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: userName,
            password: userPassword
        })
    });

    if (response.ok) {
        const data = await response.json();
        alert("Вхід успішний: " + data.message);
        console.log(data.user);
    } else {
        const errorData = await response.json();
        alert("Помилка: " + errorData.detail);
    }
}

function reset() {
    document.getElementById("userName").value = "";
    document.getElementById("userPassword").value = "";
}

document.getElementById("authUser").addEventListener("click", async () => {
    const userName = document.getElementById("userName").value;
    const userPassword = document.getElementById("userPassword").value;

    await authUser(userName, userPassword);

    reset();
});
