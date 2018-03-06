import axios from 'axios'

const BASE_URL = '/api' // set this to the path where the API is proxied

export function auth(username, password) {
    return axios({
        method: 'post',
        url:    `${BASE_URL}/user`,
        data:   {
            username: username,
            password: password
        }
    }).then((response) => {
        console.log(response.data.jwt)
        return response.data.jwt
    })
}

export function issues(q = undefined, offset = 0, limit = 100) {
    return axios({
        method: 'get',
        url:    `${BASE_URL}/issues`,
        params: { q, offset, limit }
    }).then((response) => {
        console.log(response.data)
        return response.data
    })
}
