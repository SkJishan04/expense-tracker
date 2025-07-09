const baseUrl = import.meta.env.VITE_API_BASE_URL;
useEffect(() => {
  fetch(`${baseUrl}/api/expenses`)
    .then(res => res.json())
    .then(data => setExpenses(data));
}, []);

await fetch(`${baseUrl}/api/expenses`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newExpense),
});
