import { v4 as uuidv4 } from 'uuid';
import functools from "functools";


//method decorator
function logExecutionTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  //replacement method
  descriptor.value = function (...args: any[]) {
    const startTime = Date.now();
    const result = originalMethod.apply(this, args);
    const endTime = Date.now();
    console.log(`Method ${propertyKey} took ${endTime - startTime} milliseconds to execute`);
    return result;
  };

  return descriptor;
}

function required(target: any, propertyKey: string) {
  let value: any;
  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === undefined || newValue === null) {
        throw new Error(`Property ${propertyKey} is required`);
      }
      value = newValue;
    },
  });
}

function myPropertyDecorator(target: any, propertyKey: string) {
  // Do something with the property
  console.log("Decorating property:", propertyKey);
}

//accessor
function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  delete descriptor.writable;
  return descriptor;
}

//parameter decorator
function validate(validator: (value: any) => boolean) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const originalMethod = target[propertyKey];
    target[propertyKey] = function (...args: any[]) {
      const arg = args[parameterIndex];
      if (!validator(arg)) {
        throw new Error(`Invalid argument: ${arg}`);
      }
      return originalMethod.apply(this, args);
    };
  };
}

function isNonEmptyString(value: any) {
  return typeof value === "string" && value.trim() !== "";
}

//class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function BaseEntity(constructor: Function) {
  constructor.prototype.id = uuidv4();
}

//class decorator that can add fields and functions to a class
function addFieldsAndFunctions(fields: { [key: string]: any }, functions: { [key: string]: Function }) {
    return function (cls: any) {
      for (const [name, value] of Object.entries(fields)) {
        cls[name] = value;
      }
  
      for (const [name, func] of Object.entries(functions)) {
        cls[name] = functools.wraps(func)(func); // Preserve function metadata
      }
  
      return cls;
    };
  }

  //this one does dependency injection via constructor
  function inject(token: any) {
    return function (constructor: Function) {
      return function (...args: any[]) {
        const deps = constructor.parameters.map(
          (param) => param.type === token ? /* Get dependency from DI container */ : undefined
        );
        const instance = new constructor(...deps);
        return instance;
      };
    };
  }

@BaseEntity
class MyDecoratedClass {
  @logExecutionTime
  calledMethod() {
    // ...
  }


  methodWithDecoratedParam(@validate(isNonEmptyString) name: string) {
    // ...
  }
  

  @required
  fieldMember:String="decorated";
}

const instance=new MyDecoratedClass();
instance.calledMethod()