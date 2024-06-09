
export async function getTitle(){
    const res = await fetch('https://story-shack-cdn-v2.glitch.me/generators/book-title-generator?count=10');
    if(!res.ok || res.status !== 200)
        return "";
    const {data} = await res.json();
    if(!data || data.length < 1) return "";
    let {name} = data[0];
    return name ? name.replace(/[^A-Za-z0-9]/g, "_").toLowerCase() : "";
}
