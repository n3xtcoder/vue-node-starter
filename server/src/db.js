const uuid        = require('uuid')
const faker       = require('faker')

const numCoders    = 10
const numCompanies = 20
const numPeople    = 20
const numIssues    = 5000

const randomPerson = () => {
    return {
        id:   uuid(),
        name: faker.name.findName(),
    }
}

const coders = []
for ( n = 0; n <= numCoders; n++ ) {
    coders.push(randomPerson())
}

const randomCompany = () => {
    const people = []
    for ( n = 0; n <= numPeople; n++ ) {
        people.push(randomPerson())
    }

    return {
        id:     uuid(),
        name:   faker.company.companyName(),
        people: people
    }
}

const companies = []
for ( n = 0; n <= numCompanies; n++ ) {
    companies.push(randomCompany())
}

const randomIssue = () => {
    const company = faker.random.arrayElement(companies)

    return {
        id:          uuid(),
        client:      company,
        priority:    faker.random.number({ 'min': 1, 'max': 5 }),
        owner:       faker.random.arrayElement(company.people.map(p => p.name)),
        tester:      faker.random.arrayElement(coders.map(p => p.name)),
        realisation: faker.random.arrayElement(coders.map(p => p.name)),
        info:        faker.hacker.phrase(),
        status:      faker.random.arrayElement(['feedback', 'backlog', 'done', 'in progress']),
        title:       faker.company.catchPhrase()
    }
}

const issues      = []
const issueLookup = {}
for ( n = 0; n <= numIssues; n++ ) {
    const issue = randomIssue()

    issueLookup[issue.id] = issue
    issues.push(issue)
}


var idx = elasticlunr(function () {
    this.addField('id')
    this.addField('client')
    this.addField('priority')
    this.addField('owner')
    this.addField('tester')
    this.addField('realisation')
    this.addField('info')
    this.addField('status')
    this.addField('title')

    issues.forEach(function (doc) {
        console.log("adding", doc.title)
        this.addDoc(doc)
    }, this)
});


console.log('*', idx.search(""))
module.exports = {
    issues:    issues,
    companies: companies,
    coders:    coders,
    findById:  (id) => issueLookup[id]
}