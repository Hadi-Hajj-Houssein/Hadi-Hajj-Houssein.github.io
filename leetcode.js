async function getLeetCodeStats(username) {
    // We use a CORS proxy to hit LeetCode's official GraphQL API directly.
    // This is much faster than the Render-hosted API which goes to sleep.
    const proxyUrl = 'https://corsproxy.io/?'; 
    const targetUrl = 'https://leetcode.com/graphql';
    
    // This query requests both your solved stats and your contest rating in one go
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          rating
        }
      }
    `;

    try {
        const response = await fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: { username: username }
            })
        });

        const data = await response.json();
        
        // Check if user exists
        if (!data.data || !data.data.matchedUser) {
            console.error("User not found or API error");
            return null;
        }

        const stats = data.data.matchedUser.submitStats.acSubmissionNum;
        const ratingInfo = data.data.userContestRanking;

        // Helper to safely get count by difficulty name
        const getCount = (diff) => stats.find(s => s.difficulty === diff)?.count || 0;

        return {
            totalSolved: getCount("All"),
            easySolved: getCount("Easy"),
            mediumSolved: getCount("Medium"),
            hardSolved: getCount("Hard"),
            // Handle cases where user has no contest rating yet
            rating: ratingInfo ? Math.round(ratingInfo.rating) : "Unrated"
        };

    } catch (error) {
        console.error("LeetCode Fetch Error:", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // You can hardcode your username here or keep it dynamic
    const data = await getLeetCodeStats("hadi_hajj_houssein");
    
    if (data) {
        document.getElementById("total").textContent = data.totalSolved;
        document.getElementById("easy").textContent = data.easySolved;
        document.getElementById("medium").textContent = data.mediumSolved;
        document.getElementById("hard").textContent = data.hardSolved;
        document.getElementById("rating_leetcode").textContent = data.rating;
    } else {
        // Optional: Set default values if load fails
        document.getElementById("rating_leetcode").textContent = "---";
    }
});