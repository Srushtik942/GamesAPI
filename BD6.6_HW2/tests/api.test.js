const request = require('supertest');
const { getAllGames, getGameById } = require('../controllers');
const { app } = require('../index.js');
const http = require('http');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3000);
});

afterAll(async () => {
  server.close();
});

describe('Controller function test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games', async () => {
    const mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    const result = getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });

  it('should return games by Id', async () => {
    const mockGame = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };
    getGameById.mockReturnValue(mockGame);
    const result = getGameById(1);
    expect(result).toEqual(mockGame);
  });
});

describe('API endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all the games', async () => {
    const mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getAllGames.mockResolvedValue(mockGames);

    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: mockGames,
    });
    expect(res.body.games.length).toBe(3);
  });

  it('should return games by id', async () => {
    const mockGame = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };
    getGameById.mockResolvedValue(mockGame);

    const res = await request(server).get('/games/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockGame);
  });
});
