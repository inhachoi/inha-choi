module.exports = {
  apps: [
    {
      name: 'server',
      script: 'apps/server/src/server.js',
      cwd: '/home/ubuntu/inha-choi',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
