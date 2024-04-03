<!-- ctrl + shift + v to preview -->
<!-- ctrl + k, then press v to split -->

# Frontend Intern Homework

_maded by kahon7586 in 2024/03_

[Repository](https://github.com/kahon7586/dcard-git-oauth)  
[Live demo with vercel](https://dcard-git-oauth.vercel.app/)

## Introduction

This homework is maded by Nextjs 14.1, App router, Typescript and with these following library:

- Tailwind
- Tailwind-merge
- Authjs(Next Auth)
- Octokit
- github-markdown-css
- some other third-party lib...

To run this project, please use `npm run dev` for developer mode or `npm run build`, then `npm run start` for prodution mode.

## Usage

When visit home page, choose to login with github account as admin or continue as user, then enter your github repository to access issue list.

Your repository should be like: `https://github.com/{owner}/{repo}`.

Then you can read, post, edit or delete issue as admin, or read as user.

## Project structure

### **Authorization:**

This project is registered as OAuth App in GitHub, and use Authjs to handle authentication and authorization.

_Sensitive infomation such as token will be properly handle with SSR and Authjs ;)_

###### ~~User can login with their GitHub account, then receive a role "user" or "admin" according to `adminList` (/app/data/admin.ts)~~

Now anyone who login with github account is admin.

**User:** only access to read.

**Admin:** can read, write, edit and delete (or close) issues.

Any attemp from **user** to access admin only path ( eg. edit/{post} ) will be automatically redirected in `middleware.ts`

---

### **Post, Read, Edit and Delete:**

- Post: post an issue.
- Read: load infomation of issues from repo, 10 issues per request.
- Edit: update an issue.
- Delete: close an issue.

App will conditionally render buttons with these function according to their role by component `AdminOnly`.

Generally these functionality can only accessed by admin, however any request with wrong token will also forbidded by GitHub.

---

### **Issue List:**

Everytime user scrolls to bottom, 10 issue will be loaded, and `No more data!` is shown when the final issue in repo is loaded. (see `useInfiniteScroll` and `IssueList.tsx`)

If Issue list shows `Not Found`, make sure your enter the right repo path in setting.

##### Note that pull requests are currently included.

---

### **Set Repository:**

User can select their repository, and these value will be stored in cookie.

---

### **Issue Page:**

Markdown content will be displayed the same style as github.com, including issue body and comments.

When post and edit issue, you can use and preview syntax.

Title should not remain empty and body should be more than 30 charactors. If validation failded, a error message will be showned.

**_Note about XSS attack:_**  
The way to display markdown content is directly fetching body data in HTML form from rest api and assign it into `dangerouslySetInnerHTML`, but there's no confirm that Github sanitized these HTML for us.  
However implement xss sanitizer will remove some special syntax (like task list), so these data still remain unsanitized.  
Warning about this danger is also commented in code.

---

### **Other:**

- Error handling in `error.js`.
- loading state in `loading.js`.
- avoid frequently sending request with `throttle.ts` or disable prop.
- time formatter for issue-latest-updated.
- split code for DRY.
- build custom hook for proper code management.
- use github to manage dev code and vercel.com to deploy production version.
