export async function sendMail(data) {
  const response = await fetch(`/api/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-await
  return await response.json();
}
