export async function getData() {
  const res = await fetch(`https://json-api.uz/api/project/job-list/jobs`);
  if (res.status === 200) {
    const { data } = await res.json();
    return data;
  } else {
    return [];
  }
}
