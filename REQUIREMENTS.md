## API Endpoints

#### Authentication
- Authenticate (/authenticate) POST
 parameters: {user_name,password}

#### Users
- Create (/users) POST [token required]
 parameters: {user_name,first_name, last_name, password}
- Current Order by user(/users/:id/orders) GET [token required]

#### Products
- Index (/products) GET 
- Show (/products/:id) GET 
- Create (/products) POST [token required]
 parameters:{name, price} 

#### Orders
- Create (/orders) POST [token required]
- Set status (/orders/:id) PATCH [token required]
- Add product (/orders/:id) POST [token required]

## Data Shapes
#### Product
-  id
- name
- price
#### User
- id
- user_name
- first_name
- last_name
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

