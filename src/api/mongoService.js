const login_url = "http://localhost:5000/api/authenticate";
const register_url = "http://localhost:5000/api/register";
const dashboard_url = "http://localhost:5000/api/dashboard";

const post_login_details = (login_details) => {
    return new Promise((resolve, reject) => {
        fetch(login_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: login_details.email,
                password: login_details.password
            })
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((error) => {
                reject(error);
            });
    });
};

const post_register_user = (user) => {
    return new Promise((resolve, reject) => {
        fetch(register_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: user.role,
                username: user.username,
                email: user.email,
                password: user.password,
                password2: user.password2
            })
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    });
};

const get_dashboard_user = (auth_token) => {
    return new Promise((resolve, reject) => {
        fetch(dashboard_url, {
            method: 'GET',
            headers: {
                'Authorization': auth_token
            }
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    })
}

export default {
    login_request: (login_details) => post_login_details(login_details),
    register_user: (user) => post_register_user(user),
    dashboard_user: (auth_token) => get_dashboard_user(auth_token)
}