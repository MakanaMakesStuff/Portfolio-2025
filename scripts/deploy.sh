echo "Deployment started...";

# need to check if build temp exists before creating a new one
if [ ! -d "source" ]; then
	echo "Pm2 did not create source file"
	exit
fi

# try to install deps or fail early - Should be done in post setup unless you have specific needs for it here
npm install || exit

# set build dir var for nextjs deployment and start build or fail early
export BUILD_DIR=source
npm run build || exit
echo "Building in directory: $BUILD_DIR"

# once we have built successfully, we need to remove the old .next folder and rename the temp folder to .next
rm -rf .next
mv source .next
# we need to reload the server pm2 instance after our updates
pm2 startOrReload ecosystem.config.js --env $1 --update-env
pm2 reset all
pm2 save

# if we pass a port, then we will do a curl test and ensure the app is running properly
if [ -n "$2" ]; then
curl -I http://127.0.0.1:$2 & wait
fi

echo "Deployment Successful"
