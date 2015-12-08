var config  = {
  local: {
    mongo_uri: 'mongodb://localhost/sprintit',
    domaine_name: 'http://localhost/sprintit',
    api_port: '3001',
    redis_port: '6379',
    secret: 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx',
    domain: 'sprintit',
    url: 'http://localhost/sprintit/sprintit',
		token_expiration: 60,
  },

  test: {
    mongo_uri: 'mongodb://localhost/sprintit',
    domaine_name: 'http://localhost/sprintit',
    api_port: '8080',
    redis_port: '6379',
    secret: 'aMdoeb5ed87zorRdkD6gHz4ML81DcnrzeSD648ferFejmplx',
    domain: 'barhoch.bitnamiapp.com',
    url: 'http://barhoch.bitnamiapp.com/',
		token_expiration: 60,
  }
};

module.exports = config[process.env.NODE_ENV || 'local'];
