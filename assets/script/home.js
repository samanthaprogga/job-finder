'use strict';

async function fetchUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=4');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function displayUsers() {
    const users = await fetchUsers();
    const userContainer = document.getElementById('userContainer');
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.style.backgroundColor = '#1c1e21';
        userCard.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)';

        const profilePicture = document.createElement('img');
        profilePicture.src = user.picture.large;
        profilePicture.alt = 'Profile Picture';
        profilePicture.classList.add('profile-picture');
        userCard.appendChild(profilePicture);

        const fullName = document.createElement('h3');
        fullName.textContent = `${user.name.first} ${user.name.last}`;
        fullName.classList.add('full-name');
        userCard.appendChild(fullName);

        const city = document.createElement('p');
        city.textContent = `City: ${user.location.city}`;
        city.classList.add('city');
        userCard.appendChild(city);

        userContainer.appendChild(userCard);
    });
}

function initPostOptions() {
    const postInput = document.querySelector('.post-here input');
    const postButton = document.querySelector('.fa-circle-arrow-right');
    let tempMediaContent = null;
    const mediaPreviewContainer = document.querySelector('.post-here .media-preview');

    postButton.addEventListener('click', function() {
        if (tempMediaContent) {
            createPost(tempMediaContent, 'media', new Date());
            tempMediaContent = null;
            postInput.value = '';  // Clear the input field
            mediaPreviewContainer.innerHTML = '';  // Clear the preview
        } else if (postInput.value.trim()) {
            createPost(postInput.value.trim(), 'text', new Date());
            postInput.value = '';
        }
    });

    const photoButton = document.querySelector('.photo');
    photoButton.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*, video/*';
        fileInput.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(ev) {
                tempMediaContent = {src: ev.target.result, type: file.type.startsWith('image') ? 'image' : 'video'};
                displayMediaPreview(tempMediaContent, mediaPreviewContainer, postInput);
            };
            reader.readAsDataURL(file);
        };
        fileInput.click();
    });
}

function displayMediaPreview(mediaContent, container, inputField) {
    container.innerHTML = '';  // Clear previous content
    if (mediaContent.type === 'image') {
        const img = document.createElement('img');
        img.src = mediaContent.src;
        img.alt = "Image Preview";
        img.style.maxWidth = '50px';  // Display as a small thumbnail
        img.style.maxHeight = '50px';
        container.appendChild(img);
        inputField.value = 'Image attached';  // Indicate attachment
    } else if (mediaContent.type === 'video') {
        const icon = document.createElement('i');
        icon.className = 'fa fa-video';
        icon.style.fontSize = '24px';  // Display a video icon
        container.appendChild(icon);
        inputField.value = 'Video attached';  // Indicate attachment
    }
}

function createPost(content, type, timestamp) {
    const postsContainer = document.querySelector('.posts');
    const postHereSection = document.querySelector('.post-here');
    const postElement = document.createElement('div');
    postElement.className = 'friends-post';

    let dateFormatted = formatDate(timestamp);

    let innerHTMLContent = `
        <div class="post-heading">
            <div class="heading-profile">
                <div class="profile-pic"><a href="#"><img src="./assets/img/pfp.jpg" alt="user"></a></div>
                <div class="profile-info">
                    <h3>Nishat Samanta</h3>
                    <p class="time-posted">${dateFormatted}</p>
                </div>
            </div>
        </div>
        <div class="post-content">`;

    if (type === 'text') {
        innerHTMLContent += `<p>${content}</p>`;
    } else if (type === 'media') {
        innerHTMLContent += content.type === 'image' ? `<img src="${content.src}" alt="Posted Image"/>` : `<video controls src="${content.src}"></video>`;
    }

    innerHTMLContent += `
            <div>
                <a href="#"><i class="far fa-thumbs-up"></i> Like</a>
                <a href="#"><i class="fa-regular fa-message"></i> Comment</a>
                <a href="#"><i the="fa-regular fa-share-from-square"></i> Share</a>
            </div>
        </div>`;

    postElement.innerHTML = innerHTMLContent;
    postsContainer.insertBefore(postElement, postHereSection.nextSibling); // Insert new post right after the post-container
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        displayUsers();
        initPostOptions();
    });
} else {
    displayUsers();
    initPostOptions();
}
