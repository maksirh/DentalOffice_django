document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("exit-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            try {
                const response = await fetch("/api/users/logout", {
                    method: "POST",
                    credentials: "include"
                });

                if (response.ok) {
                    console.log("Logout successful");
                    window.location.href = "/login";
                } else {
                    const error = await response.json();
                    console.error("Logout error:", error.message);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        });
    } else {
        console.error("Кнопка виходу (exit-button) не знайдена!");
    }
});
