const { execSync, exec } = require("child_process");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: ["commitlint-plugin-function-rules"],
  rules: {
    "subject-empty": [0],
    "subject-case": [0],
    "type-empty": [0],
    "function-rules/type-enum": [
      2,
      "always",
      (parsed) => {
        // Get the name of the current branch
        const branchName = execSync("git symbolic-ref --short HEAD").toString().trim();
        const commitTypeList = ["story", "fix", "test", "chore"];
        const commitType = commitTypeList.join("|");
        const commitRegex = new RegExp("^(" + commitType + ")/" + branchName + ": [\\w+ ?]{5,50}$");
        const isCommitValid = parsed.header.match(commitRegex);

        if (isCommitValid) {
          return [true];
        }
        return [
          false, `Commit: story|fix|test|chore/${branchName}: char 5 to 50`,
        ];
      },
    ],
  },
};
