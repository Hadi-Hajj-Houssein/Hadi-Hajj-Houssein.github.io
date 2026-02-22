document.addEventListener('DOMContentLoaded', async () => {
    const username = 'hadi_hajj_houssein';

    // 1. Fetch Solved Problems (Using the working API)
    try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        const data = await response.json();

        // The API returns 'solvedProblem' for total, and 'easySolved', etc.
        if (data && data.solvedProblem !== undefined) {
            document.getElementById("total").textContent = data.solvedProblem;
            document.getElementById("easy").textContent = data.easySolved;
            document.getElementById("medium").textContent = data.mediumSolved;
            document.getElementById("hard").textContent = data.hardSolved;
        } else {
            console.error("Data format incorrect or user not found");
        }
    } catch (err) {
        console.error("Solved Stats Error:", err);
    }

    // 2. Fetch Contest Rating
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