import service from '.';

export async function startGame(wordID?: number) {
  try {
    const body = wordID ? { wordID } : {};
    const response = await service.post('/start_game/', body);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function guess(params: { id: number; key: string; guess: string }) {
  try {
    const body = { ...params };
    const response = await service.post('/guess/', body);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function finish(params: { id: number; key: string }) {
  try {
    const body = { ...params };
    const response = await service.post('/finish/', body);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
