import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScheduleService } from '@src/schedule/schedule.service';
import { Schedule } from '@src/schedule/entities/schedule.entity';
import { ScheduleTestMocks } from '@src/commom/tests/mocks/schedule';

describe('ScheduleService', () => {
  let service: ScheduleService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    checkAvailability: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: mockRepository,
        },
      ],
    }).compile();

    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOneBy.mockReset();
    mockRepository.update.mockReset();
    mockRepository.remove.mockReset();
    mockRepository.checkAvailability.mockReset();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When create a schedule.', () => {
    it('shoud create a new schedule.', async () => {
      const schedule = ScheduleTestMocks.getValidScheduleDto();
      jest.spyOn(service, 'create').mockResolvedValueOnce(schedule);
      const newSchedule = await service.create(schedule);

      expect(newSchedule).toMatchObject({
        plate: schedule.plate,
        type: schedule.type,
        start: schedule.start,
        finish: schedule.finish,
        status: schedule.status,
      });
    });

    it('should return InternalServerErrorException for error on schedule creation.', async () => {
      const schedule = ScheduleTestMocks.getValidScheduleDto();
      mockRepository.create.mockReturnValue(schedule);
      mockRepository.save.mockReturnValue(null);

      await service.create(schedule).catch((ex) => {
        expect(ex).toBeInstanceOf(InternalServerErrorException);
        expect(ex).toMatchObject({
          message: 'Problem to create a schedule. Try again!',
        });
      });
    });
  });

  describe('When find all schedules.', () => {
    it('should be list all schedules.', async () => {
      const schedule = ScheduleTestMocks.getValidScheduleDto();
      mockRepository.find.mockReturnValue([schedule, schedule]);
      const schedules = await service.findAll();

      expect(schedules).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When find one schedule by id.', () => {
    it('should find a existing schedule.', async () => {
      const schedule = ScheduleTestMocks.getValidSchedule();
      mockRepository.findOneBy.mockReturnValue(schedule);
      const id = '00000000-0000-0000-0000-000000000000';
      const foundSchedule = await service.findOne(id);

      expect(foundSchedule).toMatchObject({
        plate: schedule.plate,
        type: schedule.type,
        start: schedule.start,
        finish: schedule.finish,
        status: schedule.status,
      });
      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException for invalid schedule.', async () => {
      mockRepository.findOneBy.mockReturnValue(null);
      const id = '00000000-0000-0000-0000-000000000000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Schedule not found!',
        });
      });
      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('When update schedule by id.', () => {
    it('should perform update to existing schedule.', async () => {
      const schedule = ScheduleTestMocks.getValidSchedule();
      mockRepository.findOneBy.mockReturnValue(schedule);
      const newStatus = 'CONFIRMED';
      jest.spyOn(service, 'update').mockResolvedValueOnce(schedule);
      const id = '00000000-0000-0000-0000-000000000000';
      const updateScheduleData = {
        status: newStatus,
      };
      mockRepository.update.mockReturnValue({
        ...schedule,
        ...updateScheduleData,
      });
      mockRepository.create.mockReturnValue({
        ...schedule,
        ...updateScheduleData,
      });
      const updatedSchedule = await service.update(id, {
        ...schedule,
        ...updateScheduleData,
      });

      expect(updatedSchedule).toMatchObject({
        status: schedule.status,
      });
    });

    it('should perform update to existing schedule.', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
    });
  });

  describe('When delete schedule by id.', () => {
    it('should perform delete to existing schedule.', async () => {
      const schedule = ScheduleTestMocks.getValidScheduleDto();
      mockRepository.findOneBy.mockReturnValue(schedule);
      mockRepository.remove.mockReturnValue(schedule);
      const id = '00000000-0000-0000-0000-000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toBe(true);
      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should not perform delete to existing schedule.', async () => {
      const schedule = ScheduleTestMocks.getValidScheduleDto();
      mockRepository.findOneBy.mockReturnValue(schedule);
      mockRepository.remove.mockReturnValue(null);
      const id = '00000000-0000-0000-0000-000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toBe(false);
      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
