import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.TOKEN,
});

// await octokit
//     .request("GET /repos/{owner}/{repo}/issues", {
//         owner: "github",
//         repo: "docs",
//         per_page: 2,
//     })
//     .catch((error) => {
//         if (error.status === 404) {
//             console.log("The repository is not starred by me");
//         } else {
//             console.error(
//                 `An error occurred while checking if the repository is starred: ${error?.response?.data?.message}`,
//             );
//         }
//     });
