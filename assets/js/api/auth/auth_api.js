import * as api from "../rest_api.js"
import { get_currentTimestamp } from "../standard/standard_api.js"
import { create_token } from "../../token/token_handler.js";

export { post_login }

const additonalApiContext = "/auth"

async function post_login(username, password)
{
    //Check if server is online
    const valid = await get_currentTimestamp();
    if (!valid)
    {
        console.log("Unable to connect!")
        return false;
    }

    try 
    {
        const resp = await fetch("http://" + api.hostname + ":" + api.port + api.context + additonalApiContext + "/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        const status = resp.status;
        const token = resp.headers.get("JToken");
        const data = await resp.json();
        if(status == 400)
            return data.message;

        if(resp.ok)
        {
            create_token("JToken", token);
            return data.message;
        }   
    } 
    catch(err) 
    {
        console.log(err)
        return false;
    }
}
