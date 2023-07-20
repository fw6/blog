import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.TOKEN,
});

// const updateBlogSubmodule = async () => {
//     const { data: repo } = await octokit.request("GET /repos/{owner}/{repo}");
// };

await octokit.request("GET /repos/{owner}/{repo}/contents/src/content/blog?ref=blog").catch((error) => {
    if (error.status === 404) {
        console.log("The repository is not starred by me");
    } else {
        console.error(
            `An error occurred while checking if the repository is starred: ${error?.response?.data?.message}`,
        );
    }
});
