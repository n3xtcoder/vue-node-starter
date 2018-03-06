const { getIssue, index, issues } = require('./data')

exports.searchIssues = (req, res) => {
    const offset    = parseInt(req.query.offset, 10) || 0
    const limit     = parseInt(req.query.limit, 10) || 100
    const q         = req.query.q || ''

    const opts = {
        fields:  {
            title:  { boost: 2 },
            client: { boost: 1 },
            tester: { boost: 1 },
            owner:  { boost: 1 },
            info:   { boost: 0.5 }
        },
        boolean: "AND",
        expand:  true
    }

    let result   = { offset, limit }

    if ( q ) {
        const rows = index.search(q, opts)
        result.count = rows.length
        result.rows = rows.slice(offset, offset + limit).map((doc) => {
            const issue = getIssue(doc.ref)
            issue.score = doc.score
            return issue
        })
    } else {
        result.count = issues.length
        result.rows  = issues.slice(offset, offset + limit)
    }

    res.json(result)
}