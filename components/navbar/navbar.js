import {get_current_page} from "../../assets/js/page_handler.js";

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