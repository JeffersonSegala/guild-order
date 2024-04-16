const dev = false;
const API_URL = dev ? 'http://localhost:8080/api/v1' : 'https://15.228.43.117:8080/api/v1'

const PAGES = {
    FEATURES: 'FEATURES',
    DEAL_HISTORY: 'DEAL_HISTORY'
}

const Constants = {
    PAGES,
    API_URL
}

export default Constants;