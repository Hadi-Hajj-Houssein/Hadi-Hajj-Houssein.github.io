document.addEventListener('DOMContentLoaded', async () => {
    const username = 'hadi_hajj_houssein';

    // 1. FAST PART: Get Problems Solved (Easy/Medium/Hard)
    // This runs quickly and works perfectly on GitHub Pages
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

    // 2. RATING PART: Get Contest Rating
    // We fetch this separately to ensure we get "Rating" (e.g., 1500) and not "Rank"
    try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
        const data = await response.json();
        
        // We strictly look for 'contestRating'
        if (data && data.contestRating) {
            // Round the number (e.g., 1450.2 -> 1450)
            document.getElementById("rating_leetcode").textContent = Math.round(data.contestRating);
        } else {
            // If the API loads but you have no rating yet
            document.getElementById("rating_leetcode").textContent = "Unrated";
        }
    } catch (error) {
        console.error("Rating Error:", error);
        // If it fails or takes too long
        document.getElementById("rating_leetcode").textContent = "---";
    }
});