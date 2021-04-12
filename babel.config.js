module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: [['transform-remove-console', { exclude: ['error', 'warn'] }]],
      },
    },

    presets: ['babel-preset-expo'],
  };
};
