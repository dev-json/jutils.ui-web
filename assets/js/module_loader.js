import {load_page} from './page_handler.js'
export {load_mod}

const PAGEINATION_ATTR_IN_TAG = 'pageination'

init();
function load_mod(param_node)
{   
    const container = document.createElement('div');
    container.setAttribute('id', param_node.getAttribute('id'));

    //Load our custom component content here and insert into our created div
    const src_path = param_node.getAttribute('src');
    fetch(src_path)
    .then(response => response.ok ? response.text() : "<p style='color: red;'>Error while loading component: ["+response.status + " "+ response.statusText+"] </p>")
    .then(response_text => {
        container.innerHTML = response_text;

        //Now we are trying to load additional js scripts from here
        container.querySelectorAll('script').forEach(script => 
        {
            const script_tag = document.createElement('script');
            script_tag.src = script.src;
            script_tag.type = script.type; //was missing, so js didnt know it was marked as a module LOL (fuck u spez)
            container.appendChild(script_tag);
            container.removeChild(script);
        });

    });

    //append node to our parent
    param_node.parentNode.appendChild(container);

    //Delete include tag from html
    param_node.parentNode.removeChild(param_node);
}

function init()
{
    document.addEventListener('DOMContentLoaded', () => 
    {
        document.querySelectorAll('jinclude').forEach(single_element => 
        {
            if(single_element.hasAttribute(PAGEINATION_ATTR_IN_TAG))
            {
                load_page(single_element);
                return;        
            }
            load_mod(single_element);
        });
    });
}