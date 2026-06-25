import http from 'http';

http.get('http://localhost:5000/api/projects', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const projects = JSON.parse(data);
    const weather = projects.find(p => p.title === 'Weather');
    console.log('Weather project adopter:', weather.adopter);
  });
});
