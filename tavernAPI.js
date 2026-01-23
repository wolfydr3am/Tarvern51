/**
 * Tavern51 API Client
 * Handles Link Creation
 */

// const TAVERN_API_BASE = "https://www.tavern51.com/api";
const TAVERN_API_BASE = "http://localhost:3000/api";

/**
 * Create a new link
 * @param {Object} data
 * @param {string} data.title
 * @param {string} data.url
 * @param {string} data.directUrl
 * @param {string} data.category
 */
export async function createLink(data) {
  try {
    const response = await fetch(`${TAVERN_API_BASE}/links/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: data.title,
        url: data.url,
        directUrl: data.directUrl,
        category: data.category
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to create link");
    }

    return result;

  } catch (err) {
    console.error("[TavernAPI] Create Link Error:", err.message);
    throw err;
  }
}
