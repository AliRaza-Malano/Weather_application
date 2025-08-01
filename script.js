    
        function getWeather() {
            const city = document.getElementById("cityInput").value.trim();
            if (!city) return;
            
            const apiKey = "21515bf4afae967913a171d69e1a0743";
            const weatherContent = document.getElementById("weatherResult");
            const errorMessage = document.getElementById("errorMessage");
            const loading = document.querySelector(".loading");
            
            // Show loading, hide others
            loading.style.display = "block";
            weatherContent.style.display = "none";
            errorMessage.style.display = "none";
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then(response => {
                    if (!response.ok) throw new Error("City not found");
                    return response.json();
                })
                .then(data => {
                    // Update weather data
                    document.getElementById("cityName").textContent = data.name;
                    document.getElementById("weatherDesc").textContent = data.weather[0].description;
                    document.getElementById("temperature").textContent = Math.round(data.main.temp);
                    document.getElementById("feelsLike").textContent = `${Math.round(data.main.feels_like)}°C`;
                    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
                    document.getElementById("windSpeed").textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
                    document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
                    
                    // Set weather icon
                    const iconCode = data.weather[0].icon;
                    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    document.getElementById("weatherIcon").alt = data.weather[0].description;
                    
                    // Show weather content
                    loading.style.display = "none";
                    weatherContent.style.display = "block";
                })
                .catch(error => {
                    console.error(error);
                    loading.style.display = "none";
                    errorMessage.style.display = "block";
                });
        }
        
        // Allow search on Enter key
        document.getElementById("cityInput").addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                getWeather();
            }
        });