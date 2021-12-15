import axios from 'axios';
/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */

const get = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        let baseUrl = url.includes("https://car-insurance.salama.ae") ? url + data.chassisNumber : url
        let headers =  {
            'Content-Type': `application/json`,
        }
        axios.get(baseUrl, data, headers)
        .then(res => {
            if (res.data.success) {
                resolve(res.data);
            } else if(res.statusText === 'OK') {
                resolve(res);
            }
            else {
                reject(res.data);
            }
        })
        .catch((error) => {
            if(error.response.data)
            {
                reject(error.response.data)
            }
            else
            {
                reject({apiError: 'Not Found'})
            }
        });
    });
}

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */

 const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        let baseUrl = url;
        let headers =  {
            'Content-Type': 'application/json',
        }
        axios
        .post(baseUrl, data, headers)
        .then(res => {
            if (res.data.success) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        })
        .catch((error) => {
            reject(error.response.data);
        });
    });
}

const obj = {
    get,
    post,
    put: (url, data) => post(url, data, 'PUT'),
}

export default obj;