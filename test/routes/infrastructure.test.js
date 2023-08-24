import infrastructureController from '../controllers/infrastructure';

describe('Infrastructure Controller', () => {
  const mockInfrastructure = {
    name: 'Building A',
    type: 'Office',
    wing: 'East',
    floor: 3,
    capacity: 100,
  };

  it('should add infrastructure', async () => {
    const createSpy = jest.spyOn(infrastructureController, 'create');
    createSpy.mockResolvedValue(mockInfrastructure);

    const result = await infrastructureController.addInfrastructure(mockInfrastructure);
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
    const readSpy = jest.spyOn(infrastructureController, 'read');
    readSpy.mockResolvedValue([mockInfrastructure]);

    const result = await infrastructureController.readInfrastructure(filter, limit);
    expect(result).toEqual([mockInfrastructure]);
    expect(readSpy).toHaveBeenCalledWith(filter, limit);
  });

  it('should update infrastructure', async () => {
    const filter = { name: 'Building A' };
    const updateData = { capacity: 150 };
    const updatedInfrastructure = { ...mockInfrastructure, capacity: 150 };
    const updateSpy = jest.spyOn(infrastructureController, 'update');
    updateSpy.mockResolvedValue(updatedInfrastructure);

    const result = await infrastructureController.updateInfrastructure(filter, updateData);
    expect(result).toEqual(updatedInfrastructure);
    expect(updateSpy).toHaveBeenCalledWith(filter, updateData);
  });

  it('should remove infrastructure', async () => {
    const filter = { name: 'Building A' };
    const removedInfrastructure = { ...mockInfrastructure };
    const removeSpy = jest.spyOn(infrastructureController, 'remove');
    removeSpy.mockResolvedValue(removedInfrastructure);

    const result = await infrastructureController.removeInfrastructure(filter);
    expect(result).toEqual(removedInfrastructure);
    expect(removeSpy).toHaveBeenCalledWith(filter);
  });
});
