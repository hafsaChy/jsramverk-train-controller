jsramverk
Repository for jsramverk course (DV1677), maintained by haco22 and glpa22.

Frontend
Starting app
# To run the app on http://localhost:9000/ from frontend/
python3 -m http.server 9000
Backend
Steps
# Check if node and npm are installed
node -v
npm -v
# Install dependencies
npm install 
Starting app
# To run the app from backend/
node app.js
Security scan and fixing vulnerabilities
# To check vulnerabilities
npm audit
# To fix vulnerabilities
npm audit fix
Vulnerabilities found in Specifikation
11 vulnerabilities found where severity of 3 are moderate and 8 are high.

Vulnerabilities: Three kinds of vulnerabilities are found in Specifikation.

Inefficient Regular Expression Complexity vulnerability: "Attackers can create crafted inputs that intentionally cause the regular expression to use excessive backtracking in a way that causes the CPU consumption to spike"1.

Regular expression denial of service (ReDoS): "A ReDoS attack attempts to slow down or even render an application unavailable. It is attacked the A as in Availability in the famous CIA triad of cybersecurity. Attackers do this by providing an application with a malicious string to be processed by its regex engine against a vulnerable (or "evil") regex pattern. The processing of the malicious string exhausts the computing power or memory available, thus impacting the application's performance and, in certain circumstances, causing a denial of service (or DoS)."2

Prototype Pollution: "Prototype pollution is a JavaScript vulnerability that enables an attacker to add arbitrary properties to global object prototypes, which may then be inherited by user-defined objects."3

High severity vulnerabillies:

debug <=2.6.8 -Inefficient Regular Expression Complexity vulnerability and ReDoS.
express 2.5.8 - 4.15.4 || 5.0.0-alpha.1 - 5.0.0-alpha.5 -Depends on vulnerable versions of debug, finalhandler, fresh, qs, send and serve-static.
finalhandler <=1.0.5 -Depends on vulnerable versions of debug
send <=0.15.6 - Depends on vulnerable versions of debug, fresh, mime and ms.
serve-static 1.1.0 - 1.12.5 -Depends on vulnerable versions of send.
fresh <0.5.2 -ReDoS.
node-fetch <2.6.7 -vulnerable to Exposure of Sensitive Information to an Unauthorized Actor .
qs <=6.2.3 -Prototype Pollution Protection Bypass.
Moderate severity vulnerabillies:

mime <1.4.1 -ReDoS.
ms <2.0.0 -Inefficient Regular Expression Complexity vulnerability.
semver 6.0.0 - 6.3.0 || 7.0.0 - 7.5.1 -ReDoS.
All vulnerabilities are fixed by running npm audit fix. During fixing vulnerabilities 7 packages are added, 21 packages are removed, 25 packages are changed.

Framework
In modern front-end web development, JavaScript frameworks are an essential part. These frameworks provide developers with tried and tested tools for building scalable, interactive web applications 4. There are different types of JavaScript frameworks. For example Angular, React, Svelte, Vue etc. The JavaScript framework React is choosen to develop the project's app. React is also known as React.js or ReactJS. React is created and is being developed today by Facebook, which is the biggest framework today 5. React is used by several large websites, including Netflix, Paypal and AirBnB 6. The advantage React has over Angular and Vue is that it is easier to learn. React has more popular stars than Angular on GitHub. User can even reuse system components in React which increases the productivity and optimizes coding practices7. React is flexible but has high complexity, which requires good knowledge of Javascript 8. React is the largest and most popular framework and is judged to be that framework which is most relevant in the labor market 9.

design
inspiration
https://practicaltypography.com/

colors
Minion Yellow (#F0DB4F) and Kournikova (#FFEC6D) Gradients

Dark Charcoal (#323330)

Blue Gem (#2915a3)

Medium Red Violet (#BD2B80)

fonts
Inter UI (https://rsms.me/inter/)

Hack monospace https://sourcefoundry.org/hack/ for code snippets.

References
Footnotes
https://www.martellosecurity.com/kb/mitre/cwe/1333/, last visited 05-09-2023. ↩

https://learn.snyk.io/lesson/redos/, last visited 05-09-2023. ↩

https://portswigger.net/web-security/prototype-pollution, last visited 05-09-2023. ↩

https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks, last visited 05-09-2023. ↩

https://github.com/facebook/react, last visited 03-09-2023. ↩

https://www.sitepoint.com/vue-vs-react/#:~:text=The%20main%20difference%20between%20Vue,extended%20as%20a%20project%20grows, last visited 05-09-2023. ↩

https://www.simform.com/blog/angular-vs-react/#:~:text=Popularity%3A%20Angular%20vs%20React&text=While%20looking%20at%20popular%20stats,was%20in%20the%20fifth%20spot, last visited 05-09-2023. ↩

Stack Overflow(u.å) Most Popular Technologies, https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-andmarkup-languages-all-respondents, last visited 03-09-2023. ↩

https://react.dev/, last visited 05-09-2023. ↩
