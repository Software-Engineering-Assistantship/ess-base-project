import RoomEntity from '../entities/room.entity';
import BaseRepository from './base.repository';

class RoomRepository extends BaseRepository<RoomEntity> {
  constructor() {
    super('rooms');
  }

  public async getRooms(): Promise<RoomEntity[]> {
    return await this.findAll();
  }

  public async getRoom(id: string): Promise<RoomEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createRoom(data: RoomEntity): Promise<RoomEntity> {
    return await this.add(data);
  }

  public async updateRoom(
    id: string,
    data: RoomEntity
  ): Promise<RoomEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteRoom(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default RoomRepository;
