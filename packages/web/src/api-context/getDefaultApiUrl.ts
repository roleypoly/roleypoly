export const getDefaultApiUrl = (host: string = window.location.hostname) => {
    if (/roleypoly.com$/.test(host)) {
        return 'https://api-prod.roleypoly.com';
    } else if (/roleypoly\.pages\.dev$/.test(host)) {
        return 'https://api-stage.roleypoly.com';
    } else if (/\blocalhost|127\.0\.0\.1\b/.test(host)) {
        return 'http://localhost:6609';
    } else {
        return 'https://api-prod.roleypoly.com';
    }
};
