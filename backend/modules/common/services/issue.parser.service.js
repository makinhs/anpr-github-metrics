let ghApi = require('./github.api.issue.service');
let moment = require('moment');

let lastUrl = ``;
let currentPage = 1;
let lastPage = ``;
let openIssues = [];
let closedIssues = [];


function parseClosedIssues() {
    let closedAverages = [];
    for (let i = 0; i < closedIssues.length; i++) {
        let duration = moment.duration(moment(closedIssues[i].closed_at).diff(closedIssues[i].created_at));
        let hours = duration.asHours();
        closedAverages.push(hours);
    }

    let sum = closedAverages.reduce(function (x, y) {
        return x + y;
    });
    let avg = sum / closedAverages.length;
    console.log(sum, avg);
}


function configProject(user, project) {
    ghApi.changeURL(`https://api.github.com/repos/${user}/${project}`)
}

exports.parseIssues = (user, project) => {
    configProject(user, project);
    return getFirstIssuesPage('open')
        .then((result) => {
            openIssues = result.body;

            let promises = [];
            if (parseInt(currentPage) < parseInt(lastPage)) {
                do {

                    currentPage++;
                    promises.push(getNextIssues('open', currentPage));

                } while (currentPage < parseInt(lastPage));
            }
            return Promise.all(promises);
        })
        .then((result) => {
            for (let i = 0; i < result.length; i++) {
                //todo: verify integrity
                openIssues = openIssues.concat(result[i]);
            }

            lastUrl = ``;
            currentPage = 1;
            lastPage = ``;


            return getFirstIssuesPage('closed')
                .then((result) => {
                    closedIssues = result.body;

                    let promises = [];
                    if (parseInt(currentPage) < parseInt(lastPage)) {
                        do {

                            currentPage++;
                            promises.push(getNextIssues('closed', currentPage));

                        } while (currentPage < parseInt(lastPage));
                    }
                    return Promise.all(promises);
                })
                .then((result) => {
                    for (let i = 0; i < result.length; i++) {
                        //todo: verify integrity
                        closedIssues = closedIssues.concat(result[i]);
                    }
                })

        })
        .then(() => {
            parseClosedIssues();
            //todo: finish parser
            return {
                "user": user,
                "project": project,
                "openIssues": 33,
                "avgClosedHoursTime": "12",
                "avgFirstAnswerTime": "1",
                "updatedAt": "2017-10-07T14:42:19.000Z",
                "createdAt": "2017-10-07T14:42:19.000Z"
            }
        })
};

function getNextIssues(state, page) {
    return ghApi.getIssues(state, page)
        .then((result) => {
            return result.body;
        });
}

function getFirstIssuesPage(state) {
    //todo: fix page issue
    return ghApi.getIssues(state)
        .then((result) => {
            lastPage = 1;
            // let linkHeader = result.headers.link.split('>');
            // linkHeader = linkHeader[linkHeader.length - 2];
            // linkHeader = linkHeader.split('page=');
            // linkHeader = linkHeader[linkHeader.length - 1];
            // lastUrl = result.headers.link.split('>')[0];
            // lastUrl = lastUrl.split('<')[1];
            // lastPage = lastUrl.split('page=');
            // lastPage = lastPage[lastPage.length - 1];
            //
            //
            // console.log(result.headers.link.split('>'));
            return result;
        });
}