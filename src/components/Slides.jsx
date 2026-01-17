import { KeyframeResolver, motion } from 'framer-motion';
import { borderBottomLeftRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';

export const SlideIntro = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center gradient-purple-pink p-8"
    >
      <div className="text-center text-white">
        <motion.img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />
        <motion.h1
          className="text-6xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user.name}'s
        </motion.h1>
        <motion.h2
          className="text-7xl font-extrabold mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          GitHub Wrapped
        </motion.h2>
        <motion.p
          className="text-2xl opacity-90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Your coding journey in 2025
        </motion.p>
      </div>
    </motion.div>
  );
};

export const SlideStats = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center gradient-blue-purple p-8"
    >
      <div className="max-w-4xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          By The Numbers
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { label: 'Repositories', value: stats.totalRepos, emoji: '📦' },
            { label: 'Total Stars', value: stats.totalStars, emoji: '⭐' },
            { label: 'Commits', value: stats.totalCommits, emoji: '💻' },
            { label: 'Pull Requests', value: stats.pullRequests, emoji: '🔀' },
            { label: 'Active Days', value: stats.activeDays, emoji: '📅' },
            { label: 'Forks', value: stats.totalForks, emoji: '🍴' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
            >
              <div className="text-5xl mb-3">{stat.emoji}</div>
              <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SlideLanguages = ({ languages }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center gradient-green-blue p-8"
    >
      <div className="max-w-3xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Top Languages
        </motion.h2>
        <div className="space-y-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-white">{lang.name}</span>
                <span className="text-2xl font-bold text-white">{lang.percentage}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-white h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
              </div>
              <div className="text-white/80 mt-2 text-lg">
                {lang.count} {lang.count === 1 ? 'repository' : 'repositories'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SlideActivity = ({ insights }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center gradient-orange-pink p-8"
    >
      <div className="max-w-4xl w-full text-center">
        <motion.h2
          className="text-5xl font-bold text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Most Active Day
        </motion.h2>
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <div className="text-8xl mb-6">📆</div>
          <div className="text-6xl font-extrabold text-white mb-4">
            {insights.mostActiveDay}
          </div>
          <div className="text-3xl text-white/90">
            {insights.mostActiveDayCount} activities
          </div>
        </motion.div>
        {insights.mostStarredRepo && (
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-2xl text-white/90 mb-3">Your Most Starred Repo</div>
            <div className="text-4xl font-bold text-white mb-2">
              {insights.mostStarredRepo.name}
            </div>
            <div className="text-3xl">⭐ {insights.mostStarredRepo.stars}</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const SlidePersonality = ({ personality, user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex items-center justify-center gradient-purple-pink p-8"
    >
      <div className="max-w-3xl w-full text-center">
        <motion.h2
          className="text-5xl font-bold text-white mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Developer Personality
        </motion.h2>
        <div className="space-y-6">
          {personality.map((trait, index) => (
            <motion.div
              key={trait}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.15, type: 'spring' }}
            >
              <div className="text-4xl font-bold text-white">{trait}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 text-2xl text-white/90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Keep coding, {user.name}! 🚀
        </motion.div>
      </div>
    </motion.div>
  );
};
