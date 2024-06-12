// Function to handle liking an artwork
function likeArtwork(artworkId) {
    // Send a POST request to the server to increment likes for the specified artwork
    fetch(`/likes/${artworkId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        // Update the likes count displayed on the webpage
        document.getElementById(`likes-${artworkId}`).textContent = data.likes;
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle adding a comment to an artwork
function addComment(artworkId) {
    const commentInput = document.getElementById(`comment-${artworkId}`);
    const comment = commentInput.value.trim();

    if (comment !== '') {
        // Send a POST request to the server to add the comment for the specified artwork
        fetch(`/comments/${artworkId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        })
        .then(response => response.json())
        .then(data => {
            // Update the comments section displayed on the webpage
            const commentsDiv = document.getElementById(`comments-${artworkId}`);
            const commentList = data.comments.map(comment => `<p>${comment}</p>`).join('');
            commentsDiv.innerHTML = commentList;

            // Clear the comment input field
            commentInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    }
}

// Add event listeners to images to show comment form when clicked
const artworkImages = document.querySelectorAll('.artwork img');
artworkImages.forEach(image => {
    image.addEventListener('click', function() {
        const artworkId = this.parentElement.id;
        showCommentForm(artworkId);
    });
});

// Add event listeners to like buttons to handle liking an artwork
const likeButtons = document.querySelectorAll('.artwork button.like-button');
likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const artworkId = this.parentElement.id;
        likeArtwork(artworkId);
    });
});

// Add event listeners to comment buttons to handle adding a comment for an artwork
const commentButtons = document.querySelectorAll('.artwork button.comment-button');
commentButtons.forEach(button => {
    button.addEventListener('click', function() {
        const artworkId = this.parentElement.id;
        addComment(artworkId);
    });
});
