# Plan to Restore Branch #80 State

1. **Audit current history**
   - Run `git log --oneline --decorate --graph` to locate the merge that incorporated PR/branch #80 and the follow-up commits that modified the same files.
   - Note the commit hash labeled `Restore index.html to PR #80 state` (aae81da) as the clean reference for branch #80.

2. **Create a dedicated safety branch**
   - `git checkout -b fix/return-to-branch-80` from the current `work` branch to isolate the rollback effort and keep main history untouched.

3. **Reset the affected file(s) to the branch #80 snapshot**
   - Use `git checkout aae81da -- index.html` (and any other files that PR #80 owned) to bring them back exactly to the branch #80 version.
   - Verify with `git diff` that only the expected changes are staged.

4. **Re-run project checks**
   - If the site is static, open `index.html` locally; for a Next.js build, execute `npm run build` (or the framework's equivalent) to confirm nothing else regressed.

5. **Commit the rollback**
   - `git commit -am "Restore branch #80 implementation"` to capture the reversion on the new branch.

6. **Prepare PR and deployment**
   - Push the branch (`git push -u origin fix/return-to-branch-80`).
   - Open a pull request summarizing that the change reverts to the branch #80 snapshot and request review/approval before merging.

7. **Post-merge follow-up**
   - After merging, redeploy via Vercel.
   - Monitor analytics/error logs to confirm the restored experience matches the branch #80 behavior.
