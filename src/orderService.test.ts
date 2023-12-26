import IOrdersService from './OrderService'// Assuming OrdersService is in a separate file
import {Order} from './index';
import {Mock,mock} from 'ts-jest-mocker';



//jest.mock('./OrdersService'); // Mock the entire service

describe('OrdersService', () => {
  let mockOrders: Order[] = [];
  let OrdersService:Mock<IOrdersService>; //declare a type of mock

  beforeEach(() => {
    OrdersService=mock<IOrdersService>();
    mockOrders = [
      { id: 1, name: 'Order 1'},
      { id: 2, name: 'Order 2'}
    ];
    jest.clearAllMocks(); // Clear any existing mocks
  });

  describe('getAll', () => {
    it('should return all orders', async () => {
      OrdersService.getAll.mockResolvedValue(mockOrders);
      const result = await OrdersService.getAll();
      expect(result).toEqual(mockOrders);
    });
  });

  describe('getById', () => {
    it('should find an order by ID', async () => {
      const orderId = 1;
      let order=mockOrders.find(order => order.id === orderId)

      OrdersService.getById.mockResolvedValue(order!=null?order:null);
      const result = await OrdersService.getById(orderId);
      expect(result).toEqual(mockOrders[0]);
    });

    it('should return null if order not found', async () => {
      const orderId = 999;
      OrdersService.getById.mockResolvedValue(null);
      const result = await OrdersService.getById(orderId);
      expect(result).toBeNull();
    });
  });

  describe('exists',()=>{

    it('should find that an order by Id exists',async()=>{
        const id=1;
        OrdersService.exists.mockResolvedValue(true);
    
        const result=await OrdersService.exists(id);
        expect(result).toBe(true);

    });

    it('should return false for an order by Id that does not exists',async()=>{
        const id=99;
       
        OrdersService.exists.mockResolvedValue(false);
    
        const result=await OrdersService.exists(id);
        expect(result).toBe(false);
    

    });

  });

  // ... Add similar tests for create, update, delete, and exists methods
});
