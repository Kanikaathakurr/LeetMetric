# LeetMetric

LeetMetric is a web app that lets you track your LeetCode submission stats — how many problems you’ve solved at each difficulty level (Easy, Medium, Hard) — with beautiful progress circles and detailed submission cards.

It fetches live data from the official LeetCode GraphQL API and presents your coding progress in an easy-to-understand visual format.

---

## Live Demo

Check out the live site here: [LeetMetric Live Site](https://kanikaathakurr.github.io/LeetMetric/)

---

## How to Use

1. Enter your LeetCode username in the search bar.  
2. Click the **Search** button.  
3. View your progress stats including solved problems and total submissions by difficulty.

---

## Important Note About Data Fetching (CORS Proxy)

LeetCode’s API does not allow direct requests from browsers due to CORS (Cross-Origin Resource Sharing) restrictions. To bypass this, the app uses a public CORS proxy service.

**What this means for you:**

- Before using the site, please open this link in a **new browser tab**:  
  [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo)  
- Click the button to “Request temporary access” on that page.  
- After that, return to the LeetMetric site and refresh the page to fetch your data successfully.

---

## Technologies Used

- HTML, CSS, JavaScript  
- GitHub Pages for hosting  
- LeetCode GraphQL API (via CORS proxy)

---

## How to Run Locally

1. Clone the repo:  
   ```bash
   git clone https://github.com/Kanikaathakurr/LeetMetric.git
