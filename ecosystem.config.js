// ecosystem.config.js
module.exports = {
	apps: [
		{
			name: "frontend",
			script: "npm",
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
			path: "/home/frontend",
			"post-setup": "cd ~/source && yarn install",
			"post-deploy": "cd ~/source && sh scripts/deploy.sh staging",
		},
	},
}
