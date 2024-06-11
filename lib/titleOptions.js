/** Title Options module to deal with all things dealing with Title suggestions */

/**
 * Call book title generator to get a random selection of book titles
 * @returns random book title formatted as valid project name (e.g. moon_cow_jumped_spoon)
 * or empty string if there was none to be had or issue with the api call to server
 */
export async function getTitle() {
  try {
    //count 10 because count 1 doesn't work (hey, I didn't write it! Work with what you have!)
    const res = await fetch(
      "https://story-shack-cdn-v2.glitch.me/generators/book-title-generator?count=10"
    );
    if (!res.ok || res.status !== 200) return "";
    const { data } = await res.json();
    if (!data || data.length < 1) return "";
    let { name } = data[0];
    return name ? name.replace(/[^A-Za-z0-9]/g, "_").toLowerCase() : "";
  } catch (err) {
    console.warn("Failed to fetch random title: " + err);
    return "";
  }
}
