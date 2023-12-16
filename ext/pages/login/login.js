import { create_token } from "../../../assets/js/token/token_handler.js";

const hostname = "127.0.0.1";
const port = 8080;
const context = "/api";

async function get_currentTimestamp() {
    fetch("http://"+hostname + ":" + port + context + "/standard" + "/currentTimestamp")
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        return true;
    })
    .catch(response => {
        return false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    get_currentTimestamp();
    const header_element = document.getElementsByTagName('header')[0];
    const error_container = document.getElementById("error-container");
    const error_text = error_container.getElementsByTagName('p')[0];
    document.getElementById('submit-input').addEventListener('click', () => {
        const username = document.getElementById('username-input');
        const password = document.getElementById('password-input');
        if(username.value == "")
        {
            username.classList.add("invalid")
            header_element.hidden = false;
            error_text.innerText = 'No username entered!';
            return;
        }
        else 
        {
            header_element.hidden = true;
            username.classList.remove("invalid")
        }

        if(password.value == "")
        {
            password.classList.add("invalid")
            header_element.hidden = false;
            error_text.innerText = 'No password entered!';
        }
        else 
        {
            header_element.hidden = true;
            password.classList.remove("invalid")
        }

        header_element.hidden = true;

        fetch("http://"+hostname + ":" + port + context + "/auth" + "/login", {
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
            if(status == 400)
            {
                content.then(json => {
                    header_element.hidden = false;
                    error_text.innerText = json.message;
                })
            }
            if(status == 200)
            {
                create_token("JToken", response.headers.get("JToken"));
                window.location.href="../../../index.html";
            }
        })
        .catch(() => {
            header_element.hidden = false;
            error_text.innerText = 'Servers are not available at the moment!';
        });
    });
})
