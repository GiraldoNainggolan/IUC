document.getElementById("checkUnfollowers").addEventListener("click", async () => {
    const followersFile = document.getElementById("followersFile").files[0];
    const followingFile = document.getElementById("followingFile").files[0];

    if (!followersFile || !followingFile) {
        alert("Please upload both files.");
        return;
    }

    try {
        const followers = await readFile(followersFile);
        const following = await readFile(followingFile);

        const unfollowers = following.filter(user => !followers.includes(user));
        displayUnfollowers(unfollowers);
    } catch (error) {
        alert("Error reading files: " + error);
    }
});

async function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            let content = reader.result;
            const fileType = file.name.split('.').pop().toLowerCase();

            try {
                if (fileType === "txt") {
                    resolve(content.split("\n").map(line => line.trim()).filter(Boolean));
                } else if (fileType === "json") {
                    const jsonData = JSON.parse(content);
                    resolve(jsonData.followers || jsonData.following || []);
                } else if (fileType === "html") {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, "text/html");
                    const usernames = [...doc.querySelectorAll("li")].map(el => el.textContent.trim());
                    resolve(usernames);
                } else {
                    reject("Unsupported file format");
                }
            } catch (err) {
                reject("File parsing error: " + err.message);
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

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
