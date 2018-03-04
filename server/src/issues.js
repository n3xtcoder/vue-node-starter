const db                                          = require('./db')

const getIssues = (req, res) => {
    const offset = req.query.offset || 0
    const limit  = req.query.limit || 100
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
            owner:  { boost: 1 }
        },
        boolean: "AND",
        expand:  true
    }

    const sortFn = (a, b) => a[sortBy] > b[sortBy]

    if ( q ) {
        const issues = db.idx.search(q, opts).sort(sortFn).slice(offset, limit).map((doc) => {
            const issue = db.getIssue(doc.ref)
            issue.score = doc.score
            return issue
        })
        res.json(issues)
    } else {
        const issues = db.issues.sort(sortFn).slice(offset, limit)
        res.json(issues)
    }
}