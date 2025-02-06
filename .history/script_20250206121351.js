document.getElementById("checkUnfollowers").addEventListener("click", async () => {
    const followersFile = document.getElementById("followersFile").files[0];
    const followingFile = document.getElementById("followingFile").files[0];

    if (!followersFile || !followingFile) {
        alert("Silakan upload kedua file sebelum melanjutkan.");
        return;
    }

    try {
        const followers = await extractUsernamesFromHTML(followersFile);
        const following = await extractUsernamesFromHTML(followingFile);

        const unfollowers = following.filter(user => !followers.includes(user));
        displayUnfollowers(unfollowers);
    } catch (error) {
        alert("Terjadi kesalahan saat membaca file: " + error);
    }
});

async function extractUsernamesFromHTML(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(reader.result, "text/html");

            // Ambil semua elemen <a> yang mengandung link Instagram
            const usernames = [...doc.querySelectorAll("a")]
                .map(a => a.textContent.trim())
                .filter(name => name.length > 0);

            if (usernames.length === 0) {
                reject("Tidak ditemukan username di dalam file.");
            } else {
                resolve(usernames);
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
        list.innerHTML = "<li>Semua orang mengikuti balik!</li>";
        return;
    }

    unfollowers.forEach(user => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `https://www.instagram.com/${user}/`;
        link.target = "_blank";
        link.textContent = user;
        listItem.appendChild(link);
        list.appendChild(listItem);
    });
}
