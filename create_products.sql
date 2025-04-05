INSERT INTO product_category (category_name)
VALUES ('Electronics'), ('Books'), ('Clothing');

INSERT INTO product (category_id, name, description, sku, quantity_in_stock, price, product_image)
VALUES 
  (1, 'Smartphone X', 'Latest phone with great camera', 'SKU-PHONE-001', 50, 999.99, 'phone.jpg'),
  (1, 'Smart Watch Z', 'Water-resistant smartwatch', 'SKU-WATCH-001', 100, 199.99, 'smartwatch.jpg'),
  (1, 'Wireless Earbuds', 'Noise cancelling earbuds', 'SKU-EARBUD-101', 200, 49.99, 'earbuds.jpg'),
  (2, 'Thriller Novel', 'A spine-chilling thriller', 'SKU-BOOK-111', 30, 14.99, 'book.jpg'),
  (2, 'Cookbook Deluxe', 'Recipes from around the world', 'SKU-BOOK-222', 20, 29.99, 'cookbook.jpg'),
  (1, 'Laptop Pro', 'High-performance laptop with a sleek design', 'SKU-LAPTOP-001', 25, 1299.99, 'laptop.jpg'),
  (1, '4K TV', 'Ultra HD Smart TV with vibrant colors', 'SKU-TV-004', 40, 499.99, 'tv.jpg'),
  (1, 'Bluetooth Speaker', 'Portable speaker with powerful sound', 'SKU-SPEAKER-001', 150, 89.99, 'speaker.jpg'),
  (1, 'Digital Camera', 'Camera with advanced lens for high-quality photos', 'SKU-CAMERA-001', 70, 399.99, 'camera.jpg'),
  (1, 'Game Console', 'Next-gen gaming console with 4K support', 'SKU-CONSOLE-001', 60, 499.99, 'console.jpg'),
  (2, 'Fictional Novel', 'A captivating fiction novel', 'SKU-BOOK-123', 50, 19.99, 'fictionbook.jpg'),
  (2, 'Science Encyclopedia', 'Comprehensive guide to the wonders of science', 'SKU-BOOK-124', 40, 39.99, 'sciencebook.jpg'),
  (2, 'Self-Help Guide', 'A motivational book for personal growth', 'SKU-BOOK-125', 60, 15.99, 'selfhelp.jpg'),
  (3, 'T-Shirt', 'Comfortable cotton T-shirt', 'SKU-TSHIRT-001', 150, 19.99, 'tshirt.jpg'),
  (3, 'Jeans', 'Classic blue jeans with a modern fit', 'SKU-JEANS-001', 100, 39.99, 'jeans.jpg'),
  (3, 'Jacket', 'Stylish winter jacket', 'SKU-JACKET-001', 50, 79.99, 'jacket.jpg'),
  (3, 'Sneakers', 'Comfortable sneakers for casual use', 'SKU-SNEAKERS-001', 120, 49.99, 'sneakers.jpg'),
  (3, 'Sweater', 'Soft and cozy sweater for cold days', 'SKU-SWEATER-001', 80, 34.99, 'sweater.jpg'),
  (3, 'Cap', 'Classic baseball cap', 'SKU-CAP-001', 200, 12.99, 'cap.jpg'),
  (3, 'Socks', 'Set of cotton socks', 'SKU-SOCKS-001', 300, 5.99, 'socks.jpg');
;
