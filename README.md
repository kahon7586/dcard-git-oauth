<!-- ctrl + shift + v to preview -->
<!-- ctrl + k, then press v to split -->

# Frontend Intern Homework

_maded by kahon7586 in 2024/03_

[Repository](https://github.com/kahon7586/dcard-git-oauth)  
[Live demo with vercel](https://dcard-git-oauth.vercel.app/)

_Edit at 2024/03/21_

## Introduction

This homework is maded by Nextjs 14.1, App router, Typescript and with these following library:

- Tailwind
- Tailwind-merge
- Authjs(Next Auth)
- Octokit
- github-markdown-css
- some other third-party lib...

To run this project, please use `npm run dev` for developer mode or `npm run build`, then `npm run start` for prodution mode.

## Project structure

### Authorization:

This project is registered as OAuth App in GitHub, and use Authjs to handle authentication and authorization.

_Sensitive infomation such as token will be properly handle with SSR and Next Auth ;)_

User can login with their GitHub account, then receive a role "user" or "admin" according to `adminList` (/app/data/admin.ts)

**User:** only access to read.

**Admin:** can read, write, edit and delete (or close) issues.

### Post, Read, Edit and Delete:

Post: post an issue.  
Read: load infomation of issues from repo, 10 issues per request.  
Edit: update an issue.  
Delete: close an issue.

App will conditionally render buttons with these function according to their role by component `AdminOnly`.

Generally speaking these functionality can only accessed by admin, however any request with wrong token will also forbidded by GitHub.

### Issue List

Issue list is designed as a infinite scroll container by using a custom hook: `useInfiniteScroll`, every time user scroll down to the bottom will send a request for more data, the condition of loading state and out of data are also properly handled.

##### _Repo is targeted in environment variables_

##### Note that pull requests are currently included.

### Issue Page

App will fetch data about this issue and render markdown content with correctly style.

When preview markdown, due to gfm (GitHub flavored markdown), the raw body data needs to convert by Github for the most accurate output, so there will be an obvious delay for response.

Title and body will need to be validated before sending request, if validation failed, the form action will interrupt and show error message.

**Note about XSS attack:**  
The way to display markdown content is directly fetching body data in HTML form from rest api and assign it into `dangerouslySetInnerHTML`, but there's no confirm that Github sanitized these HTML for us.  
However implement xss sanitizer will remove some special syntax (like task list), so these data still remain unsanitized.  
Warning about this danger is also commented in code.
