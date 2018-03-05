const { getIssue, index, issues } = require('./db')

exports.searchIssues = (req, res) => {
    const offset = parseInt(req.query.offset, 10) || 0
    const limit  = parseInt(req.query.limit, 10) || 100
    const sortBy = req.query.sortBy || 'id'
    const q      = req.query.q || ''
    // const filter = req.params.filter

    console.log('q', q)
    console.log('offset', offset)
    console.log('limit', limit)

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

    const sortFn = (a, b) => a[sortBy] > b[sortBy]
    let result   = { offset, limit }

    if ( q ) {
        result.rows = index.search(q, opts).sort(sortFn).slice(offset, offset + limit).map((doc) => {
            const issue = getIssue(doc.ref)
            issue.score = doc.score
            return issue
        })
        res.json(result)
    } else {
        result.count = issues.length
        result.rows  = issues.sort(sortFn).slice(offset, offset + limit)
        res.json(result)
    }
}