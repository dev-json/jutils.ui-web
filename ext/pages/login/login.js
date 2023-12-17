import { get_currentTimestamp } from "../../../assets/js/api/standard/standard_api.js";
import { post_login } from "../../../assets/js/api/auth/auth_api.js";

document.addEventListener('DOMContentLoaded', async () => {
    const valid = await get_currentTimestamp();
    if (!valid)
        console.log("Unable to connect!")


    const header_element = document.getElementsByTagName('header')[0];
    const error_container = document.getElementById("error-container");
    const error_text = error_container.getElementsByTagName('p')[0];
    document.getElementById('submit-input').addEventListener('click', () => {
        console.log("loaded1")
        _login(header_element, error_text);
    });

    document.getElementById('password-input').addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            _login(header_element, error_text);
        }
    });
});

async function _login(header_element, text_element)
{
    const username = document.getElementById('username-input');
    const password = document.getElementById('password-input');
    if (username.value == "") {
        username.classList.add("invalid")
        header_element.hidden = false;
        text_element.innerText = 'No username entered!';
        return;
    }
    else {
        header_element.hidden = true;
        username.classList.remove("invalid")
    }

    if (password.value == "") {
        password.classList.add("invalid")
        header_element.hidden = false;
        text_element.innerText = 'No password entered!';
    }
    else {
        header_element.hidden = true;
        password.classList.remove("invalid")
    }

    header_element.hidden = true;

    const do_login = await post_login(username.value, password.value);
    if(do_login == "Authorized")
        window.location.href = "../../../index.html"
    else 
    {
        header_element.hidden = false;
        text_element.innerText = do_login;
    }
}
