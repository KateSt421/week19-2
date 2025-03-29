// Функция для добавления поста в DOM
function createPostElement(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;

  const bodyElement = document.createElement("p");
  bodyElement.textContent = post.body;

  postDiv.appendChild(titleElement);
  postDiv.appendChild(bodyElement);

  return postDiv;
}

// Функция для создания поста
function createPost(title, body) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json()) // Первый обработчик then
    .then((json) => {
      addPost(json); // Добавляем созданный пост в DOM
    })
    .catch((error) => {
      console.error("Ошибка при создании поста:", error); // Обработка ошибок
    });
}

// Функция для добавления поста в контейнер
function addPost(post) {
  const container = document.getElementById("postsContainer");
  const postElement = createPostElement(post);
  container.appendChild(postElement);
}

// Обработчик события отправки формы
document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    createPost(title, body); // Создаем пост
    this.reset(); // Сбрасываем форму
  });
