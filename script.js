document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-btn");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label");//these labels are where we will push the data inside the circles
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardStatsContainer=document.querySelector(".stats-card")


     //return true or false based on regex
     function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex= /^(?![_-])(?!.*[_-]$)[a-zA-Z0-9_-]{3,16}$/ ;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
     }

    async function fetchUserDetails(username){
        
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true;

            //we're using a demo server, since our local server is getting blocked by the leetcode server due to security reasons. thus we set up a proxy url, due to which we set up  a demoserver which can easily fetch data from leetcode server.
            const proxyUrl='https://cors-anywhere.herokuapp.com/'
            const targetUrl='https://leetcode.com/graphql/';
            //concatenated url:https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql/

        const myHeaders=new Headers();
        myHeaders.append("content-type","application/json");

        //this query tells us what all data we need to fetch. although this is more specifically done in backend part.
        const graphql=JSON.stringify({
            query:"\n query userSessionProgress($username: String!) {\n matchedUser (username: $username) {\n submitStats {\n acSubmissionNum {\n difficulty\n count\n submissions\n } \n totalSubmissionNum{\n difficulty\n count\n submissions\n }\n }\n }\n}\n ",
            variables:{"username": username}
        })
        const requestOptions={
            method:"POST",
            headers:myHeaders,
            body: graphql,
            redirect:"follow"
        };

        const response= await fetch(proxyUrl+targetUrl,requestOptions);

            if(!response.ok){
                throw new Error("Unable to fetch the user details");
            }
            const parsedData=await response.json();
            console.log("Logging Data:",parsedData);

            const totalCounts=await fetchTotalQuestionCounts();

            displayUserData(parsedData,totalCounts);
        }
        catch(error){
            statsContainer.innerHTML="<p>No data found</p>"
        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;
        }
    }
    async function fetchTotalQuestionCounts() {
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
    
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
    
            const graphql = JSON.stringify({
                query: "\n query questionStats {\n allQuestionsCount {\n difficulty\n count\n }\n}\n "
            });
    
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };
    
            const response = await fetch(proxyUrl + targetUrl, requestOptions);
    
            if (!response.ok) {
                throw new Error("Unable to fetch total question counts");
            }
            const totalCounts = await response.json();
            console.log("Logging Total Question Counts:", totalCounts);
            return totalCounts.data.allQuestionsCount;
    
        } catch (error) {
            console.error("Error fetching total question counts:", error);
            throw error; // Re-throw to be caught by the calling function
        }
    }
    
    function updateProgress(solved,total,label,circle){
        const progressDegree=(solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent=`${solved}/${total}`;
    }
    

    function displayUserData(parsedData,totalCounts){
       
        const totalEasyQues=totalCounts[1].count;
        const totalMediumQues=totalCounts[2].count;
        const totalHardQues=totalCounts[3].count;

       
       const solvedEasyQuestions=parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
       const solvedMediumQuestions=parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
       const solvedHardQuestions=parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

       updateProgress(solvedEasyQuestions,totalEasyQues,easyLabel,easyProgressCircle);
       updateProgress(solvedMediumQuestions,totalMediumQues,mediumLabel,mediumProgressCircle);
       updateProgress(solvedHardQuestions,totalHardQues,hardLabel,hardProgressCircle);

       const cardData=[
        {label:"Overall Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
        {label:"Overall Easy Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
        {label:"Overall Medium Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
        {label:"Overall Hard Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions},
       ];

       cardStatsContainer.innerHTML = cardData.map(data => {
        return `
          <div class="card">
              <h4>${data.label}</h4>
              <p>${data.value}</p>
          </div>
        `;
      }).join(''); // 🔑 join the array to form one HTML string
      
       
         
    }

    


    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("Loggin username:",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

})