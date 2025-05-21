async function getReviews() {
    const response = await fetch("/api/reviews", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const reviews = await response.json();
        const rows = document.querySelector("tbody");
        reviews.forEach(review => rows.append(row(review)));
    }
}

async function getReview(id) {
    const response = await fetch(`/api/reviews/${id}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        const rev = await response.json();
        document.getElementById("reviewId").value = rev.id;
        document.getElementById("review").value = rev.review;
    } else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function leaveReview(leavedReview) {
    const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
     body: JSON.stringify({
           review: leavedReview,
        })
    });
    if (!response.ok) {
        const errorData = await response.json();
        alert("Помилка: " + errorData.detail);
    }
}

function reset() {
    document.getElementById("review").value = "";
}


function row(rev) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", rev.id);

    const revTd = document.createElement("td");
    revTd.textContent = rev.review;
    tr.appendChild(revTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.textContent = "Змінити";
    editLink.addEventListener("click", async () => await getReview(rev.id));
    linksTd.appendChild(editLink);

    const removeLink = document.createElement("button");
    removeLink.textContent = "Видалити";
    removeLink.addEventListener("click", async () => await deleteReview(rev.id));
    linksTd.appendChild(removeLink);

    tr.appendChild(linksTd);
    return tr;
}




document.getElementById("saveReview").addEventListener("click", async () => {
    const review = document.getElementById("review").value;
    await leaveReview(review);
    reset();
});

getReviews()