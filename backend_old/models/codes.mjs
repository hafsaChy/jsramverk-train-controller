// const fetch = require('node-fetch')
// const database = require('../db/database.mjs');
import fetch from 'node-fetch';


const codes = {
    getCodes: async function getCodes(req, res){
        const query = `<REQUEST>
                  <LOGIN authenticationkey="${process.env.REACT_APP_TRV_APIKEY}" />
                  <QUERY objecttype="ReasonCode" schemaversion="1">
                        <INCLUDE>Code</INCLUDE>
                        <INCLUDE>Level1Description</INCLUDE>
                        <INCLUDE>Level2Description</INCLUDE>
                        <INCLUDE>Level3Description</INCLUDE>
                  </QUERY>
            </REQUEST>`;


            const response = await fetch(
                "https://api.trafikinfo.trafikverket.se/v2/data.json", {
                    method: "POST",
                    body: query,
                    headers: { "Content-Type": "text/xml" }
                }
            );
            const result = await response.json();
    
            return result.RESPONSE.RESULT[0].ReasonCode;
        }
    };
    
    // module.exports = codes;
    export default codes;
