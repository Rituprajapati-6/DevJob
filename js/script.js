
document.querySelector(".button-container").addEventListener("click", ()=> {
    let text = document.getElementById("filter-jobs").value;
    // console.log('Text is: ',text);
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        // console.log(filteredJobs);
        showJobs(filteredJobs);
    })
})

function getJobs() {//promise
    return fetch("../data.json") 
    .then(response => response.json())
    .then(data => {
        return data;
    }) //fetch data, then convert to json, get the data
}

function filterJobs(jobs,searchText) {
    if(searchText) {
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            }else{
                return false;
            }         //look for a rolename,etc that matches the searchtext
        })
        return filteredJobs;
    }else {
        return jobs;
    }
}

function showJobs(jobs){ //passing the list of jobs
    // console.log("Jobs in showJobs:",jobs);
    let jobsContainer = document.getElementById("jobs");
    // console.log(jobsContainer); 
    let jobsHTML = "";
    jobs.forEach(job => {
        // console.log(job.logo)
        jobsHTML += `
        <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt=""/>
                    <span class="material-icons more_horiz">more_horiz</span>
                </div> 

                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button message">
                        Message
                    </div>
                </div>
            </div>
        `
    })
    // console.log(jobsHTML);  //get the different contents for each job in the HTML format
    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data);
}); //getJobs will be called only when the fetch gives out the data
