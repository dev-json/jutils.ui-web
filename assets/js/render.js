export { get_all_include_tags, render_include }

function render()
{
    document.querySelectorAll("inc").forEach(el => {

        /* Pageination flag will be ignored */
        if(el.getAttribute("pageination") != null)
            return;

       render_include(el.getAttribute("id"))
    });
}

render();

function get_all_include_tags() 
{
    return document.querySelectorAll("inc");
}

function render_include(id) {
    const element = document.getElementById(id);
    if(!element.tagName.toLowerCase() == "inc")
        return;
    const path = element.getAttribute("src");
    fetch(path)
    .then(response => response.text())
    .then(text => {
        element.innerHTML = text;
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
           const foundScript = document.createElement("script");
           if(script.src)
                foundScript.src = script.src;
           else foundScript.textContent = script.textContent;
           element.appendChild(foundScript);
        }); 
    });
}