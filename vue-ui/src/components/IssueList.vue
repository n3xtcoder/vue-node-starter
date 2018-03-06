<template>
    <div>

        <form v-on:submit.prevent="search">
            <div v-if="error">{{error}}</div>
            <input v-on:keyup="search" type="text" v-model.trim="q" />
            <button type="submit">Search</button>
        </form>

        <div v-if="hasResults">
            <table>
                <tr>
                    <th v-for="field in headings">{{field}}</th>
                </tr>
                <tr v-for="issue in rows">
                    <td v-for="field in headings">{{issue[field]}}</td>
                </tr>
            </table>
        </div>
        <div v-else>Loading...</div>

    </div>
</template>

<script>
    export default {
        name:     'IssueList',
        data() {
            return {
                q:     '',
                error: ''
            }
        },
        computed: {
            rows() {
                return this.$store.state.issues.rows.length ? this.$store.state.issues.rows : []
            },
            headings() {
                return this.$store.state.issues.rows.length ? Object.keys(this.$store.state.issues.rows[0]) : []
            },
            hasResults() {
                return this.$store.state.issues
            }
        },
        methods:  {
            search: function () {
                this.searchIssues(this.q).then(() => {
                    this.error = undefined
                }).catch((err) => {
                    this.error = `${err}`
                })
            }
        },
        props:    ['searchIssues']
    }
</script>
