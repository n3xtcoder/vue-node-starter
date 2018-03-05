const uuid        = require('uuid')
const faker       = require('faker')
const elasticlunr = require('elasticlunr')

const numCoders    = 10
const numCompanies = 20
const numPeople    = 20
const numIssues    = 5000

const coders      = []
const companies   = []
const issues      = []
const issueLookup = {}

const randomPerson = () => {
    return {
        id:   uuid(),
        name: faker.name.findName(),
    }
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


const randomIssue = () => {

    const company = faker.random.arrayElement(companies)

    return {
        id:          uuid(),
        client:      company.name,
        priority:    faker.random.number({ 'min': 1, 'max': 5 }),
        owner:       faker.random.arrayElement(company.people.map(p => p.name)),
        tester:      faker.random.arrayElement(coders.map(p => p.name)),
        realisation: faker.random.arrayElement(coders.map(p => p.name)),
        info:        faker.hacker.phrase(),
        status:      faker.random.arrayElement(['feedback', 'backlog', 'done', 'in progress']),
        title:       faker.company.catchPhrase()
    }
}

const bootstrapCoders    = () => {
    for ( let n = 0; n < numCoders; n++ ) {
        coders.push(randomPerson())
    }
}
const bootstrapCompanies = () => {
    for ( let n = 0; n < numCompanies; n++ ) {
        companies.push(randomCompany())
    }
}

const bootstrapIssues = () => {
    for ( let n = 0; n < numIssues; n++ ) {
        const issue = randomIssue()

        issueLookup[issue.id] = issue
        issues.push(issue)
    }
}

const bootstrapDummyData = () => {
    bootstrapCoders()
    bootstrapCompanies()
    bootstrapIssues()
}
process.env.DUMMY_DATA && bootstrapDummyData()

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
        this.addDoc(doc)
    }, this)
});

module.exports = {
    issues:   issues,
    index:    idx,
    getIssue: (id) => issueLookup[id]
}