Most of this request was from researching the documentation and developing a logic to make the API calls. Here is the proposed logic:

1. Get recommendations call, with the genres that are selected by the user. This allows the user to select up to 5 genres, allowing for more flexibility in gameplay.
2. The get recommendations call returns an array of tracks. We then loop through the tracks to select a random track. We grab the artist ID from that track, and then make an GET Artist call.
3. We then make a Get Artist Top Tracks with the API call, and display them according to the user preferences of how many tracks to have.
4. We also make a Get Artists Related Artists. These are for the guessing options. I figured that displaying related Artists would make the game more challenging.

So the API calls that likely need to be made for the game are:

1. Get Recommendations (Genres)
2. Get Artist (Artist ID)
3. Get Artist Top Tracks (Artist ID)
4. Get Artist Related Artists (Artist ID)
5. OPTIONAL - Get Track (Track ID)
