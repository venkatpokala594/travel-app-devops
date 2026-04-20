async function login() {
    const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    });

    const data = await res.json();
    document.getElementById('login-msg').innerText = data.message;
}

async function searchFlights() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    const res = await fetch(`http://localhost:5000/flights?from=${from}&to=${to}`);
    const data = await res.json();

    const results = document.getElementById('results');
    results.innerHTML = "";

    data.forEach(f => {
        const li = document.createElement('li');
        li.innerText = `${f.from} → ${f.to} : ₹${f.price}`;
        results.appendChild(li);
    });
}