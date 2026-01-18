// Data processing and insights generation

export const processGitHubData = (data) => {
  const { user, repos, events, totalCommits } = data;

  // Language statistics
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang, count]) => ({
      name: lang,
      count,
      percentage: Math.round((count / repos.length) * 100),
    }));

  // Use the totalCommits from API instead of calculating from events
  // Also fallback to events if API fails
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  const eventCommits = pushEvents.reduce((sum, event) => {
    return sum + (event.payload?.commits?.length || 0);
  }, 0);
  
  // Use the higher value between direct API and events, handle NaN/undefined
  const finalCommits = Math.max(totalCommits || 0, eventCommits || 0);

  // Activity by day of week
  const dayActivity = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  const dayNames = Object.keys(dayActivity);
  events.forEach(event => {
    const date = new Date(event.created_at);
    const dayName = dayNames[date.getDay()];
    dayActivity[dayName]++;
  });

  const mostActiveDay = Object.entries(dayActivity)
    .sort(([, a], [, b]) => b - a)[0];

  // Repository statistics
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const publicRepos = repos.filter(repo => !repo.private).length;

  // Most starred repo
  const mostStarredRepo = repos.reduce((max, repo) => 
    repo.stargazers_count > (max?.stargazers_count || 0) ? repo : max
  , null);

  // Recent activity streak
  const recentDates = events
    .map(e => new Date(e.created_at).toDateString())
    .filter((date, index, self) => self.indexOf(date) === index);
  
  const activeDays = recentDates.length;

  // Contribution types
  const eventTypes = {};
  events.forEach(event => {
    eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;
  });

  // Pull requests and issues
  const prEvents = events.filter(e => e.type === 'PullRequestEvent');
  const issueEvents = events.filter(e => e.type === 'IssuesEvent');

  // Account age
  const accountCreated = new Date(user.created_at);
  const now = new Date();
  const accountAgeDays = Math.floor((now - accountCreated) / (1000 * 60 * 60 * 24));
  const accountAgeYears = Math.floor(accountAgeDays / 365);

  return {
    user: {
      name: user.name || user.login,
      login: user.login,
      avatar: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      accountAge: accountAgeYears > 0 ? `${accountAgeYears} year${accountAgeYears > 1 ? 's' : ''}` : `${accountAgeDays} days`,
    },
    stats: {
      totalRepos: publicRepos,
      totalStars,
      totalForks,
      totalCommits: finalCommits,
      activeDays,
      pullRequests: prEvents.length,
      issues: issueEvents.length,
    },
    insights: {
      topLanguages,
      mostActiveDay: mostActiveDay[0],
      mostActiveDayCount: mostActiveDay[1],
      mostStarredRepo: mostStarredRepo ? {
        name: mostStarredRepo.name,
        stars: mostStarredRepo.stargazers_count,
        url: mostStarredRepo.html_url,
      } : null,
      dayActivity,
    },
    personality: generatePersonality(topLanguages, eventTypes, finalCommits),
  };
};

const generatePersonality = (topLanguages, eventTypes, totalCommits) => {
  const personalities = [];

  // Based on top language
  if (topLanguages.length > 0) {
    const topLang = topLanguages[0].name;
    const langPersonalities = {
      JavaScript: '🚀 Frontend Wizard',
      TypeScript: '⚡ Type-Safe Architect',
      Python: '🐍 Data Sorcerer',
      Java: '☕ Enterprise Engineer',
      Go: '⚙️ Performance Enthusiast',
      Rust: '🦀 Memory Safety Guardian',
      Ruby: '💎 Rails Craftsperson',
      PHP: '🐘 Web Developer',
      C: '🔧 Systems Programmer',
      'C++': '🎮 Performance Optimizer',
      Swift: '🍎 iOS Innovator',
      Kotlin: '🤖 Android Artist',
    };
    personalities.push(langPersonalities[topLang] || '👨‍💻 Code Enthusiast');
  }

  // Based on commit activity
  if (totalCommits > 100) {
    personalities.push('📊 Commit Champion');
  } else if (totalCommits > 50) {
    personalities.push('💪 Active Contributor');
  } else {
    personalities.push('🌱 Growing Developer');
  }

  // Based on activity type
  const prCount = eventTypes['PullRequestEvent'] || 0;
  const issueCount = eventTypes['IssuesEvent'] || 0;
  
  if (prCount > issueCount && prCount > 10) {
    personalities.push('🔀 PR Maestro');
  } else if (issueCount > 10) {
    personalities.push('🐛 Bug Hunter');
  }

  return personalities;
};
