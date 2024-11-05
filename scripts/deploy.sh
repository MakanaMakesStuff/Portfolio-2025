echo "Deployment started...";

# try to install deps or fail early - Should be done in post setup unless you have specific needs for it here
npm install || exit
npm run build || exit

# we need to reload the server pm2 instance after our updates
pm2 startOrReload ecosystem.config.js --env $1 --update-env
pm2 reset all
pm2 save

# if we pass a port, then we will do a curl test and ensure the app is running properly
if [ -n "$2" ]; then
curl -I http://127.0.0.1:$2 & wait
fi

echo "Deployment Successful"
