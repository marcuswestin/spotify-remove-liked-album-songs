import { SpotifyWebApi } from 'spotify-web-api-ts';

setTimeout(async () => {
    await main()
})

let accessToken = ''
const spotify = new SpotifyWebApi({ accessToken });

async function loveTracksOnPlaylist(playlistID: string) {
    let limit = 10
    for (let offset=0; offset<10000; offset += limit) {
        console.log('loveTracksOnPlatlist', playlistID, 'offset:', offset, 'limit:', limit)
        let items = await spotify.playlists.getPlaylistItems(playlistID, { offset, limit })
        let trackIDs = items.items.map(item => item.track.id).filter(id => !!id)
        await spotify.library.saveTracks(trackIDs)
    }
}

async function unloveTracksOnAlbum(albumID: string) {
    let limit = 50
    for (let offset=0; offset<10000; offset += limit) {
        console.log('unloveTracksOnAlbum', albumID, 'offset:', offset, 'limit:', limit)
        let albumTracks = await spotify.albums.getAlbumTracks(albumID, { offset, limit })
        let trackIDs = albumTracks.items.map(track => track.id)
        await spotify.library.removeSavedTracks(trackIDs)
    }
}

async function unloveTracksOnSavedAlbums() {
    let limit = 5
    for (let offset=0; offset<10000; offset += limit) {
        console.log('unloveTracksOnSavedAlbums', 'offset:', offset, 'limit:', limit)
        let savedAlbums = await spotify.library.getSavedAlbums({ offset, limit })
        for (let savedAlbum of savedAlbums.items) {
            await unloveTracksOnAlbum(savedAlbum.album.id)
        }
    }
}

async function main() {
    // await unloveTracksOnSavedAlbums()
    // await loveTracksOnPlaylist(starredPlatlistID)
}

