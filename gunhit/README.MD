How to setup and launch project

* run `npm install`
* run `gulp concat-greensock-libraries`
* run `gulp concat-all-libraries`
* create `.env` file and fill it with values:
    MODE=development|release
    PLATFORM=standalone
    HOST=%host_address_no_quotes%
    PORT=%port%
* run `gulp`
* go to `http:\\HOST:PORT`