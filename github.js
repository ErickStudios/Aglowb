/**
 * github.js
 * 
 * funciones de github
 */

function encodeBase64(content) {
    console.log(btoa(unescape(encodeURIComponent(content))));
  return btoa(unescape(encodeURIComponent(content)));
}

export async function editGitHubFile({ file, content, repo, username, token }) {
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${file}`;

  // Obtener el SHA actual
  const getResponse = await fetch(apiUrl, {
    headers: { Authorization: `token ${token}` }
  });
  if (!getResponse.ok) throw new Error("No se pudo obtener el archivo");
  const fileData = await getResponse.json();

  // Enviar el nuevo contenido con el SHA correcto
  const putResponse = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`
    },
    body: JSON.stringify({
      message: `Edit ${file}`,
content: encodeBase64(content),
      sha: fileData.sha
    })
  });

  if (!putResponse.ok) throw new Error(`No se pudo editar el archivo: ${putResponse.status}`);
  return await putResponse.json();
}

export async function getGithubFile({ file, repo, username }) {
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${file}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("No se pudo obtener el archivo");
  const data = await response.json();
  return atob(data.content); // decodifica base64
}