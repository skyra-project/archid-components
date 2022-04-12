yarn changelog
git add CHANGELOG.md
git commit --amend --no-edit --no-verify

$latestTag = $(git describe --tags $(git rev-list --tags --max-count=1))
$latestCommit = $(git rev-list HEAD | head -1)

git tag -d $latestTag
git tag "$latestTag" $latestCommit