// Build with Pages base path and push dist/ to the gh-pages branch.
// Usage: npm run deploy
import { execSync } from 'node:child_process'
import { rmSync, mkdirSync, writeFileSync } from 'node:fs'

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })

console.log('▸ building with Pages base path…')
run('npm run build', { env: { ...process.env, GITHUB_PAGES: '1' } })

console.log('▸ preparing gh-pages worktree…')
rmSync('.gh-pages', { recursive: true, force: true })
mkdirSync('.gh-pages')

// Build a standalone commit tree with git 2.39-compatible commands
run('git fetch origin gh-pages --depth=1 2>/dev/null || true', { shell: '/bin/bash' })
const hasGhPages = execSync('git ls-remote --heads origin gh-pages', { encoding: 'utf8' }).trim().length > 0

run('git worktree prune')
if (hasGhPages) {
  run('git worktree add .gh-pages origin/gh-pages')
  run('git rm -rq . 2>/dev/null || true', { cwd: '.gh-pages', shell: '/bin/bash' })
} else {
  // create an orphan branch checkout
  run('git branch gh-pages 2>/dev/null || true', { shell: '/bin/bash' })
  run('git symbolic-ref HEAD refs/heads/gh-pages', { cwd: '.gh-pages' })
  run('git checkout -q gh-pages 2>/dev/null || true', { shell: '/bin/bash' })
  // initialize the worktree index from scratch
  execSync('git read-tree --empty', { cwd: '.gh-pages' })
}

console.log('▸ copying build output…')
run('cp -R dist/. .gh-pages/')
writeFileSync('.gh-pages/.nojekyll', '')

run('git add -A', { cwd: '.gh-pages' })
run('git -c user.name="Deploy Bot" -c user.email="deploy@local" commit -qm "deploy: update Pages build" || true', { cwd: '.gh-pages', shell: '/bin/bash' })

console.log('▸ pushing gh-pages…')
run('git push origin gh-pages')
run('git worktree remove --force .gh-pages')
console.log('✓ deployed to gh-pages')
