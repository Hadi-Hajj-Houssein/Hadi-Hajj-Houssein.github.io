document.addEventListener('DOMContentLoaded', async () => {
    const username = 'hadi_hajj_houssein';
    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById("total").textContent = data.totalSolved;
                document.getElementById("easy").textContent = data.easySolved;
                document.getElementById("medium").textContent = data.mediumSolved;
                document.getElementById("hard").textContent = data.hardSolved;
            }
        })
        .catch(err => console.error("Solved Stats Error:", err));
    try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
        const data = await response.json();
        if (data && data.contestRating) {
            document.getElementById("rating_leetcode").textContent = Math.round(data.contestRating);
        } else {
            document.getElementById("rating_leetcode").textContent = "Unrated";
        }
    } catch (error) {
        console.error("Rating Error:", error);
        document.getElementById("rating_leetcode").textContent = "---";
    }
});