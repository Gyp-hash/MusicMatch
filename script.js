// Data Playlist
const playlistsData = {
    all: [
        {
            id: 1,
            name: "Alternative Metalcore",
            activity: "energy",
            url: "https://youtube.com/playlist?list=PL4-wza6DfVaiUecS5Rsub911oUvWR8nOf",
            isFavorite: false
        },
        {
            id: 2,
            name: "Deathcore",
            activity: "energy",
            url: "https://youtube.com/playlist?list=PL4-wza6DfVajros0gtfW1nOV4VwXhAEkY",
            isFavorite: false
        },
        {
            id: 3,
            name: "Ashh Farhah",
            activity: "focus",
            url: "https://youtube.com/playlist?list=PLiCeGmGset3k6cJs8zRnspdC-Ja-OHGcC",
            isFavorite: false
        },
        {
            id: 4,
            name: "Classical Focus",
            activity: "focus",
            url: "https://youtube.com/playlist?list=PL6gx4Cwl9DGBlmzzFcLgDhKTTfNLfX1IK",
            isFavorite: false
        },
        {
            id: 5,
            name: "Instrumental Study",
            activity: "focus",
            url: "https://youtube.com/playlist?list=PL-wHyY5U9rkQ94gffcN1xJ_YNWaNk7lBp",
            isFavorite: false
        },
        {
            id: 6,
            name: "Chill Vibes - Lofi & Jazz",
            activity: "chill",
            url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
            isFavorite: false
        },
        {
            id: 7,
            name: "Acoustic Relax",
            activity: "chill",
            url: "https://www.youtube.com/watch?v=UfcAVejslrU",
            isFavorite: false
        },
        {
            id: 8,
            name: "Ambient Workspace",
            activity: "chill",
            url: "https://www.youtube.com/watch?v=W4Te7cX_6_4",
            isFavorite: false
        }
    ],
    focus: [
        {
            id: 3,
            name: "Ashh Farhah",
            activity: "focus",
            url: "https://youtube.com/playlist?list=PLiCeGmGset3k6cJs8zRnspdC-Ja-OHGcC",
            isFavorite: false
        },
        {
            id: 4,
            name: "Classical Focus",
            activity: "focus",
            url: "https://youtube.com/playlist?list=PL6gx4Cwl9DGBlmzzFcLgDhKTTfNLfX1IK",
            isFavorite: false
        },
        {
            id: 5,
            name: "Instrumental Study",
            activity: "focus",
            url: "https://youtube.com/playlist?list=PL-wHyY5U9rkQ94gffcN1xJ_YNWaNk7lBp",
            isFavorite: false
        }
    ],
    energy: [
        {
            id: 1,
            name: "Alternative Metalcore",
            activity: "energy",
            url: "https://youtube.com/playlist?list=PL4-wza6DfVaiUecS5Rsub911oUvWR8nOf",
            isFavorite: false
        },
        {
            id: 2,
            name: "Deathcore",
            activity: "energy",
            url: "https://youtube.com/playlist?list=PL4-wza6DfVajros0gtfW1nOV4VwXhAEkY",
            isFavorite: false
        }
    ],
    chill: [
        {
            id: 6,
            name: "Chill Vibes - Lofi & Jazz",
            activity: "chill",
            url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
            isFavorite: false
        },
        {
            id: 7,
            name: "Acoustic Relax",
            activity: "chill",
            url: "https://www.youtube.com/watch?v=UfcAVejslrU",
            isFavorite: false
        },
        {
            id: 8,
            name: "Ambient Workspace",
            activity: "chill",
            url: "https://www.youtube.com/watch?v=W4Te7cX_6_4",
            isFavorite: false
        }
    ]
};

// State Aplikasi
let currentActivity = 'all';
let showingFavorites = false;
let history = [];
let favorites = JSON.parse(localStorage.getItem('musicmatch_favorites')) || [];

// DOM Elements
const playlistsContainer = document.getElementById('playlistsContainer');
const playlistTitle = document.getElementById('playlistTitle');
const playlistCount = document.getElementById('playlistCount');
const activityButtons = document.querySelectorAll('.activity-btn');
const favoritesToggle = document.getElementById('favoritesToggle');
const historyToggle = document.getElementById('historyToggle');
const historyPanel = document.getElementById('historyPanel');
const closeHistory = document.getElementById('closeHistory');
const historyList = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');

// Initialize favorites in data
function initializeFavorites() {
    favorites.forEach(favId => {
        const playlist = playlistsData.all.find(p => p.id === favId);
        if (playlist) {
            playlist.isFavorite = true;
        }
    });
}

// Render Playlists
function renderPlaylists() {
    playlistsContainer.innerHTML = '';
    
    let playlistsToShow = [];
    
    if (showingFavorites) {
        playlistsToShow = playlistsData.all.filter(playlist => playlist.isFavorite);
        playlistTitle.textContent = 'Playlist Favorit';
        favoritesToggle.classList.add('active');
    } else {
        playlistsToShow = playlistsData[currentActivity];
        const activityNames = {
            'all': 'Semua Playlist',
            'focus': 'Playlist Fokus',
            'energy': 'Playlist Energi',
            'chill': 'Playlist Nyantai'
        };
        playlistTitle.textContent = activityNames[currentActivity];
        favoritesToggle.classList.remove('active');
    }
    
    playlistCount.textContent = playlistsToShow.length;
    
    if (playlistsToShow.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = showingFavorites ? 'Belum ada playlist favorit' : 'Tidak ada playlist tersedia';
        playlistsContainer.appendChild(emptyMessage);
        return;
    }
    
    playlistsToShow.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.dataset.id = playlist.id;
        
        playlistItem.innerHTML = `
            <span class="playlist-name">${playlist.name}</span>
            <button class="favorite-btn ${playlist.isFavorite ? 'active' : ''}" data-id="${playlist.id}">
                <i class="fas fa-star"></i>
            </button>
        `;
        
        // Click to open YouTube
        playlistItem.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn')) {
                window.open(playlist.url, '_blank');
                addToHistory(playlist);
            }
        });
        
        playlistsContainer.appendChild(playlistItem);
    });
    
    // Add favorite button listeners
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const playlistId = parseInt(this.dataset.id);
            toggleFavorite(playlistId);
        });
    });
}

// Toggle Favorite
function toggleFavorite(playlistId) {
    const playlist = playlistsData.all.find(p => p.id === playlistId);
    if (!playlist) return;
    
    playlist.isFavorite = !playlist.isFavorite;
    
    if (playlist.isFavorite && !favorites.includes(playlistId)) {
        favorites.push(playlistId);
    } else if (!playlist.isFavorite) {
        favorites = favorites.filter(id => id !== playlistId);
    }
    
    localStorage.setItem('musicmatch_favorites', JSON.stringify(favorites));
    renderPlaylists();
}

// Add to History
function addToHistory(playlist) {
    const historyItem = {
        id: Date.now(),
        playlistName: playlist.name,
        activity: playlist.activity,
        timestamp: new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    history.unshift(historyItem);
    if (history.length > 10) {
        history.pop();
    }
    
    updateHistoryDisplay();
}

// Update History Display
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyEmpty.style.display = 'block';
        return;
    }
    
    historyEmpty.style.display = 'none';
    
    history.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.playlistName}</strong><br>
            <small>${item.timestamp} • ${getActivityName(item.activity)}</small>
        `;
        
        li.addEventListener('click', () => {
            // Find and open the playlist
            const playlist = playlistsData.all.find(p => p.name === item.playlistName);
            if (playlist) {
                window.open(playlist.url, '_blank');
                addToHistory(playlist);
            }
        });
        
        historyList.appendChild(li);
    });
}

// Get Activity Name
function getActivityName(activityKey) {
    const names = {
        'all': 'All Role',
        'focus': 'Fokus',
        'energy': 'Energi',
        'chill': 'Nyantai'
    };
    return names[activityKey] || activityKey;
}

// Switch Activity
function switchActivity(activity) {
    currentActivity = activity;
    showingFavorites = false;
    
    // Update active button
    activityButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.activity === activity) {
            btn.classList.add('active');
        }
    });
    
    renderPlaylists();
}

// Initialize
function init() {
    initializeFavorites();
    renderPlaylists();
    updateHistoryDisplay();
    
    // Activity button listeners
    activityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchActivity(btn.dataset.activity);
        });
    });
    
    // Favorites toggle
    favoritesToggle.addEventListener('click', () => {
        showingFavorites = !showingFavorites;
        renderPlaylists();
    });
    
    // History panel
    historyToggle.addEventListener('click', () => {
        historyPanel.classList.add('active');
    });
    
    closeHistory.addEventListener('click', () => {
        historyPanel.classList.remove('active');
    });
    
    // Close history panel on outside click
    document.addEventListener('click', (e) => {
        if (!historyPanel.contains(e.target) && !historyToggle.contains(e.target)) {
            historyPanel.classList.remove('active');
        }
    });
    
    // Set All Role as baseline - LOCK HEIGHTS
    const activitiesSection = document.querySelector('.activities-section');
    const playlistsSection = document.querySelector('.playlists-section');
    
    const baseHeight = 550; // Height dari CSS
    activitiesSection.style.height = `${baseHeight}px`;
    playlistsSection.style.minHeight = `${baseHeight}px`;
    
    // Add demo history entries
    if (history.length === 0) {
        setTimeout(() => {
            if (history.length === 0) {
                addToHistory(playlistsData.all[0]);
                addToHistory(playlistsData.all[3]);
            }
        }, 100);
    }
}

// Start application
document.addEventListener('DOMContentLoaded', init);