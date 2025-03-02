document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const usernameInput = document.getElementById("username");
    searchBtn.addEventListener("click", () => fetchGitHubData());
    usernameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") fetchGitHubData();
    });

    async function fetchGitHubData() {
        const username = usernameInput.value.trim();

        if (!username) {
            alert("Please enter a GitHub username.");
            return;
        }
        document.getElementById("name").textContent = "Loading...";
        document.getElementById("bio").textContent = "Loading...";
        document.getElementById("repos").textContent = "0";
        document.getElementById("followers").textContent = "0";
        document.getElementById("level").textContent = "Calculating...";

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error("User not found");

            const data = await response.json();

            document.getElementById("avatar").src = data.avatar_url;
            document.getElementById("avatar").style.visibility = "visible";
            document.getElementById("name").textContent = data.name || "Not available";
            document.getElementById("bio").textContent = data.bio || "Not available";
            document.getElementById("repos").textContent = data.public_repos;
            document.getElementById("followers").textContent = data.followers;
            document.getElementById("level").textContent = determineLevel(data.followers);

        } catch (error) {
            alert("User not found!");
            resetData();
        }
    }

    function determineLevel(followers) {
        if (followers > 1000) return "GOD LEVEL";
        if (followers > 100) return "PRO";
        return "Apprentice";
    }

    function resetData() {
        document.getElementById("name").textContent = "Not found";
        document.getElementById("bio").textContent = "Not found";
        document.getElementById("repos").textContent = "0";
        document.getElementById("followers").textContent = "0";
        document.getElementById("level").textContent = "N/A";
        document.getElementById("avatar").style.visibility = "hidden";
    }
});
