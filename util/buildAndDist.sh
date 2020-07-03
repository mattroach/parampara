RED='\033[0;31m'
NC='\033[0m' # No Color

printf "\n\n${RED}Building frontend${NC}\n"
cd frontend
npm install
npm run-script build

cd ..
printf "\n\n${RED}Building backend${NC}\n"
npm install
npm run-script build
printf "\n\n${RED}Creating dist file${NC}\n"
npm run-script dist