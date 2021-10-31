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
- id
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
- user_id
- status of order (active or complete)

#### Order products
- id
- product_id
- order_id
- quantity of each product in the order


## Data schema

#### User

   Column   |          Type          | Collation | Nullable |              Default
------------|------------------------|-----------|----------|-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 user_name  | character varying(64)  |           | not null |
 first_name | character varying(64)  |           | not null |
 last_name  | character varying(64)  |           | not null |
 password   | character varying(255) |           | not null |

 Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### Product

 Column |         Type          | Collation | Nullable |               Default
--------|-----------------------|-----------|----------|--------------------------------------
 id     | integer               |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(64) |           | not null |
 price  | integer               |           | not null |

 Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)


#### Order

 Column  |     Type     | Collation | Nullable |              Default
---------|--------------|-----------|----------|------------------------------------
 id      | integer      |           | not null | nextval('orders_id_seq'::regclass)
 status  | order_status |           | not null |
 user_id | integer      |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

#### Order products

   Column   |  Type   | Collation | Nullable |                  Default
------------|---------|-----------|----------|--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           | not null |
 order_id   | integer |           | not null |
 product_id | integer |           | not null |

Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)