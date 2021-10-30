## API Endpoints

#### Authentication
- Authenticate (/authenticate) POST
 parameters: {user_name,password}

#### Users
- Index (/users) GET [token required]
- Show (users/:id) GET [token required]
- Create (/users) POST [token required]
 parameters: {user_name,first_name, last_name, password}
- Delete (/users/:id) DELETE [token required]
- Current Order by user(/users/:id/orders) GET [token required]

#### Products
- Index (/products) GET 
- Show (/products/:id) GET 
- Create (/products) POST [token required]
 parameters:{name, price} 
- DELETE (/products) DELETE [token required]

#### Orders
- Index (/orders) GET [token required] 
- Create (/orders) POST [token required]
- Delete (/orders) DELETE [token required]
- Set status (/orders/:id) PATCH [token required]
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

