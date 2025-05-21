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

        const user = await response.json();
        console.log("Дані користувача:", user);

        document.getElementById("profile-username").textContent = user.username;
        document.getElementById("profile-role").textContent = user.role;
        document.getElementById("profile-id").textContent = user.id;

    } catch (error) {
        console.error("Помилка завантаження профілю:", error);
    }
});
