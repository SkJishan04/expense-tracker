useEffect(() => {
  fetch('http://localhost:5000/api/expenses')
    .then(res => res.json())
    .then(data => setExpenses(data));
}, []);

await fetch('http://localhost:5000/api/expenses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newExpense),
});
