import { curtir } from '../../src/controllers/like.controllers';
import fs from 'fs';

jest.mock('fs');
jest.mock('path', () => ({
  resolve: jest.fn(() => './src/database/users.json'),
}));

test('Deve curtir uma série com sucesso', async () => {
  const req = { 
    params: { userid: 'Ykaro' }, 
    body: { serie: 'The Boys' }
  };
  
  const res = { 
    status: jest.fn().mockReturnThis(), 
    json: jest.fn() 
  };

  const mockUserData = [{ user: 'Ykaro', 'Séries Curtidas': [] }];
  
  fs.readFileSync.mockReturnValue(JSON.stringify(mockUserData));
  fs.writeFileSync.mockImplementation(() => {}); 

  await curtir(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Série curtida com sucesso!',
    user: { user: 'Ykaro', 'Séries Curtidas': ['The Boys'] },
  });
});
