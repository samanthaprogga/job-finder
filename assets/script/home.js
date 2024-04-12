
async function fetchUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=4');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Function to create user cards and display user information
async function displayUsers() {
    const users = await fetchUsers();
    const userContainer = document.getElementById('userContainer');

    // Loop through each user and create a user card with a background color
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        // Set the background color for the user card
        userCard.style.backgroundColor = '#1c1e21';
        userCard.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)';

        // Display profile picture
        const profilePicture = document.createElement('img');
        profilePicture.src = user.picture.large;
        profilePicture.alt = 'Profile Picture';
        profilePicture.classList.add('profile-picture');
        userCard.appendChild(profilePicture);

        // Display full name
        const fullName = document.createElement('h3');
        fullName.textContent = `${user.name.first} ${user.name.last}`;
        fullName.classList.add('full-name');
        userCard.appendChild(fullName);

        // Display city below user name
        const city = document.createElement('p');
        city.textContent = `City: ${user.location.city}`;
        city.classList.add('city');
        userCard.appendChild(city);

        // Append user card to the container
        userContainer.appendChild(userCard);
    });
}

// Ensure the displayUsers function is called after the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayUsers);
} else {
    displayUsers();
}
