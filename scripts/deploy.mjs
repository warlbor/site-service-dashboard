// Build with Pages base path and publish dist/ to the gh-pages branch.
// Strategy: init a fresh repo inside dist/, commit everything, force-push.
// This is immune to host-repo state and works on any git version.
// Usage: npm run deploy
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })

console.log('▸ building with Pages base path…')
run('npm run build', { env: { ...process.env, GITHUB_PAGES: '1' } })

writeFileSync('dist/.nojekyll', '')

const REMOTE = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim()

console.log('▸ publishing dist/ → gh-pages…')
run('git init -q dist', { shell: '/bin/bash' })
run('git -c user.name="Deploy Bot" -c user.email="deploy@local" add -A', { cwd: 'dist', shell: '/bin/bash' })
// "nothing to commit" is a SUCCESS case when the build output is unchanged
run('git -c user.name="Deploy Bot" -c user.email="deploy@local" diff --cached --quiet || git -c user.name="Deploy Bot" -c user.email="deploy@local" commit -qm "deploy: Pages build"', { cwd: 'dist', shell: '/bin/bash' })
run('git branch -M gh-pages', { cwd: 'dist', shell: '/bin/bash' })
run(`git remote add origin "${REMOTE}" || git remote set-url origin "${REMOTE}"`, { cwd: 'dist', shell: '/bin/bash' })
// gh's keyring holds the credentials; plain git in dist/ can't see them
run('git config credential.helper "!gh auth git-credential"', { cwd: 'dist', shell: '/bin/bash' })
run('git push -f origin gh-pages', { cwd: 'dist', shell: '/bin/bash' })

console.log('✓ deployed to gh-pages')
