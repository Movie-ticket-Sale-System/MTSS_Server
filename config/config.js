module.exports = {
	port: 3000,
	root: __dirname + '/..',
	md5Key: '123456',
  db: {
    host : 'localhost',   
    port : 3306,   
    database : 'movie2',   
    user : 'troot',   
    password : 'troot',
    insecureAuth: true
  }
};