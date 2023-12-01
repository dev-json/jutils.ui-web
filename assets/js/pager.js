import { get_all_include_tags, render_include } from "./render.js";

function call_pager()
{
    var currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);
    
    if(!urlParams.has("page"))
        return;

    const page = urlParams.get("page");

    const include_tags = get_all_include_tags();
    include_tags.forEach(el => {
        if(el.getAttribute("pageination") != null)
        {
           el.setAttribute("src", ("pages/" + page + "/" + page + ".html"));
           render_include(el.getAttribute("id"));
        }
    });

}

call_pager();