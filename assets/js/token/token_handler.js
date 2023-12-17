export {has_token, validate_token, create_token}

const hostname = "127.0.0.1";
const port = 8080;
const context = "/api";
const additonalApiContext = "/auth";

function has_token() {
    if(get_cookie("JToken") == undefined)
        return false;
    return true;
}

async function validate_token(username, password) {
    fetch("http://" + hostname + ":" + port + context + additonalApiContext + "/login", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            const status = response.status;
            const content = response.json();
            console.log(response.headers.get("JToken"))
            if (status == 400) {
                content.then(json => {
                    return json.message;
                })
            }
            if (status == 200) {
                if(has_token())
                    set_cookie("JToken", response.headers.get("JToken"))
                else 
                    create_token("JToken", response.headers.get("JToken"));
                return "AUTHORIZED"
            }
        })
        .catch(() => {
            console.log("Unable to connect to backend");
            return "NO_CONNECTION"
        });

}

function create_token(name, value) {
    set_cookie(name, value);
}

function set_cookie(name, value) {
    document.cookie = name + "=" + value + ";path=/";
}

function get_cookie(cookie_name) {
    let cookies = document.cookie.split(";");
    for(let i = 0; i < cookies.length; i++)
    {
        const cookie = cookies[i];
        if(cookie.startsWith(cookie_name))
        {
            return cookie.split("=")[1];
        }
    }
    return undefined;
  }