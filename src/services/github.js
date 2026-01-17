// GitHub API service for fetching user data

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGitHubUser = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

export const fetchUserEvents = async (username) => {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const fetchAllUserData = async (username) => {
  try {
    const [user, repos, events] = await Promise.all([
      fetchGitHubUser(username),
      fetchUserRepos(username),
      fetchUserEvents(username),
    ]);

    return {
      user,
      repos,
      events,
    };
  } catch (error) {
    throw error;
  }
};
