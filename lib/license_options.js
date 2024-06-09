import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * 
 * @returns Get license options for the drop-list
 * from locally sourced file in 
 * [
 *   {value:"value_toStore", 
 *   name:"nameShownInList", 
 *   description:"A description"
 *   }
 * ]
 */

export async function getLicenseTypesLocal(){

    try{
    let path = resolve('./data/license_types.json');
    const contents = await readFile(path, 'utf-8');
    return xformer(JSON.parse(contents));
    }catch(err){
        console.error(err);
        throw err;
    }finally{
        //not closing file here as docs say only required 
        //if using file descriptor parameter
    }
}

/**
 * 
 * @returns Get license options for the drop-list
 * from github api (why not, right?)
 * Result is: 
 * [
 *   {value:"value_toStore", 
 *   name:"nameShownInList", 
 *   description:"A description"
 *   }
 * ]
 */
export async function getLicenseTypes(){
    const res = await fetch('https://api.github.com/licenses');
    if(!res.ok || res.status !== 200) throw `${res.status} ==> Failed to get license
    information from api: ${res.statusText}`

    let data = await res.json();
    return xformer(data);
}

/**
 * 
 * Takes in data from either the api or the local file (same structure)
 * @param [
 *   {
 *    key:"key", 
 *    name:"name", 
 *    spdx_id:"id", 
 *    url:"aURL", 
 *    node_id:"nodeId"
 *   }
 * ] data
 * @returns  
 * [
 *   {value:"value_toStore", 
 *   name:"nameShownInList", 
 *   description:"A description"
 *   }
 * ]
 */
const xformer = (data) => {
    // console.log(data)
    if(data)
    return data.map(
        ({url, name: newName}) => {
            let b = {value: url, name: newName, description: newName};
            return b;
        }
    )
    //return a default
    return {value:"mit", name: "MIT License", description: "MIT License"}
}