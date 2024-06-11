/**
 * Get the actual nice url for the license 
 * @param String uri for the license
 * @returns 
 */
export async function getLicenseUrl(uri){
    const res = await fetch(uri);
    if(!res.ok || res.status !== 200) throw `${res.status} ==> Failed to get license
    information from api: ${res.statusText}`
    let data = await res.json();
    return data.html_url;
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
        ({url, name: newName, spdx_id}) => {
            let b = {value: {name: spdx_id, uri:url}, name: newName, description: newName};
            return b;
        }
    )
    //return a default
    return {value:"mit", name: "MIT License", description: "MIT License"}
}