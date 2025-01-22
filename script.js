document.getElementById("checkUnfollowers").addEventListener("click", () => {
    const followersFile = document.getElementById("followersFile").files[0];
    const followingFile = document.getElementById("followingFile").files[0];

    if (!followersFile || !followingFile) {
        alert("Please upload both files.");
        return;
    }

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split("\n").map(line => line.trim()).filter(Boolean));
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    };

    Promise.all([readFile(followersFile), readFile(followingFile)])
        .then(([followers, following]) => {
            const unfollowers = following.filter(user => !followers.includes(user));
            displayUnfollowers(unfollowers);
        })
        .catch(error => alert("Error reading files: " + error));
});

function displayUnfollowers(unfollowers) {
    const list = document.getElementById("unfollowersList");
    list.innerHTML = "";

    if (unfollowers.length === 0) {
        list.innerHTML = "<li>No unfollowers found!</li>";
        return;
    }

    unfollowers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = user;
        list.appendChild(listItem);
    });
}
