import * as api from "../rest_api.js"
export {get_currentTimestamp}

const additionalApiContext = "/standard"

async function get_currentTimestamp()
{
    try 
    {
        const resp = await fetch("http://"+api.hostname + ":" + api.port + api.context + additionalApiContext + "/currentTimestamp")
        if(!resp.ok)
            throw new Error('Unable to fetch data')
        const data = await resp.json();
        return data;       
    } 
    catch(err) 
    {
        return false;
    }
}