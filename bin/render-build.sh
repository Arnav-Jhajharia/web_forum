
set -o errexit

bundle install
bundle exec rails assets:precompile
bundle exec rails assets:clean
bundle exec rails webpacker:compile 
npm install yarn
yarn install

bundle exec rails db:migrate