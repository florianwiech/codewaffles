module.exports = {
  branches: ["main"],
  preset: "conventionalcommits",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version}\n\n[skip ci]\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
    [
      "@semantic-release/exec",
      {
        successCmd: "echo '::set-output name=version::${nextRelease.version}'",
      },
    ],
  ],
};
