from bs4 import BeautifulSoup

# Baca file followers
followers_path = "/mnt/data/followers_1.html"
with open(followers_path, "r", encoding="utf-8") as file:
    followers_soup = BeautifulSoup(file, "html.parser")

# Baca file following
following_path = "/mnt/data/following.html"
with open(following_path, "r", encoding="utf-8") as file:
    following_soup = BeautifulSoup(file, "html.parser")

# Ekstrak username dari followers
followers = set(a.text.strip() for a in followers_soup.find_all("a") if "instagram.com" in a["href"])

# Ekstrak username dari following
following = set(a.text.strip() for a in following_soup.find_all("a") if "instagram.com" in a["href"])

# Temukan siapa yang tidak mengikuti balik
unfollowers = following - followers

# Hasilkan daftar unfollowers
unfollowers
