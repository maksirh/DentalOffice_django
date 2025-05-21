document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/users/me", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            console.log("Користувач не авторизований");
            return;
        }

        const data = await response.json();
        console.log("Отримано користувача:", data);
        if (data) {
        document.getElementById("user-name").style.display = "block";
        document.querySelector("#user-name a").textContent = data.username;

        document.getElementById("logout").style.display = "block";
        document.querySelector("#logout a").textContent = "Exit";

        document.querySelector('a[href="/login"]').style.display = "none";
        document.querySelector('a[href="/register"]').style.display = "none";
        }

    } catch (error) {
        console.error("Помилка отримання користувача:", error);
    }
});
