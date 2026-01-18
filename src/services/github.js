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

// Fetch commit stats from repos (more reliable than events)
export const fetchTotalCommits = async (username, repos) => {
  if (!repos || repos.length === 0) return 0;
  
  try {
    // Get commit count from first 10 repos
    const reposToCheck = repos.slice(0, 10);
    const commitPromises = reposToCheck.map(async (repo) => {
      try {
        const response = await fetch(
          `${GITHUB_API_BASE}/repos/${username}/${repo.name}/commits?per_page=1`,
          { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );
        
        if (!response.ok) return 0;
        
        // Get total count from Link header
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            const count = parseInt(match[1], 10);
            return isNaN(count) ? 0 : count;
          }
        }
        
        // If no pagination, check if there are any commits
        const commits = await response.json();
        return Array.isArray(commits) && commits.length > 0 ? commits.length : 0;
      } catch (error) {
        console.warn(`Failed to fetch commits for ${repo.name}:`, error);
        return 0;
      }
    });
    
    const commitCounts = await Promise.all(commitPromises);
    const total = commitCounts.reduce((sum, count) => sum + count, 0);
    return typeof total === 'number' && !isNaN(total) ? total : 0;
  } catch (error) {
    console.error('Error fetching total commits:', error);
    return 0;
  }
};

export const fetchAllUserData = async (username) => {
  try {
    const [user, repos, events] = await Promise.all([
      fetchGitHubUser(username),
      fetchUserRepos(username),
      fetchUserEvents(username),
    ]);

    // Get commit stats from repos
    const totalCommits = await fetchTotalCommits(username, repos);

    return {
      user,
      repos,
      events,
      totalCommits: typeof totalCommits === 'number' && !isNaN(totalCommits) ? totalCommits : 0,
    };
  } catch (error) {
    throw error;
  }
};
