async function getLeetCodeStats(username) {
    const baseApi = `https://alfa-leetcode-api.onrender.com/${username}`;
    try {
        const [subRes, contestRes] = await Promise.all([
            fetch(`${baseApi}/solved`),
            fetch(`${baseApi}/contest`)
        ]);
        const subData = await subRes.json();
        const contestData = await contestRes.json();
        return {
            totalSolved: subData.solvedProblem,
            easySolved: subData.easySolved,
            mediumSolved: subData.mediumSolved,
            hardSolved: subData.hardSolved,
            rating: contestData.contestRating ? Math.floor(contestData.contestRating) : "Unrated"
        };
    } catch (error) {
        console.error("LeetCode Fetch Error:", error);
        return null;
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    const data = await getLeetCodeStats("hadi_hajj_houssein");
    if (data) {
        document.getElementById("total").textContent = data.totalSolved;
        document.getElementById("easy").textContent = data.easySolved;
        document.getElementById("medium").textContent = data.mediumSolved;
        document.getElementById("hard").textContent = data.hardSolved;
        document.getElementById("rating_leetcode").textContent = data.rating;
    }
});