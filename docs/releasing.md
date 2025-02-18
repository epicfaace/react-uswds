# Releasing

Steps for a new release (these are in the process of being automated):

1. Check out `main` and make sure you have pulled down the latest changes (`git pull origin main --tags`)

2. Run `yarn release` which uses [`standard-version`](https://github.com/conventional-changelog/standard-version) to:

   - Determine the new version based on new commit messages
   - Generate a new entry in the changelog with the version, release notes, and today's date.
   - Commit all of the above changes with the message `chore(release): <version>`
   - Note: Creating a new tag is **skipped** (this will happen as part of the publish flow)

3. Push changes to a new branch following the naming pattern: `release-<version>`

   - For example: `git checkout -b release-1.1.0`

4. Open a PR for the release branch against `main`, with the changelog generated by the previous step included in the PR description.

   - PR title should be `chore(release): <version>`
   - Ask for approvals from stakeholders, perform testing on applications, etc.
   - Last minute bugfix from testing or PR feedback can be made.
     - Add bugfix commits on top of the release. Squash and merge the PR as usual.
     - _For significant bugfix (special case)_
       - Redo the release. Reset your local release branch, add bugfix commits (use conventional commits syntax). Rerun `yarn release`. The release chore commit should be the last commit on the branch. The fix will be included in the changelog. \_Rebase and merge the PR in this special case.

   ![image](./release_PR.png)

5. Once the release PR is approved, complete the release and publish the new version (this should be automated by GH - TODO):
   - Merge the PR and create a new [**release tag**](https://github.com/trussworks/react-uswds/releases) pointed at `main` on Github. Use the same notes as release PR.
   - **Pull down latest**  - `git pull origin main --tags`
   - **Rebuild app from scratch** - remove `node_modules` and run `yarn`, `yarn build`. If any errors occur, stop here.
   - **Publish the new package to npm** - `npm publish`. You will be prompted for a MFA code.
     - You may need to `npm login` first.
     - Publishing access is limited to package owners. If you need access and don't have it, please contact `@npm-admins` on Truss Slack.
