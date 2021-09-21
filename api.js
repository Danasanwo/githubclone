const github_data = {
    token: atob('Z2hwX3NhUG1RNWd2Y0w1VGg1eXVxT1lmVjNuUVFFdXpTajE0empjMw=='),
    username: 'danasanwo',
};

const body = {
    query: `
          {
          viewer {
    repositories(first: 10) {
      edges {
        node {
          id
          name
          description
          descriptionHTML
          updatedAt
          isPrivate
          primaryLanguage {
            color
            name
          }
        }
      }
    }
    login
  }
}
    `,
};

const baseUrl = 'https://api.github.com/graphql';

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'bearer ' + github_data.token,
};

fetch(baseUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
})
    .then((response) => response.json())
    .then((data) =>
        data.data.viewer.repositories.edges.forEach((e) => {
            console.log(e.node.name);
            const repo = document.createElement('div');
            repo.className = 'repo-item';
            const details = document.createElement('div');
            const button = document.createElement('div');

            repo.appendChild(details);
            repo.appendChild(button);

            // header
            const header = document.createElement('div');
            header.className = 'repo-item-header';

            details.appendChild(header);

            const title = document.createElement('h1');
            title.innerHTML = e.node.name;

            const public = document.createElement('span');

            public.innerHTML = 'public';

            header.appendChild(title);
            header.appendChild(public);

            // description
            const description = document.createElement('p');
            description.className = 'repo-description';
            description.innerHTML = e.node.description;
            details.appendChild(description);

            // footer

            const footer = document.createElement('div');
            footer.className = 'repo-footer';

            // primaryLanguage

            const primaryLang = document.createElement('div');

            const langCircle = document.createElement('div');
            langCircle.className = 'langCircle';
            langCircle.style.backgroundColor = e.node.primaryLanguage.color;

            const lang = document.createElement('span');
            lang.innerHTML = e.node.primaryLanguage.name;

            primaryLang.appendChild(langCircle);
            primaryLang.appendChild(lang);

            footer.appendChild(primaryLang);

            // updatedat

            const updateDate = document.createElement('p');

            updateDate.innerHTML = 'Updated on ' + e.node.updatedAt;

            footer.appendChild(updateDate);
            details.appendChild(footer);

            const starButton = document.createElement('button');
            starButton.innerHTML = `
             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star mr-1">
                  <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
             </svg> Star
            `;

            button.appendChild(starButton);

            const repolists = document.getElementById('repo-lists');
            repolists.appendChild(repo);
        })
    )
    .catch((err) => console.log(JSON.stringify(err)));
