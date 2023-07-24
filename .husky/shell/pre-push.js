const { execSync, exec } = require('child_process');

// Get the name of the current branch
const BRANCH = execSync('git symbolic-ref --short HEAD').toString().trim();
console.log(`commit-msg: On branch '${BRANCH}'`);

// GET Project 
const repoPath = 'https://github.com/sudhakar-diary/express-husky.git';

// Execute the "git ls-remote" command to check if the branch exists in the remote repository.
exec(`git ls-remote --heads origin '${repoPath}' '${BRANCH}'`, (error, stdout, stderr) => {
  if (error) {
    // An error occurred while executing the command.
    console.error(`Error executing the command: ${error.message}`);
    process.exit(1);
  }

  if (stderr) {
    // The branch does not exist in the remote repository.
    console.log(`Git branch '${BRANCH}' does not exist in the remote repository`);
  } else {
    // The branch exists in the remote repository.
    console.log(`Git branch '${BRANCH}' exists in the remote repository`);

    // Create only branches that have one of the following prefixes
    const branchTypeList = ["main", "master", "develop"];
    const branchSubTypeList = ["release", "feature", "userstory", "issue"];
    const branchType = branchTypeList.join("|");
    const branchSubType = branchSubTypeList.join("|");
    const branchRegex = new RegExp("^(" + branchType + "){1}$|(" + branchSubType + ")-(\\d{4})$");

    if (!branchRegex.test(BRANCH)) {
      console.log(`Branch must adhere to this contract: ${branchRegex}`);
      console.log(`Example: ${branchType} -or- ${branchSubType}`);
      process.exit(1);
    }

    if (branchRegex.test(BRANCH)) {
      execSync('npm run lint').toString().trim();
    }
  }
});
