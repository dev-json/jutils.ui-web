export {has_token, validate_token, create_token}

function has_token() {
    if(get_cookie("JToken") == undefined)
        return false;
    return true;
}

function validate_token() {
    if(has_token())
    {
        console.log("Token gets validated!")
    } 
    else
    {
        console.log("Token get created")
        create_token();
    }
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