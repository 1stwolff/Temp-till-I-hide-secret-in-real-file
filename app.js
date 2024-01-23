import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

const CLIENT_ID = "your_client_id"; 
const CLIENT_SECRET = "your_client_secret";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Requirement: A function that uses the fetch() API

    // Fetch Spotify API access token on component mount
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };

    // Using fetch() API with promises
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json()) // Using .then() method
      .then(data => setAccessToken(data.access_token)); // Interacting with promises
  }, []);

  // Requirement: A function that uses promises and interacting with promises
  // Requirement: Use of .then() method
  // Requirement: Use of the .json() method
  // Requirement: Use of async and await keywords

  // Search function to retrieve artist ID and albums
  async function search() {
    console.log("Search for " + searchInput);

    // Get request using search to get Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    // Using fetch() API with promises, .then() method, and .json() method
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0]?.id; });

    console.log("Artist ID is " + artistID);

    // Get request with Artist ID to grab all the albums from that artist
    // Using fetch() API with promises, .then() method, .json() method, and async/await
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items);
      });

    // Display those albums to the user
  }

  console.log(albums);

  return (
    <div className="App">
      <Container>
        {/* Input for artist search */}
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder='Search for Artist'
            type="input"
            onKeyPress={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>

      <Container>
        {/* Display search results as cards */}
        <Row className='mx-2 row-cols-4'>
          {albums.map((album, i) => {
            console.log(album);
            return (
              // Requirement: Use of inline styles
              <Card key={i} style={{ backgroundColor: 'green' }}>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
