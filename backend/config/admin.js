module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8407c371969f2e1f8a2acb8546000b22'),
  },
});
