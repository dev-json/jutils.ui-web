import {get_current_page} from "../../assets/js/page_handler.js";
import { create_token, has_token, validate_token } from "../../assets/js/token/token_handler.js";

document.querySelectorAll('li').forEach(li_element =>
{
    if(li_element.id == "")
    {
        return;
    }
    if(li_element.id == get_current_page())
        li_element.classList.add('active');
    else li_element.classList.remove('active');
});

display_login_or_dashboard();

function display_login_or_dashboard()
{   
    const navbar_element = document.getElementById('navbar-component');
    const ul_element = navbar_element.getElementsByTagName('ul')[0];

    const li_element = document.createElement('li');
    const a_element = document.createElement('a');
    if(has_token())
    {
        li_element.id = 'dashboard';
        li_element.style = 'float: left; margin-left: auto;';
        a_element.href='./ext/pages/dashboard/dashboard.html';
        a_element.innerText = 'Dashboard';
    }
    else
    {
        li_element.id = 'login';
        li_element.style = 'float: left; margin-left: auto;';
        a_element.href='./ext/pages/login/login.html';
        a_element.innerText = 'Login';
    }
    li_element.appendChild(a_element);
    ul_element.appendChild(li_element);
}