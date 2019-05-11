const login_url = "http://localhost:5000/login";
const register_url = "http://localhost:5000/register";

const login_details_post = (login_details, cb) => {
    fetch(login_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: login_details.email,
            pwd: login_details.password
        })
    })
        .then(response => response.json())
        .then(json => cb(json))
        .catch(function (e) { console.log(e) })
}

const register_user_post = (user, cb) => {
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
        .then(json => cb(json))
        .catch(function (e) { console.log(e) })
}

export default {
    login_request: (login_details, cb) => login_details_post(login_details, cb),
    register_user: (user, cb) => register_user_post(user, cb)
}