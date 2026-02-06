const dataCache = {};

async function fetchJSON(url) {
  if (dataCache[url]) {
    return dataCache[url];
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    dataCache[url] = data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function getAllPrograms() {
  return fetchJSON('/data/programs.v1.json');
}

export async function getAllEvents() {
  return fetchJSON('/data/events.v1.json');
}

export async function getAllTeamMembers() {
  return fetchJSON('/data/team.v1.json');
}

export async function getAllImpactStories() {
  return fetchJSON('/data/impact-stories.v1.json');
}
