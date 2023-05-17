/* eslint-disable no-unused-vars */
const compareFunc = require('compare-func')

module.exports = {
  writerOpts: {
    transform: (commit, context, header) => {
      let discard = true
      const issues = []

      commit.notes.forEach((note) => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })

      if (commit.header.indexOf('<feature>') >= 0) {
        commit.type = '✨ Features | 新功能'
      } else if (commit.header.indexOf('<fix>') >= 0) {
        commit.type = '🐛 Bug Fixes | Bug 修复'
      } else if (commit.header.indexOf('<perf>') >= 0) {
        commit.type = '⚡ Performance Improvements | 性能优化'
      } else if (commit.header.indexOf('<revert>') >= 0) {
        commit.type = '⏪ Reverts | 回退'
      } else if (commit.header.indexOf('<doc>') >= 0) {
        commit.type = '📝 Documentation | 文档'
      } else if (commit.header.indexOf('<style>') >= 0) {
        commit.type = '💄 Styles | 风格'
      } else if (commit.header.indexOf('<refactor>') >= 0) {
        commit.type = '♻ Code Refactoring | 代码重构'
      } else if (commit.header.indexOf('<test>') >= 0) {
        commit.type = '✅ Tests | 测试'
      } else if (commit.header.indexOf('<build>') >= 0) {
        commit.type = '👷‍ Build System | 构建'
      } else if (commit.header.indexOf('<ci>') >= 0) {
        commit.type = '🔧 Continuous Integration | CI 配置'
      } else if (commit.header.indexOf('<chore>') >= 0) {
        commit.type = '🎫 Chores | 其他更新'
      } else if (commit.header.indexOf('<misc>') >= 0) {
        commit.type = '🎫 Misc | 工程杂项'
      }

      if (commit.scope === '*' || !commit.scope) {
        commit.scope = ''
      }

      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl

        if (url) {
          commit.subject = `${url}/${commit.gitTags}`
          issues.push(commit.gitTags)
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter((reference) => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }
        return false
      })
      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
}
