import { load_mod } from "./module_loader.js";

export {get_current_page, load_page};

function get_current_page()
{
    const url_params = new URLSearchParams(window.location.search);
    if(!url_params.has('page'))
        url_params.set('page', 'home');
    return url_params.get('page');
}

function load_page(page_name)
{
    const page_element = page_name;

    page_element.setAttribute('src', ('pages/'+get_current_page()+"/"+get_current_page()+".html"));
    load_mod(page_element);
}