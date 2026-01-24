async function updateProfileCard(handle) {
    try {
        const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const infoData = await infoRes.json();
        const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const statusData = await statusRes.json();
        const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const ratingData = await ratingRes.json();
        if (infoData.status !== "OK" || statusData.status !== "OK" || ratingData.status !== "OK") {
            console.error("API Error");
            return;
        }
        const user = infoData.result[0];
        const submissions = statusData.result;
        const officialContests = ratingData.result; 
        const solvedSet = new Set();
        submissions.forEach(sub => {
            if (sub.verdict === "OK" && sub.problem.contestId < 100000) {
                solvedSet.add(sub.problem.name);
            }
        });
        document.getElementById('problems').innerText = solvedSet.size+71;
        document.getElementById('rating').innerText = user.rating || "Unrated";
        document.getElementById('max-rating').innerText = `(max: ${user.maxRating || 0})`;
        document.getElementById('contests').innerText = officialContests.length;
        console.log("Profile card updated successfully!");

    } 
    catch (error) {
        console.error("Failed to link data:", error);
    }
}

updateProfileCard("Hadi_hh");