// import express, { Application, Request, Response } from 'express';
// import winston from 'winston';

// // Define types for request bodies
// interface User {
//   name: string;
//   email: string;
// }

// // Configure Winston logger
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({ level: 'info' }),
//     new winston.transports.File({ filename: 'server.log', level: 'debug' }),
//   ],
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json(),
//   ),
// });

// // Create Express app
// const app: Application = express();

// // Set up middleware
// app.use(express.json()); // Parse incoming JSON data
// app.use(express.urlencoded({ extended: true })); // Parse form data
// //app.use(logger); // Log all requests

// export interface Order{
//   id:number,
//   name:string
// }

// const orders:Order[]=[];
// // Define routes
// app.get('/', (req: Request, res: Response) => {
//   logger.info('Received GET request to root path');
//   res.send('Hello, world!!!');
// });

// app.post('/users', async (req: Request, res: Response) => {
//   const user: User = req.body; // Type-safe access to user data
//   logger.debug(`Received POST request to /users with user: ${JSON.stringify(user)}`);
//   // Implement user creation logic here
//   res.send('User created successfully!');
// });

// // Handle errors globally
// app.use((err: Error, req: Request, res: Response, next: any) => {
//   logger.error(err.message);
//   res.status(500).send('Internal server error');
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   logger.info(`Server listening on port ${PORT}`);
// });

// export default app;


