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

        if (data.role === "admin") {
            const adminButtons = document.getElementById("admin-buttons");
            adminButtons.style.display = "block";

            document.getElementById("dentistRegPage").addEventListener("click", function() {
                window.location.href = "/dentalreg";
            });

            document.getElementById("patientRegPage").addEventListener("click", function() {
                window.location.href = "/patientreg";
            });
        }
    } catch (error) {
        console.error("Помилка отримання користувача:", error);
    }
});
