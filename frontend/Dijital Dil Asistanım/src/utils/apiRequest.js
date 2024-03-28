export const askGPT = (userInput) => {
  let response;
  fetch(import.meta.env.VITE_API_URL + "/api/query", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userInput: userInput,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      response = JSON.stringify(data.gptResponse);
    });

  return response;
};
