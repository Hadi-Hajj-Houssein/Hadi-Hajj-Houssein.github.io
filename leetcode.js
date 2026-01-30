document.addEventListener('DOMContentLoaded', async () => {
    const username = 'hadi_hajj_houssein';

    // 1. FAST API: Gets Solved Counts (Easy/Medium/Hard)
    // This API is specifically built for GitHub Pages and is very reliable.
    const statsUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
    
    // 2. RATING API: Gets your Contest Rating
    // We use a different source for this because the first API doesn't have it.
    const ratingUrl = `https://alfa-leetcode-api.onrender.com/${username}/contest`;

    // --- PART A: Load Problems (Fast) ---
    try {
        const response = await fetch(statsUrl);
        const data = await response.json();
        
        if (data.status === 'success') {
            document.getElementById("total").textContent = data.totalSolved;
            document.getElementById("easy").textContent = data.easySolved;
            document.getElementById("medium").textContent = data.mediumSolved;
            document.getElementById("hard").textContent = data.hardSolved;
        } else {
            console.error("LeetCode API returned error:", data.message);
        }
    } catch (err) {
        console.error("Stats Fetch Failed:", err);
    }

    // --- PART B: Load Rating (Might be slower) ---
    try {
        const response = await fetch(ratingUrl);
        const data = await response.json();
        
        // Check if rating exists
        if (data && data.contestRating) {
             document.getElementById("rating_leetcode").textContent = Math.round(data.contestRating);
        } else {
             document.getElementById("rating_leetcode").textContent = "Unrated";
        }
    } catch (err) {
        console.error("Rating Fetch Failed:", err);
        document.getElementById("rating_leetcode").textContent = "---";
    }
});