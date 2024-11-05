const { cwd } = require("process")

// ecosystem.config.js
module.exports = {
	apps: [
		{
			cwd: ".",
			name: "frontend",
			script: "npm run start",
			args: "start",
			env: {
				NODE_ENV: "production",
				PORT: 3000,
			},
		},
	],
	deploy: {
		staging: {
			user: "root",
			host: ["138.197.114.200"],
			ref: "origin/staging",
			repo: "git@github.com:MakanaMakesStuff/Portfolio-2025.git",
			path: "/home/portfolio",
			"post-deploy":
				"cd ~/home/portfolio/source && sh scripts/deploy.sh staging",
			// "post-setup": "cd ./source && npm install || exit",
			// "post-deploy": "cd ./source && sh scripts/deploy.sh staging",
		},
	},
}
