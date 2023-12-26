import{Order} from './index';

 interface IOrdersService {
    getAll(): Promise<Order[]>;
    getById(id: number): Promise<Order | null>;
    create(order: Order): Promise<Order>;
    update(id: number, updatedOrder: Order): Promise<Order>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
  }

  export default IOrdersService;