const dev = true;
const API_URL = dev ? 'http://localhost:8080/api/v1' : 'https://54.233.174.20:8080/api/v1'

const PAGES = {
    FEATURES: 'FEATURES',
    DEAL_HISTORY: 'DEAL_HISTORY'
}

const Constants = {
    PAGES,
    API_URL
}

export default Constants;