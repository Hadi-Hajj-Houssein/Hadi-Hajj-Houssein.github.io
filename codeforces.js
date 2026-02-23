async function updateProfileCard(handle) {
    try {
        const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        
        const infoData = await infoRes.json();
        const statusData = await statusRes.json();

        if (infoData.status !== "OK" || statusData.status !== "OK") {
            console.error("API Error");
            return;
        }

        const user = infoData.result[0];
        const submissions = statusData.result;
        
        const solvedSet = new Set();
        submissions.forEach(sub => {
            if (sub.verdict === "OK") {
                solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
        });

        const ratingElement = document.getElementById('rating');
        const maxRatingElement = document.getElementById('max-rating');
        const problemsElement = document.getElementById('problems') + 62;

        if (ratingElement) ratingElement.innerText = user.rating || "Unrated";
        if (maxRatingElement) maxRatingElement.innerText = `(max: ${user.maxRating || 0})`;
        if (problemsElement) problemsElement.innerText = solvedSet.size;

    } catch (error) {
        console.error("Failed to link data:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateProfileCard("Hadi_hh");
});