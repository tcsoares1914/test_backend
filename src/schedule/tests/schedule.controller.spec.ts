import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from '@src/schedule/schedule.controller';
import { ScheduleService } from '@src/schedule/schedule.service';
import { CreateScheduleDto } from '@src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from '@src/schedule/dto/update-schedule.dto';
import { ScheduleTestMocks } from '@src/commom/tests/mocks/schedule';

describe('ScheduleController', () => {
  let controller: ScheduleController;
  let service: ScheduleService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const schedules = ScheduleTestMocks.getSchedules();
  const newSchedule = ScheduleTestMocks.getNewSchedule();
  const updatedSchedule = ScheduleTestMocks.getUpdatedSchedule();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: mockService,
        },
      ],
    }).compile();

    mockService.create.mockReset();
    mockService.findAll.mockReset();
    mockService.findOne.mockReset();
    mockService.update.mockReset();
    mockService.remove.mockReset();

    controller = module.get<ScheduleController>(ScheduleController);
    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When try to create a new schedules.', () => {
    it('should create a new schedules.', async () => {
      const input: CreateScheduleDto = {
        plate: 'AZZ5D99',
        type: 'COMPLETE',
        start: new Date('2024-07-24 10:30:00'),
        finish: new Date('2024-07-24 11:14:59'),
        status: 'CANCELED',
      };

      mockService.create.mockResolvedValue(newSchedule);
      const response = await controller.create(input);

      expect(response).toEqual(newSchedule);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(input);
    });
    it('should throw an exception when create a new schedules.', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(service.create).rejects.toThrow();
    });
  });

  describe('When try to list all schedules.', () => {
    it('should return a list all schedules.', async () => {
      mockService.findAll.mockResolvedValue(schedules);
      const response = await controller.findAll();

      expect(response).toEqual(schedules);
      expect(typeof response).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
    it('should thow an exception when list all schedules.', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(service.findAll).rejects.toThrow();
    });
  });

  describe('When try to list one schedules.', () => {
    it('should list one schedules.', async () => {
      mockService.findOne.mockResolvedValue(schedules[0]);
      const id = '00000000-0000-0000-0000-000000000000';
      const response = await controller.findOne(id);

      expect(response).toEqual(schedules[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw an exception when list one schedules.', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      const id = '00000000-0000-0000-0000-000000000000';

      expect(controller.findOne(id)).rejects.toThrow();
    });
  });

  describe('When try to update schedules data.', () => {
    it('should update a one schedules data.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const input: UpdateScheduleDto = {
        plate: 'AZZ5D99',
      };
      mockService.update.mockResolvedValue(updatedSchedule);
      const result = await controller.update(id, input);

      expect(result).toMatchObject({
        plate: updatedSchedule.plate,
      });
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, input);
    });
    it('should throw an exception when update one schedules.', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(service.update).rejects.toThrow();
    });
  });

  describe('When try to delete schedules.', () => {
    it('should delete schedules.', async () => {
      mockService.remove.mockResolvedValue(undefined);
      const id = '00000000-0000-0000-0000-000000000000';
      const result = await controller.remove(id);

      expect(result).toBeUndefined();
    });
  });
});
