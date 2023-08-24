import { addinfrastructure } from '../controllers/infrastructure';

describe('Infrastructure Controller', () => {
  const mockInfrastructure = {
    name: 'Building A',
    type: 'Office',
    wing: 'East',
    floor: 3,
    capacity: 100,
  };

  it('should add infrastructure', async () => {
    const createSpy = jest.spyOn(addinfrastructure, 'create');
    createSpy.mockResolvedValue(mockInfrastructure);

    const result = await addinfrastructure.addInfrastructure(
      mockInfrastructure
    );
    expect(result).toEqual(mockInfrastructure);
    expect(createSpy).toHaveBeenCalledWith(
      mockInfrastructure.name,
      mockInfrastructure.type,
      mockInfrastructure.wing,
      mockInfrastructure.floor,
      mockInfrastructure.capacity
    );
  });

  it('should read infrastructure', async () => {
    const filter = { name: 'Building A' };
    const limit = 5;
    const readSpy = jest.spyOn(addinfrastructure, 'read');
    readSpy.mockResolvedValue([mockInfrastructure]);

    const result = await addinfrastructure.readInfrastructure(filter, limit);
    expect(result).toEqual([mockInfrastructure]);
    expect(readSpy).toHaveBeenCalledWith(filter, limit);
  });

  it('should update infrastructure', async () => {
    const filter = { name: 'Building A' };
    const updateData = { capacity: 150 };
    const updatedInfrastructure = { ...mockInfrastructure, capacity: 150 };
    const updateSpy = jest.spyOn(addinfrastructure, 'update');
    updateSpy.mockResolvedValue(updatedInfrastructure);

    const result = await addinfrastructure.updateInfrastructure(
      filter,
      updateData
    );
    expect(result).toEqual(updatedInfrastructure);
    expect(updateSpy).toHaveBeenCalledWith(filter, updateData);
  });

  it('should remove infrastructure', async () => {
    const filter = { name: 'Building A' };
    const removedInfrastructure = { ...mockInfrastructure };
    const removeSpy = jest.spyOn(addinfrastructure, 'remove');
    removeSpy.mockResolvedValue(removedInfrastructure);

    const result = await addinfrastructure.removeInfrastructure(filter);
    expect(result).toEqual(removedInfrastructure);
    expect(removeSpy).toHaveBeenCalledWith(filter);
  });
});
