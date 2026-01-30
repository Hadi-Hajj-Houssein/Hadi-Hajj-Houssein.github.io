document.addEventListener('DOMContentLoaded', async () => {
    const username = "hadi_hajj_houssein";
    // Using a Vercel-hosted API which is faster and doesn't sleep
    const apiUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.errors) {
            console.error("User not found or API error");
            return;
        }

        // Update the HTML elements
        document.getElementById("total").textContent = data.totalSolved;
        document.getElementById("easy").textContent = data.easySolved;
        document.getElementById("medium").textContent = data.mediumSolved;
        document.getElementById("hard").textContent = data.hardSolved;
        
        // Use rounding to remove decimals if rating exists
        // (The API might return 0 if no rating, so we check)
        const rating = data.ranking ? Math.round(data.ranking) : "Unrated";
        document.getElementById("rating_leetcode").textContent = rating;

    } catch (error) {
        console.error("LeetCode Fetch Error:", error);
        // Optional: show "---" if it fails
        document.getElementById("rating_leetcode").textContent = "---";
    }
});