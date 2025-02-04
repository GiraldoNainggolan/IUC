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

document.getElementById('checkUnfollowers').addEventListener('click', function () {
    // Contoh data unfollower (ganti dengan data asli dari file yang diupload)
    const unfollowers = ['user1', 'user2_with_a_very_long_username', 'user3', 'user4', 'user5'];

    const unfollowersList = document.getElementById('unfollowersList');
    unfollowersList.innerHTML = ''; // Kosongkan list sebelum menambahkan data baru

    unfollowers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        unfollowersList.appendChild(li);
    });
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
        listItem.textContent = user;
        list.appendChild(listItem);
    });
}

document.getElementById('checkUnfollowers').addEventListener('click', function () {
    const loading = document.getElementById('loading');
    loading.style.display = 'block'; // Tampilkan loading

    // Simulasikan proses (ganti dengan proses asli)
    setTimeout(() => {
        const unfollowers = ['user1', 'user2_with_a_very_long_username', 'user3', 'user4', 'user5'];
        const unfollowersList = document.getElementById('unfollowersList');
        unfollowersList.innerHTML = '';

        unfollowers.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user;
            unfollowersList.appendChild(li);
        });

        loading.style.display = 'none'; // Sembunyikan loading setelah selesai
    }, 2000); // Ganti dengan waktu proses yang sesuai
});

setTimeout(() => {
    const unfollowersList = document.getElementById('unfollowersList');
    unfollowersList.classList.add('show'); // Tambahkan class untuk animasi
}, 2100); // Sesuaikan dengan waktu proses