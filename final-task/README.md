## [Final-task](https://podogas.com/)
This app is designed for protein searching. Users need to sign in to start browsing. You can search for proteins using keywords, and then use filters and sorting options to refine your results. If you find a protein you like, you can view its details, protein structure, and related publications on its dedicated page.

##### Some technologies and services that were used in the project:
* [Firebase](https://firebase.google.com/) for authorization.
* [UnprotKB](https://www.uniprot.org/help/uniprotkb) API for proteins data.
* [Protvista-uniprot](https://github.com/ebi-webcomponents/protvista-uniprot) component for viewing protein structure.
* [React window](https://github.com/bvaughn/react-window) and [Infinite-loader](https://www.npmjs.com/package/react-window-infinite-loader) for for efficiently  rendering proteins table.
* and React, Redux, Vite, Typescript, React-router.

##### Issues:
* Absence of responsiveness. The app is properly displayed at a width of 1280px.
* Some smelly code and there are functions that do not comply to the Single Responsibility Principle.
* Protvista-uniprot throws errors and some garbage in console.
The data received from the API is not being processed or modified in any middleware; instead, it is passed directly to the components.
* The app is not very fast, but it could be because of slow internet speed.
##### Solutions:
* Implement authorization with sign-up and sign-in forms with validation. 
* Create a ProtectedRoute component for proper routing.
* Implement searching, filtering and sorting.
* Add filtering form with validation and custom OptionList element.
* Add search results table with infinite loader and react-window wrapped in autosizer.
* Create protein page with description, protein viewer page and publications list.
* Implement 'Copy to Clipboard' button in the protein description tab.
* Add publicaton cards with short description and links to publications in publications tab.
* Add preloaders, and states for buttons while request is pending, added 404 page.
* Create custom error handling for HTTP requests.
***
##### Final thoughts:
I started working on this project on May 18th, and to be honest, it was quite challenging but also exciting two weeks.
Initially, I started off in a hurry, and that's when my code started to become messy. 
However, as I gained a better understanding of the project scope, I began writing code more accurately. 
Despite that, the initial decisions I made caused some difficulties when implementing new features.
Even though I faced many challenges, I learned a lot of stuff and felt really good (I believe it has something to do with the dopamine, and brain's reward system). 
So, regardless of the grade I receive for this assignment, I consider it a fantastic experience and would like to say thank you to the Quantori team for their outstanding work.
:heartpulse: :heartpulse: :heartpulse:
##### Commands:

`npm install`
`npm run dev`
`npm run build`
