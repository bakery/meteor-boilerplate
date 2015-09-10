## -- Special edition of Meteor boilerplate
- shared packages
- app and admin split
- deployment to Heroku
- Semantic UI styles

# Project

-- Description here ---

## Running local version

Create a local version of the settings file (**settings.json**) based on **settings.example.json** inside settings folder

To run the App at http://localhost:3000

```
cd app
./run
```

To run the Admin at http://localhost:3002 (**Must be launched once the App is runnimg **)

```
cd admin
./run
```

## Settings

There are 3 sets of settings:
- local settings used when running the apps locally (settings/settings.json)
- staging settings used when staging (settings/staging.json)
- deployment settings used when deploying to production (settings/production.json)

**settings/settings.example.json** contains settings templates

## Hosting

Staging and production envs are hosted on Heroku, database is on Compose.io. We use [this buildpack](https://github.com/jordansissel/heroku-buildpack-meteor) for deployments  

### How to stage

- make sure you have [Heroku toolbet](https://toolbelt.heroku.com/) on your computer
- get a [Heroku account](https://dashboard.heroku.com/account/) (if you do not have one already) and make sure you have access to Frateli staging git account with Heroku
- to stage the app

```
./deploy app
```

- to stage the admin

```
./deploy admin
```

### How to push to production

- make sure you have [Heroku toolbet](https://toolbelt.heroku.com/) on your computer
- get a [Heroku account](https://dashboard.heroku.com/account/) (if you do not have one already) and make sure you have access to Frateli staging git account with Heroku
- to deploy the app

```
./deploy app --production
```

- to deploy the admin

```
./deploy admin --production
```

## Importing staging/production database to localhost

Grab the connection string from heroku:

```
heroku config --app frateli-app
```

Output is of the of the form:
```
mongodb://username:password@host:port/dbname
```

Dump the remote db:
```
mongodump --host hostname.mongohq.com:port --db dbname -u username -ppassword
```

Make sure there's no space between the -p and password.

This will create a /dump folder with the db dump.

Run mongorestore from parent directory:
```
mongorestore -h localhost:3001 -d meteor -path dump/remote-db
```

where *meteor* is the name of the local database and *remote-db* the name of the remote database.

## Keeping code clean

We use [jshint](http://jshint.com/) to keep javascript sane and manageable. JSHint configuration is stored in **.jshintrc**

You can install jshint using

```
npm install -g jshint
```

To enable quality checks on pre-commits, create the following hook in .git/hooks

```
touch .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

With the following content

```
#!/bin/sh

files=$(git diff --cached --name-only --diff-filter=ACM | grep ".js$")
if [ "$files" = "" ]; then
    exit 0
fi

pass=true

echo "\nValidating JavaScript:\n"

for file in ${files}; do
    result=$(jshint ${file}) # | grep "${file} is OK")
    if [ "$result" == "" ]; then
        echo "\t\033[32mJSHint Passed: ${file}\033[0m"
    else
        echo "\t\033[31mJSHint Failed: ${file}\033[0m"
        echo "\t\033[31m${result}\033[0m"
  pass=false
    fi
done

echo "\nJavaScript validation complete\n"

if ! $pass; then
    echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass JSHint but do not. Please fix the JSHint errors and try again.\n"
    exit 1
else
    echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi
```
